import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Banner from "@/models/banner"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    console.log("Fetching banners with type:", type)

    let query = {}

    if (type) {
      query = { type }
    }

    const banners = await Banner.find(query)

    console.log(`Found ${banners.length} banners`)

    return NextResponse.json({
      success: true,
      banners,
    })
  } catch (error) {
    console.error("Error fetching banners:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch banners", error: (error as Error).message },
      { status: 500 },
    )
  }
}
