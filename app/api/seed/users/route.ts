import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { withMongoose } from "@/lib/server-utils"
import User from "@/models/user"

export async function GET() {
  try {
    return withMongoose(async () => {
      // Check if users already exist
      const existingUsers = await User.countDocuments()

      if (existingUsers > 0) {
        return NextResponse.json({
          success: true,
          message: "Users already exist",
        })
      }

      // Create default users
      const defaultUsers = [
        {
          name: "Admin User",
          email: "admin@mommyfarm.com",
          password: await bcrypt.hash("admin123", 10),
          role: "admin",
        },
        {
          name: "Seller User",
          email: "seller@mommyfarm.com",
          password: await bcrypt.hash("seller123", 10),
          role: "seller",
        },
        {
          name: "Buyer User",
          email: "buyer@mommyfarm.com",
          password: await bcrypt.hash("buyer123", 10),
          role: "buyer",
        },
      ]

      await User.insertMany(defaultUsers)

      return NextResponse.json({
        success: true,
        message: "Default users created successfully",
      })
    })
  } catch (error) {
    console.error("Error creating default users:", error)
    return NextResponse.json({ success: false, message: "Failed to create default users" }, { status: 500 })
  }
}
