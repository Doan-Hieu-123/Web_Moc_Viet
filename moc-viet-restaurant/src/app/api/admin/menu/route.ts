import { requireAdmin } from "@/lib/admin";
import { getDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "FORBIDDEN") {
    return NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });
  }
  console.error("Admin menu API error:", error);
  return NextResponse.json({ error: "Không thể xử lý dữ liệu món ăn." }, { status: 500 });
}

export async function GET() {
  try {
    await requireAdmin();
    const items = getDatabase().prepare("SELECT * FROM MenuItem ORDER BY category, name").all();
    return NextResponse.json(items);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (!body.name || !body.description || !body.category || !Number.isFinite(Number(body.price))) {
      return NextResponse.json({ error: "Tên, mô tả, danh mục và giá là bắt buộc." }, { status: 400 });
    }
    const id = crypto.randomUUID();
    getDatabase().prepare("INSERT INTO MenuItem (id, name, description, price, category, isSignature, spiceLevel, isVegetarian, imageUrl, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
      id, body.name.trim(), body.description.trim(), Number(body.price), body.category.trim(), body.isSignature ? 1 : 0, Number(body.spiceLevel) || 0, body.isVegetarian ? 1 : 0, body.imageUrl?.trim() || null, body.isAvailable === false ? 0 : 1
    );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    const body = await request.json();
    if (!id) return NextResponse.json({ error: "Thiếu mã món ăn." }, { status: 400 });
    getDatabase().prepare("UPDATE MenuItem SET name = ?, description = ?, price = ?, category = ?, isSignature = ?, spiceLevel = ?, isVegetarian = ?, imageUrl = ?, isAvailable = ? WHERE id = ?").run(
      body.name.trim(), body.description.trim(), Number(body.price), body.category.trim(), body.isSignature ? 1 : 0, Number(body.spiceLevel) || 0, body.isVegetarian ? 1 : 0, body.imageUrl?.trim() || null, body.isAvailable ? 1 : 0, id
    );
    return NextResponse.json({ message: "Đã cập nhật món ăn." });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Thiếu mã món ăn." }, { status: 400 });
    getDatabase().prepare("DELETE FROM MenuItem WHERE id = ?").run(id);
    return NextResponse.json({ message: "Đã xóa món ăn." });
  } catch (error) {
    return errorResponse(error);
  }
}
