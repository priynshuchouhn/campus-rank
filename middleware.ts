import { NextRequest, NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/practice",
    "/practice/:path*",
    "/roadmap",
    "/roadmap/:path*",
    "/goals",
    "/admin/:path*",
    "/quiz/:path*",
  ],
};