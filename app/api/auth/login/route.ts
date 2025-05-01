import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"
import { createSession } from "@/lib/server-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Create session
    const sessionCreated = await createSession(user._id.toString())

    if (!sessionCreated) {
      return NextResponse.json({ success: false, message: "Failed to create session" }, { status: 500 })
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

    // Create a response with the user data
    const response = NextResponse.json({ success: true, user: userData })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 })
  }
}
