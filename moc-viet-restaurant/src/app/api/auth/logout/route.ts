import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Đã đăng xuất." });
  response.cookies.set("moc_viet_user", "", { httpOnly: true, sameSite: "lax", maxAge: 0, path: "/" });
  return response;
}
