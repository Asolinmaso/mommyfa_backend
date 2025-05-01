import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const fileName = `${uuidv4()}-${file.name.replace(/\s/g, "-")}`
    const publicPath = path.join(process.cwd(), "public/uploads")
    const filePath = path.join(publicPath, fileName)

    // Ensure the directory exists
    await writeFile(filePath, buffer)

    // Return the URL to the uploaded file
    return NextResponse.json({
      url: `/uploads/${fileName}`,
      success: true,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
