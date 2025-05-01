import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/seller/register" ||
    path.startsWith("/api/auth") ||
    path.startsWith("/api/seed") ||
    path.startsWith("/api/products") ||
    path.startsWith("/api/categories") ||
    path.startsWith("/api/banners") ||
    path.startsWith("/api/brands") ||
    path.startsWith("/api/ebooks")

  // Get the session cookie
  const sessionCookie = request.cookies.get("session")?.value

  // If the path is public, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // If there's no session cookie and the path is not public, redirect to login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify the JWT token
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change_in_production")
    const { payload } = await jwtVerify(sessionCookie, JWT_SECRET)

    // Extract username from path for dynamic routes
    const pathParts = path.split("/").filter(Boolean)
    const urlUsername = pathParts[0]

    // Check role-based access for admin routes
    if ((path.includes("/admin") || pathParts[1] === "admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Check role-based access for seller routes
    if (
      (path.includes("/seller") || pathParts[1] === "seller") &&
      payload.role !== "seller" &&
      payload.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // For username-based routes, verify the username matches
    if (urlUsername && urlUsername !== payload.username && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Auth error:", error)
    // If token verification fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api/public|_next/static|_next/image|favicon.ico).*)"],
}
