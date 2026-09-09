import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { getDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  if (!email || !fullName || password.length < 8) return NextResponse.json({ error: "Vui lòng nhập đủ thông tin; mật khẩu cần ít nhất 8 ký tự." }, { status: 400 });
  const db = getDatabase();
  const existing = db.prepare("SELECT id FROM User WHERE email = ?").get(email);
  if (existing) return NextResponse.json({ error: "Email này đã được đăng ký." }, { status: 409 });
  const salt = randomUUID();
  const hash = scryptSync(password, salt, 64).toString("hex");
  db.prepare("INSERT INTO User (id, email, password, fullName, phone, role) VALUES (?, ?, ?, ?, ?, 'CUSTOMER')").run(randomUUID(), email, `${salt}:${hash}`, fullName, body.phone || null);
  return NextResponse.json({ message: "Đăng ký thành công." }, { status: 201 });
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const derived = scryptSync(password, salt, 64);
  return timingSafeEqual(derived, Buffer.from(hash, "hex"));
}
