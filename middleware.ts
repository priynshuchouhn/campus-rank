import { NextRequest, NextResponse } from "next/server";

// Small, dependency-free middleware that reads the NextAuth JWT session cookie
// and extracts `role` from the token payload without verifying signature.
// This keeps the middleware lightweight so it stays below Vercel's Edge Function size limit.

const ROLE = { ADMIN: "ADMIN", USER: "USER" } as const;

function base64UrlDecode(str: string) {
  if (!str) return null;
  // Convert from base64url to base64
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with '='
  const pad = str.length % 4;
  if (pad) str += "=".repeat(4 - pad);
  try {
    // atob is available in the Edge runtime
    const decoded = atob(str);
    // Decode percent-encoded UTF-8 bytes
    return decodeURIComponent(
      Array.from(decoded)
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch (e) {
    return null;
  }
}

function parseJwt(token?: string | null) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payload = parts[1];
  const json = base64UrlDecode(payload);
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

function readSessionToken(req: NextRequest) {
  // NextAuth uses `__Secure-next-auth.session-token` in secure contexts,
  // fall back to `next-auth.session-token` if not set.
  const cookieNames = [
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
    "next-auth.sessions",
  ];
  for (const name of cookieNames) {
    const c = req.cookies.get(name);
    if (c) return c.value;
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public admin login page; but if an admin session exists redirect to admin dashboard
  if (pathname === "/admin/login") {
    const token = readSessionToken(req);
    const payload = parseJwt(token);
    if (payload?.role === ROLE.ADMIN) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // For matched routes, require a session token (lightweight check)
  const token = readSessionToken(req);
  const payload = parseJwt(token);
  if (!payload || !payload.role) {
    return NextResponse.redirect(new URL("/get-started", req.url));
  }

  const userRole = String(payload.role || ROLE.USER);

  if (userRole === ROLE.USER && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

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