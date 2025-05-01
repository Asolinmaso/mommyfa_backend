import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/db"
import User from "@/models/user"

export async function GET() {
  try {
    await dbConnect()

    // Check if default users exist
    const adminExists = await User.findOne({ email: "admin@mommyfarm.com" })
    const sellerExists = await User.findOne({ email: "seller@mommyfarm.com" })
    const buyerExists = await User.findOne({ email: "buyer@mommyfarm.com" })

    const usersToCreate = []

    if (!adminExists) {
      usersToCreate.push({
        name: "Admin User",
        email: "admin@mommyfarm.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      })
    }

    if (!sellerExists) {
      usersToCreate.push({
        name: "Seller User",
        email: "seller@mommyfarm.com",
        password: await bcrypt.hash("seller123", 10),
        role: "seller",
      })
    }

    if (!buyerExists) {
      usersToCreate.push({
        name: "Buyer User",
        email: "buyer@mommyfarm.com",
        password: await bcrypt.hash("buyer123", 10),
        role: "buyer",
      })
    }

    // Create missing users
    if (usersToCreate.length > 0) {
      await User.insertMany(usersToCreate)
      console.log(`Created ${usersToCreate.length} default users`)
    }

    return NextResponse.json({
      success: true,
      message: `Default users checked. Created ${usersToCreate.length} missing users.`,
      adminExists,
      sellerExists,
      buyerExists,
    })
  } catch (error) {
    console.error("Error checking default users:", error)
    return NextResponse.json(
      { success: false, message: "Error checking default users", error: (error as Error).message },
      { status: 500 },
    )
  }
}
