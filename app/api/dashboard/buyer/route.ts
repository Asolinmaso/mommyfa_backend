import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getSessionUser } from "@/lib/server-utils"
import Order from "@/models/order"
import Cart from "@/models/cart"

export async function GET() {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Get user's orders
    const orders = await Order.find({ user: user._id })
    const totalOrders = orders.length

    // Get wishlist items count (assuming wishlist is stored in user model)
    const wishlistItems = user.wishlist ? user.wishlist.length : 0

    // Get cart items count
    const cart = await Cart.findOne({ user: user._id })
    const cartItems = cart ? cart.items.length : 0

    // Get recent orders
    const recentOrders = await Order.find({ user: user._id }).sort({ createdAt: -1 }).limit(5).lean()

    // Format recent orders
    const formattedRecentOrders = recentOrders.map((order) => ({
      _id: order._id.toString(),
      total: order.total,
      status: order.status,
      date: order.createdAt,
    }))

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders,
        wishlistItems,
        cartItems,
        recentOrders: formattedRecentOrders,
      },
    })
  } catch (error) {
    console.error("Buyer dashboard error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
