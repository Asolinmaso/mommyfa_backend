import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"
import { createSession } from "@/lib/server-utils"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, username, image } = await request.json()

    // Validate input
    if (!name || !email || !password || !username) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 })
      }
      if (existingUser.username === username) {
        return NextResponse.json({ success: false, message: "Username already taken" }, { status: 400 })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "buyer",
      username,
      image: image || "",
    })

    await newUser.save()

    // Create session
    const session = await createSession(newUser._id.toString())

    // Return user data (excluding password)
    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      username: newUser.username,
      image: newUser.image,
    }

    return NextResponse.json({ success: true, user: userData }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 })
  }
}
