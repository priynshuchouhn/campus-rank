import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const admin = await prisma.user.findUnique({
      where: {
      email: email,
      role: "ADMIN",
    },
  });
  if (!admin) {
    return NextResponse.json({ message: "Admin not found" }, { status: 400 });
  }
  if (!admin.password) {
    return NextResponse.json({ message: "Admin password not found" }, { status: 400 });
  }
  const isPasswordValid = await compare(password, admin.password);
//   const isPasswordValid = await compare(admin.password, hashedPassword);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  const user = {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    name: admin.name,
    token: token,
  };
   (await cookies()).set("admin_data", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    });
    return NextResponse.json({ message: "Admin logged in successfully", data: user, success: true }, { status: 200 });
  } catch (error) {
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] admin/auth/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json({ message: "Admin login failed", data: error, success: false }, { status: 500 });
  }
}