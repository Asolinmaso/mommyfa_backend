import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getSessionUser } from "@/lib/server-utils"
import User from "@/models/user"
import Product from "@/models/product"
import Order from "@/models/order"

export async function GET() {
  try {
    const user = await getSessionUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Get total users
    const totalUsers = await User.countDocuments()

    // Get total products
    const totalProducts = await Product.countDocuments()

    // Get total orders and revenue
    const orders = await Order.find()
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    // Get recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name").lean()

    // Format recent orders
    const formattedRecentOrders = recentOrders.map((order) => ({
      _id: order._id.toString(),
      customerName: order.user ? order.user.name : "Guest",
      total: order.total,
      status: order.status,
      date: order.createdAt,
    }))

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders: formattedRecentOrders,
      },
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
