"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

type WishlistItem = {
  _id: string
  product: {
    _id: string
    name: string
    price: number
    images: string[]
    category: string
  }
}

export default function WishlistPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for wishlist items
  const mockWishlistItems = [
    {
      _id: "1",
      product: {
        _id: "p1",
        name: "Organic Fresh Carrots",
        price: 3.99,
        images: ["/placeholder.svg?height=200&width=200"],
        category: "vegetables",
      },
    },
    {
      _id: "2",
      product: {
        _id: "p2",
        name: "Organic Spinach Bundle",
        price: 2.49,
        images: ["/placeholder.svg?height=200&width=200"],
        category: "vegetables",
      },
    },
    {
      _id: "3",
      product: {
        _id: "p3",
        name: "Cold Pressed Olive Oil",
        price: 12.99,
        images: ["/placeholder.svg?height=200&width=200"],
        category: "oils",
      },
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch the wishlist items from an API
    // For now, we'll use mock data
    setWishlistItems(mockWishlistItems)
    setLoading(false)
  }, [])

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== itemId))
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist",
    })
  }

  const addToCart = (productId: string) => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="h-64 flex items-center justify-center">
          <p>Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Please log in to view your wishlist</p>
          <Link href="/login">
            <Button className="bg-[#86C33B] hover:bg-[#86C33B]/90">Login to Continue</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your wishlist yet.</p>
          <Link href="/">
            <Button className="bg-[#86C33B] hover:bg-[#86C33B]/90">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Wishlist Items ({wishlistItems.length})</h2>
        </div>

        <div className="divide-y">
          {wishlistItems.map((item) => (
            <div key={item._id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
              {/* Product Image */}
              <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <Link
                  href={`/products/${item.product.category}/${item.product._id}`}
                  className="font-medium hover:text-[#86C33B]"
                >
                  {item.product.name}
                </Link>
                <div className="text-gray-600 text-sm mt-1">${item.product.price.toFixed(2)}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button onClick={() => addToCart(item.product._id)} className="bg-[#86C33B] hover:bg-[#86C33B]/90">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Link href="/">
          <Button variant="outline" className="border-[#86C33B] text-[#86C33B] hover:bg-[#86C33B]/10">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
