import dbConnect from "./db"

// This function ensures we're on the server before using Mongoose
export async function withMongoose<T>(callback: () => Promise<T>): Promise<T> {
  // Connect to the database
  await dbConnect()

  // Execute the callback
  return callback()
}

// Export models for server-side use
export { default as User } from "@/models/user"
export { default as Product } from "@/models/product"
export { default as Category } from "@/models/category"
export { default as Brand } from "@/models/brand"
export { default as Ebook } from "@/models/ebook"
export { default as Banner } from "@/models/banner"
export { default as Cart } from "@/models/cart"
export { default as Order } from "@/models/order"

import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import User from "@/models/user"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change_in_production")

// Function to get the current user from the session
export async function getSessionUser() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie?.value) {
      return null
    }

    // Verify the JWT token
    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET)

    if (!payload.userId) {
      return null
    }

    // Connect to the database
    await dbConnect()

    // Find the user
    const user = await User.findById(payload.userId).lean()

    if (!user) {
      return null
    }

    // Remove sensitive data
    delete user.password

    return {
      ...user,
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
    }
  } catch (error) {
    console.error("Session verification error:", error)
    return null
  }
}

// Function to create a new session
export async function createSession(userId: string, expiresIn = "7d") {
  try {
    // Create a new JWT token
    const token = await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(JWT_SECRET)

    // Set the cookie
    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return true
  } catch (error) {
    console.error("Session creation error:", error)
    return false
  }
}

export async function getServerSession() {
  const user = await getSessionUser()
  return { user }
}
