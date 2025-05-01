import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Brand from "@/models/brand"

export async function GET() {
  try {
    await dbConnect()

    console.log("Fetching brands")

    const brands = await Brand.find({ isActive: true })

    console.log(`Found ${brands.length} brands`)

    return NextResponse.json({
      success: true,
      brands,
    })
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch brands", error: (error as Error).message },
      { status: 500 },
    )
  }
}
