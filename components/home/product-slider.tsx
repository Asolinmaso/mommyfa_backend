"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

type Product = {
  _id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  averageRating: number
  ratings: { rating: number }[]
  isNew?: boolean
  isFeatured?: boolean
  slug?: string
  category: string
}

export default function ProductSlider({ category }: { category: string }) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products?category=${category}&limit=10`)

        if (!response.ok) {
          throw new Error(`Error fetching ${category} products: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setProducts(data.products)
        } else {
          throw new Error(data.message || `Failed to fetch ${category} products`)
        }
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const addToCart = async (productId: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId,
          quantity: 1,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Added to cart",
          description: "Product has been added to your cart",
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

  // If there's an error, show error message
  if (error) {
    // Instead of showing error, use default products based on category
    const sampleProducts = [
      {
        _id: `sample-1-${category}`,
        name: `Organic ${category.charAt(0).toUpperCase() + category.slice(1)} Sample 1`,
        price: 4.99,
        originalPrice: 6.99,
        images: ["/placeholder.svg?height=220&width=220"],
        averageRating: 4.5,
        ratings: [{ rating: 4.5 }],
        isNew: true,
        category: category,
      },
      {
        _id: `sample-2-${category}`,
        name: `Organic ${category.charAt(0).toUpperCase() + category.slice(1)} Sample 2`,
        price: 3.99,
        images: ["/placeholder.svg?height=220&width=220"],
        averageRating: 4.0,
        ratings: [{ rating: 4.0 }],
        category: category,
      },
      {
        _id: `sample-3-${category}`,
        name: `Premium ${category.charAt(0).toUpperCase() + category.slice(1)} Sample`,
        price: 5.99,
        originalPrice: 7.99,
        images: ["/placeholder.svg?height=220&width=220"],
        averageRating: 4.8,
        ratings: [{ rating: 4.8 }],
        isFeatured: true,
        category: category,
      },
    ]

    setProducts(sampleProducts)
    setLoading(false)
    setError(null)
    return null
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="relative">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#86C33B] text-[#86C33B]" disabled>
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#86C33B] text-[#86C33B]" disabled>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-[220px] h-[350px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  // If no products, show default message with sample products
  if (products.length === 0) {
    const sampleProducts = [
      {
        _id: `sample-1-${category}`,
        name: `Organic ${category.charAt(0).toUpperCase() + category.slice(1)} Sample 1`,
        price: 4.99,
        originalPrice: 6.99,
        images: ["/placeholder.svg?height=220&width=220"],
        averageRating: 4.5,
        ratings: [{ rating: 4.5 }],
        isNew: true,
        category: category,
      },
      {
        _id: `sample-2-${category}`,
        name: `Organic ${category.charAt(0).toUpperCase() + category.slice(1)} Sample 2`,
        price: 3.99,
        images: ["/placeholder.svg?height=220&width=220"],
        averageRating: 4.0,
        ratings: [{ rating: 4.0 }],
        category: category,
      },
      {
        _id: `sample-3-${category}`,
        name: `Premium ${category.charAt(0).toUpperCase() + category.slice(1)} Sample`,
        price: 5.99,
        originalPrice: 7.99,
        images: ["/placeholder.svg?height=220&width=220"],
        averageRating: 4.8,
        ratings: [{ rating: 4.8 }],
        isFeatured: true,
        category: category,
      },
    ]

    return (
      <div className="relative">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
              onClick={() => scroll("right")}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sampleProducts.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-[220px] group relative">
              <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B] h-full flex flex-col">
                <div className="relative h-[220px] w-full">
                  <Link href={`/products/${product.category}/${product._id}`}>
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Product badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && <Badge className="bg-[#86C33B]">New</Badge>}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <Badge className="bg-red-500">Sale</Badge>
                    )}
                  </div>

                  {/* Quick action buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
                      <Heart size={16} className="text-gray-700" />
                    </Button>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <Link href={`/products/${product.category}/${product._id}`} className="hover:text-[#86C33B]">
                    <h3 className="font-medium text-gray-800 line-clamp-2 min-h-[48px]">{product.name}</h3>
                  </Link>

                  <div className="flex items-center mt-1 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.averageRating ? product.averageRating.toFixed(1) : "0.0"}
                      </span>
                    </div>
                    <span className="mx-1 text-gray-400">|</span>
                    <span className="text-sm text-gray-500">
                      {product.ratings?.length || 0} {product.ratings?.length === 1 ? "review" : "reviews"}
                    </span>
                  </div>

                  <div className="flex items-center mt-auto">
                    <div className="flex-1">
                      <span className="font-bold text-[#86C33B]">${product.price.toFixed(2)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <Button
                    className="w-full bg-[#CC6203] hover:bg-[#CC6203]/90 water-drop-btn"
                    onClick={() => addToCart(product._id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product._id} className="flex-shrink-0 w-[220px] group relative">
            <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B] h-full flex flex-col">
              <div className="relative h-[220px] w-full">
                <Link href={`/products/${product.category}/${product._id}`}>
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Product badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && <Badge className="bg-[#86C33B]">New</Badge>}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Badge className="bg-red-500">Sale</Badge>
                  )}
                </div>

                {/* Quick action buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
                    <Heart size={16} className="text-gray-700" />
                  </Button>
                </div>
              </div>

              <div className="p-3 flex flex-col flex-grow">
                <Link href={`/products/${product.category}/${product._id}`} className="hover:text-[#86C33B]">
                  <h3 className="font-medium text-gray-800 line-clamp-2 min-h-[48px]">{product.name}</h3>
                </Link>

                <div className="flex items-center mt-1 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.averageRating ? product.averageRating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                  <span className="mx-1 text-gray-400">|</span>
                  <span className="text-sm text-gray-500">
                    {product.ratings?.length || 0} {product.ratings?.length === 1 ? "review" : "reviews"}
                  </span>
                </div>

                <div className="flex items-center mt-auto">
                  <div className="flex-1">
                    <span className="font-bold text-[#86C33B]">${product.price.toFixed(2)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 pt-0">
                <Button
                  className="w-full bg-[#CC6203] hover:bg-[#CC6203]/90 water-drop-btn"
                  onClick={() => addToCart(product._id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
