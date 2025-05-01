import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Product from "@/models/product"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit") as string) : 10

    console.log("Fetching products with params:", { category, limit })

    let query = {}

    if (category) {
      query = { category }
    }

    const products = await Product.find(query).limit(limit)

    console.log(`Found ${products.length} products`)

    return NextResponse.json({
      success: true,
      products,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: (error as Error).message },
      { status: 500 },
    )
  }
}
