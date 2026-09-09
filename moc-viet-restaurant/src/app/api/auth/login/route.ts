import { scryptSync, timingSafeEqual } from "node:crypto";
import { getDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const user = getDatabase().prepare("SELECT id, email, password, fullName, role FROM User WHERE email = ?").get(email) as { id: string; email: string; password: string; fullName: string; role: string } | undefined;
  if (!user) return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  const [salt, hash] = user.password.split(":");
  const valid = timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(hash, "hex"));
  if (!valid) return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  const response = NextResponse.json({ user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
  response.cookies.set("moc_viet_user", user.id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
  return response;
}
