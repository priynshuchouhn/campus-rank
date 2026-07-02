import { NextResponse } from "next/server";

export function authorizeCronRequest(req: Request) {
  const secret = process.env.CRON_SECRET_TOKEN || process.env.CRON_SECRET;

  if (!secret) {
    return process.env.NODE_ENV === "production"
      ? NextResponse.json({ message: "Cron secret is not configured" }, { status: 503 })
      : null;
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}
