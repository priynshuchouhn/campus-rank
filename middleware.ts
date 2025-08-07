import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth(); // Get the authenticated user session
  const { pathname } = req.nextUrl;

  if (!session && pathname === "/admin/login") {
    return NextResponse.next();
  }


  if (!session) {
      return NextResponse.redirect(new URL("/get-started", req.url)); // Redirect unauthenticated users
  }

  const userRole = session.user.role; // Assuming "user" or "admin"

  if (userRole === "USER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url)); // Students cannot access /admin
  }

  if (userRole === "ADMIN" && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url)); // Admins can ONLY access /admin routes
  }

  return NextResponse.next(); // Allow access
}



export const config = {
  matcher: [
    // "/dashboard",
    // "/profile",
    // "/practice",
    // "/practice/:path*",
    // "/roadmap",
    // "/roadmap/:path*",
    // "/goals",
    // "/admin/:path*",
  ]
}