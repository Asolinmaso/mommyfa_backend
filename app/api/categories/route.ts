import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Category from "@/models/category"

export async function GET() {
  try {
    await dbConnect()

    console.log("Fetching categories")

    const categories = await Category.find({ isActive: true })

    console.log(`Found ${categories.length} categories`)

    return NextResponse.json({
      success: true,
      categories,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories", error: (error as Error).message },
      { status: 500 },
    )
  }
}
