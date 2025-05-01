import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Ebook from "@/models/ebook"

export async function GET() {
  try {
    await dbConnect()

    console.log("Fetching ebooks")

    const ebooks = await Ebook.find({ isActive: true })

    console.log(`Found ${ebooks.length} ebooks`)

    return NextResponse.json({
      success: true,
      ebooks,
    })
  } catch (error) {
    console.error("Error fetching ebooks:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch ebooks", error: (error as Error).message },
      { status: 500 },
    )
  }
}
