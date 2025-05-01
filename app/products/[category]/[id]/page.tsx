"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import ProductSlider from "@/components/home/product-slider"

type Product = {
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  stock: number
  seller: {
    _id: string
    name: string
  }
  averageRating: number
  ratings: {
    user: string
    rating: number
    review: string
    date: string
  }[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()

        if (data.success) {
          setProduct(data.product)
          setLoading(false)
        } else {
          throw new Error(data.message || "Failed to fetch product")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const addToCart = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    if (!product) return

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          quantity,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Added to cart",
          description: `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart`,
        })
      } else {
        throw new Error(data.message || "Failed to add to cart")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to add to cart",
        variant: "destructive",
      })
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <p className="mt-4 text-gray-600">The product you are looking for does not exist or has been removed.</p>
          <Link href="/">
            <Button className="mt-6 bg-green-600 hover:bg-green-700">Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/products/${product.category}`} className="hover:text-green-600">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="relative h-[400px] rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex mt-4 gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-20 w-20 cursor-pointer border-2 rounded-md overflow-hidden ${
                    selectedImage === index ? "border-green-600" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.averageRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.averageRating?.toFixed(1) || "0.0"} ({product.ratings?.length || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-green-700">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Short Description */}
          <div className="mt-4 text-gray-600">
            <p>{product.description.split("\n")[0]}</p>
          </div>

          {/* Stock Status */}
          <div className="mt-4">
            <span className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-medium`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mt-6 flex items-center">
              <span className="mr-3 text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700 py-6 flex-1"
              disabled={product.stock <= 0}
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 py-6">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          {/* Seller Info */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Sold by: <span className="font-medium">{product.seller?.name || "MommyFarm"}</span>
            </p>
          </div>

          {/* Features */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">100% Organic</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>

          {/* Share */}
          <div className="mt-6 flex items-center">
            <span className="text-gray-700 mr-3">Share:</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.ratings?.length || 0})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              {product.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            {product.ratings && product.ratings.length > 0 ? (
              <div className="space-y-6">
                {product.ratings.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2">{review.review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}
          </TabsContent>
          <TabsContent value="shipping" className="mt-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <p>We offer free shipping on all orders over $50. Standard shipping takes 3-5 business days.</p>

              <h3 className="text-lg font-semibold mt-4">Return Policy</h3>
              <p>
                If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Please
                note that the product must be unused and in the same condition that you received it.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-green-800">You May Also Like</h2>
        <ProductSlider category={product.category} />
      </div>
    </div>
  )
}
