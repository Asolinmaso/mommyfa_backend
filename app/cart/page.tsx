"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, ArrowRight, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

type CartItem = {
  product: {
    _id: string
    name: string
    price: number
    images: string[]
  }
  quantity: number
  price: number
}

type Cart = {
  _id: string
  user: string
  items: CartItem[]
  total: number
}

export default function CartPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`/api/cart?userId=${user._id}`)
        const data = await response.json()

        if (data.success) {
          setCart(data.cart)
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [user, toast])

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!user) return

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId,
          quantity,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCart(data.cart)
      } else {
        throw new Error(data.message || "Failed to update cart")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to update cart",
        variant: "destructive",
      })
    }
  }

  const removeCartItem = async (productId: string) => {
    await updateCartItem(productId, 0)
  }

  const proceedToCheckout = () => {
    router.push("/checkout")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="h-64 flex items-center justify-center">
          <p>Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Please log in to view your cart</p>
          <Link href="/login">
            <Button className="bg-green-600 hover:bg-green-700">Login to Continue</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Cart Items ({cart.items.length})</h2>
            </div>

            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.product._id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
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
                    <Link href={`/products/category/${item.product._id}`} className="font-medium hover:text-green-600">
                      {item.product.name}
                    </Link>
                    <div className="text-gray-600 text-sm mt-1">${item.price.toFixed(2)} each</div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                      className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                      className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="font-medium text-right min-w-[80px]">${(item.price * item.quantity).toFixed(2)}</div>

                  {/* Remove Button */}
                  <button onClick={() => removeCartItem(item.product._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(cart.total * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(cart.total + cart.total * 0.05).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" onClick={proceedToCheckout}>
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
