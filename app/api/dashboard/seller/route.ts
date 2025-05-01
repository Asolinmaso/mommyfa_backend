import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getSessionUser } from "@/lib/server-utils"
import Product from "@/models/product"
import Order from "@/models/order"

export async function GET() {
  try {
    const user = await getSessionUser()

    if (!user || (user.role !== "seller" && user.role !== "admin")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Get seller's products
    const products = await Product.find({ seller: user._id })
    const totalProducts = products.length

    // Get product IDs
    const productIds = products.map((product) => product._id)

    // Get orders containing seller's products
    const orders = await Order.find({
      "items.product": { $in: productIds },
    })

    // Calculate total orders and revenue
    const totalOrders = orders.length
    let totalRevenue = 0

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (productIds.some((id) => id.equals(item.product))) {
          totalRevenue += item.price * item.quantity
        }
      })
    })

    // Get recent orders
    const recentOrders = await Order.find({
      "items.product": { $in: productIds },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("items.product", "name")
      .lean()

    // Format recent orders
    const formattedRecentOrders = recentOrders.map((order) => {
      // Find the first item that belongs to this seller
      const sellerItem = order.items.find((item) =>
        productIds.some((id) => id.toString() === item.product._id.toString()),
      )

      return {
        _id: order._id.toString(),
        productName: sellerItem ? sellerItem.product.name : "Unknown Product",
        amount: sellerItem ? sellerItem.price * sellerItem.quantity : 0,
        status: order.status,
        date: order.createdAt,
      }
    })

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders: formattedRecentOrders,
      },
    })
  } catch (error) {
    console.error("Seller dashboard error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
