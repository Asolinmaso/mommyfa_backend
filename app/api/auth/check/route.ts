import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"
import { getSessionUser } from "@/lib/server-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = await getSessionUser(request)

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
      image: user.image,
    }

    return NextResponse.json({ success: true, user: userData })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ success: false, message: "Authentication check failed" }, { status: 500 })
  }
}
