import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Short-circuit allow/redirect logic for the admin login page.
  // If an authenticated user hits /admin/login, redirect them to admin dashboard.
  if (pathname === "/admin/login") {
    try {
      const session = await auth();
      if (session && session.user && session.user.role === ROLE.ADMIN) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    } catch (e) {
      // If auth fails, treat as unauthenticated and allow the login page to render
    }

    return NextResponse.next();
  }

  // For all other matched routes we require a valid session.
  let session: any = null;
  try {
    session = await auth();
  } catch (err) {
    // If auth throws, treat as unauthenticated and redirect to onboarding
    return NextResponse.redirect(new URL("/get-started", req.url));
  }

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/get-started", req.url));
  }

  const userRole = (session.user.role || ROLE.USER).toString();

  // Students (USER) must not access /admin routes.
  if (userRole === ROLE.USER && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Admins must only access admin routes; redirect them there if they try other pages.
  if (userRole === ROLE.ADMIN && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

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