import { getMenuItems, getSignatureMenuItems } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const signature = searchParams.get("signature");

    if (id) {
      // Get specific menu item
      const allItems = getMenuItems();
      const item = allItems.find((item) => item.id === id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    } else if (signature === "true") {
      // Get signature items only
      const items = getSignatureMenuItems();
      return NextResponse.json(items);
    } else {
      // Get all menu items
      const items = getMenuItems();
      return NextResponse.json(items);
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
