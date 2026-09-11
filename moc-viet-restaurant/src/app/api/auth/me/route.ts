import { cookies } from "next/headers";
import { getDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = (await cookies()).get("moc_viet_user")?.value;
  if (!userId) return NextResponse.json({ user: null });

  const user = getDatabase()
    .prepare("SELECT id, email, fullName, phone, role FROM User WHERE id = ?")
    .get(userId) as { id: string; email: string; fullName: string; phone?: string | null; role: string } | undefined;

  return NextResponse.json({ user: user || null });
}
