import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Paths that require a signed-in user
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/practice",
  "/roadmap",
  "/goals",
  "/quiz",
];

export default auth((req) => {
  const { nextUrl } = req;
  const session = (req as typeof req & { auth?: { user?: { role?: string } } }).auth;
  const user = session?.user;
  const { pathname, search } = nextUrl;

  // Admin-only routes (except the admin login page)
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminPage) {
    if (!user) {
      const url = new URL("/admin/login", nextUrl);
      url.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(url);
    }
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  // Other protected areas for signed-in users
  if (!user) {
    for (const p of PROTECTED_PREFIXES) {
      if (pathname === p || pathname.startsWith(`${p}/`)) {
        const url = new URL("/get-started", nextUrl);
        url.searchParams.set("callbackUrl", pathname + search);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  // Only run middleware where it's actually needed
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/practice/:path*",
    "/roadmap/:path*",
    "/goals/:path*",
    "/quiz/:path*",
    "/code/:path*",
  ],
};