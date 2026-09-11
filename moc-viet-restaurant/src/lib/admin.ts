import { cookies } from "next/headers";
import { getDatabase } from "@/lib/db";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "CUSTOMER" | "STAFF" | "ADMIN";
}

export async function getCurrentUser() {
  const userId = (await cookies()).get("moc_viet_user")?.value;
  if (!userId) return null;

  return getDatabase()
    .prepare("SELECT id, email, fullName, role FROM User WHERE id = ?")
    .get(userId) as AdminUser | null;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return user;
}
