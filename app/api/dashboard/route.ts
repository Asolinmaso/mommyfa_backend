import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ success: false, message: "Username is required" }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findOne({ username })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Here you would fetch relevant dashboard data based on user role
    // For now, we'll return mock data
    const dashboardData = {
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        username: user.username,
        image: user.image,
      },
      stats: {
        orders: user.role === "admin" ? 842 : user.role === "seller" ? 25 : 12,
        products: user.role === "admin" ? 3456 : user.role === "seller" ? 45 : 0,
        revenue: user.role === "admin" ? 89432 : user.role === "seller" ? 4231.89 : 0,
        users: user.role === "admin" ? 1248 : 0,
        wishlistItems: user.role === "buyer" ? 7 : 0,
        subscriptions: user.role === "buyer" ? 2 : 0,
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
