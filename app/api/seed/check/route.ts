import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Category from "@/models/category"
import Brand from "@/models/brand"
import Product from "@/models/product"
import Banner from "@/models/banner"
import Ebook from "@/models/ebook"

export async function GET() {
  try {
    await dbConnect()

    // Check if data already exists
    const categoriesCount = await Category.countDocuments()
    const brandsCount = await Brand.countDocuments()
    const productsCount = await Product.countDocuments()
    const bannersCount = await Banner.countDocuments()
    const ebooksCount = await Ebook.countDocuments()

    // If any of these collections are empty, we need to seed data
    const needsSeeding =
      categoriesCount === 0 || brandsCount === 0 || productsCount === 0 || bannersCount === 0 || ebooksCount === 0

    return NextResponse.json({
      needsSeeding,
      counts: {
        categories: categoriesCount,
        brands: brandsCount,
        products: productsCount,
        banners: bannersCount,
        ebooks: ebooksCount,
      },
    })
  } catch (error) {
    console.error("Error checking data:", error)
    return NextResponse.json({ needsSeeding: true, error: (error as Error).message }, { status: 500 })
  }
}
