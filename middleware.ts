import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that require a signed-in user
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/practice",
  "/roadmap",
  "/goals",
  "/quiz",
];

export default async function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const { pathname, search } = nextUrl;

  // Fetch a lightweight JWT from NextAuth without importing full auth config
  const secret = (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET) as string | undefined;
  let token = await getToken({ req, secret });
  if (!token) {
    // Try explicit cookie names for both NextAuth v4 and Auth.js v5
    const cookieNames = ["authjs.session-token", "next-auth.session-token", "__Secure-authjs.session-token", "__Secure-next-auth.session-token"];
    for (const cookieName of cookieNames) {
      token = await getToken({ req, secret, cookieName });
      if (token) break;
    }
  }

  const isAuthenticated = !!token;
  const role = (token as any)?.role as string | undefined;

  // Admin-only routes (except the admin login page)
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminPage) {
    if (!isAuthenticated) {
      const url = new URL("/admin/login", nextUrl);
      url.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(url);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  // Other protected areas for signed-in users
  if (!isAuthenticated) {
    for (const p of PROTECTED_PREFIXES) {
      if (pathname === p || pathname.startsWith(`${p}/`)) {
        const url = new URL("/get-started", nextUrl);
        url.searchParams.set("callbackUrl", pathname + search);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

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