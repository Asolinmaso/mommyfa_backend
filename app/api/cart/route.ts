import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Cart from "@/models/cart"
import Product from "@/models/product"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 })
    }

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images",
    })

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [], total: 0 })
    }

    return NextResponse.json({ success: true, cart })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching cart", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { userId, productId, quantity } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json({ success: false, message: "User ID and Product ID are required" }, { status: 400 })
    }

    // Get product details
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    // Check if cart exists for user
    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity, price: product.price }],
        total: product.price * quantity,
      })
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

      if (itemIndex > -1) {
        // Update quantity if product exists
        cart.items[itemIndex].quantity = quantity
      } else {
        // Add new item if product doesn't exist in cart
        cart.items.push({ product: productId, quantity, price: product.price })
      }

      // Recalculate total
      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

      await cart.save()
    }

    return NextResponse.json({ success: true, message: "Cart updated successfully", cart }, { status: 200 })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json(
      { success: false, message: "Error updating cart", error: (error as Error).message },
      { status: 500 },
    )
  }
}
