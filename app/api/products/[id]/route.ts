import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Product from "@/models/product"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const product = await Product.findById(params.id).populate("seller", "name")

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching product", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()

    const product = await Product.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product updated successfully", product })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { success: false, message: "Error updating product", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { success: false, message: "Error deleting product", error: (error as Error).message },
      { status: 500 },
    )
  }
}
