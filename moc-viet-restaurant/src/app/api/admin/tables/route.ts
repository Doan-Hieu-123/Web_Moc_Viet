import { requireAdmin } from "@/lib/admin";
import { getDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const forbidden = () => NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });

export async function GET() {
  try {
    await requireAdmin();
    const tables = getDatabase().prepare(`
      SELECT rt.*,
        r.id AS reservationId,
        r.guestName AS reservationGuestName,
        r.guestPhone AS reservationGuestPhone,
        r.date AS reservationDate,
        r.guestsCount AS reservationGuestsCount,
        r.specialReq AS reservationSpecialReq,
        r.status AS reservationStatus
      FROM RestaurantTable rt
      LEFT JOIN Reservation r ON r.id = (
        SELECT r2.id FROM Reservation r2
        WHERE r2.tableId = rt.id
          AND r2.status NOT IN ('COMPLETED', 'CANCELLED')
        ORDER BY r2.date DESC
        LIMIT 1
      )
      ORDER BY rt.tableNumber
    `).all();
    return NextResponse.json(tables);
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return forbidden();
    return NextResponse.json({ error: "Không thể tải danh sách bàn." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const tableId = request.nextUrl.searchParams.get("id");
    if (tableId && body.walkIn) {
      if (!body.guestName || !body.guestPhone || !Number.isInteger(Number(body.guestsCount))) {
        return NextResponse.json({ error: "Tên khách, số điện thoại và số khách là bắt buộc." }, { status: 400 });
      }
      const db = getDatabase();
      const table = db.prepare("SELECT status, capacity FROM RestaurantTable WHERE id = ?").get(tableId) as { status: string; capacity: number } | undefined;
      if (!table) return NextResponse.json({ error: "Không tìm thấy bàn." }, { status: 404 });
      if (table.status !== "AVAILABLE") return NextResponse.json({ error: "Bàn này hiện không trống." }, { status: 409 });
      if (Number(body.guestsCount) > table.capacity) return NextResponse.json({ error: "Số khách vượt quá sức chứa của bàn." }, { status: 400 });
      const checkIn = db.transaction(() => {
        db.prepare("INSERT INTO Reservation (id, guestName, guestPhone, tableId, date, guestsCount, specialReq, status) VALUES (?, ?, ?, ?, datetime('now', 'localtime'), ?, ?, 'SEATED')").run(crypto.randomUUID(), body.guestName.trim(), body.guestPhone.trim(), tableId, Number(body.guestsCount), body.specialReq?.trim() || null);
        db.prepare("UPDATE RestaurantTable SET status = 'OCCUPIED' WHERE id = ?").run(tableId);
      });
      checkIn();
      return NextResponse.json({ message: "Đã tiếp nhận khách và chuyển bàn sang Đang phục vụ." }, { status: 201 });
    }
    const tableNumber = Number(body.tableNumber);
    const capacity = Number(body.capacity);
    if (!Number.isInteger(tableNumber) || tableNumber < 1 || !Number.isInteger(capacity) || capacity < 1 || !body.area) {
      return NextResponse.json({ error: "Số bàn, số chỗ và khu vực là bắt buộc." }, { status: 400 });
    }
    getDatabase().prepare("INSERT INTO RestaurantTable (id, tableNumber, capacity, area, status) VALUES (?, ?, ?, ?, ?)").run(crypto.randomUUID(), tableNumber, capacity, body.area.trim(), body.status || "AVAILABLE");
    return NextResponse.json({ message: "Đã thêm bàn ăn." }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return forbidden();
    if (error instanceof Error && error.message.includes("UNIQUE")) return NextResponse.json({ error: "Số bàn này đã tồn tại." }, { status: 409 });
    return NextResponse.json({ error: "Không thể thêm bàn ăn." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    const body = await request.json();
    const db = getDatabase();
    if (!id) return NextResponse.json({ error: "Thiếu mã bàn." }, { status: 400 });

    if (body.advanceStatus === true) {
      const currentTable = db.prepare("SELECT status FROM RestaurantTable WHERE id = ?").get(id) as { status: string } | undefined;
      if (!currentTable) return NextResponse.json({ error: "Không tìm thấy bàn." }, { status: 404 });

      const nextStatus = currentTable.status === "OCCUPIED" ? "CLEANING" : currentTable.status === "CLEANING" ? "AVAILABLE" : null;
      if (!nextStatus) return NextResponse.json({ error: "Bàn này không có trạng thái tiếp theo." }, { status: 409 });

      if (nextStatus === "AVAILABLE") {
        db.prepare("UPDATE Reservation SET status = 'COMPLETED' WHERE tableId = ? AND status = 'SEATED'").run(id);
      }

      db.prepare("UPDATE RestaurantTable SET status = ? WHERE id = ?").run(nextStatus, id);
      const labelMap: Record<string, string> = { AVAILABLE: "Đang trống", CLEANING: "Đang dọn", OCCUPIED: "Đang phục vụ", RESERVED: "Đã đặt" };
      return NextResponse.json({ message: `Đã chuyển bàn sang ${labelMap[nextStatus]}.` });
    }

    const tableNumber = Number(body.tableNumber);
    const capacity = Number(body.capacity);
    const statuses = ["AVAILABLE", "RESERVED", "OCCUPIED", "CLEANING"];
    if (!Number.isInteger(tableNumber) || !Number.isInteger(capacity) || !body.area || !statuses.includes(body.status)) return NextResponse.json({ error: "Thông tin bàn không hợp lệ." }, { status: 400 });
    if (body.status === "AVAILABLE") {
      const activeToday = db.prepare("SELECT COUNT(*) AS count FROM Reservation WHERE tableId = ? AND DATE(date) = DATE('now', 'localtime') AND status NOT IN ('COMPLETED', 'CANCELLED')").get(id) as { count: number };
      if (activeToday.count > 0) return NextResponse.json({ error: "Bàn đang có lượt đặt hôm nay, không thể chuyển sang Đang trống." }, { status: 409 });
    }
    db.prepare("UPDATE RestaurantTable SET tableNumber=?, capacity=?, area=?, status=? WHERE id=?").run(tableNumber, capacity, body.area.trim(), body.status, id);
    return NextResponse.json({ message: "Đã cập nhật bàn ăn." });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return forbidden();
    return NextResponse.json({ error: "Không thể cập nhật bàn ăn." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Thiếu mã bàn." }, { status: 400 });
    const used = getDatabase().prepare("SELECT COUNT(*) AS count FROM Reservation WHERE tableId = ? AND status NOT IN ('COMPLETED', 'CANCELLED')").get(id) as { count: number };
    if (used.count > 0) return NextResponse.json({ error: "Không thể xóa bàn đang có đặt bàn." }, { status: 409 });
    getDatabase().prepare("DELETE FROM RestaurantTable WHERE id=?").run(id);
    return NextResponse.json({ message: "Đã xóa bàn ăn." });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return forbidden();
    return NextResponse.json({ error: "Không thể xóa bàn ăn." }, { status: 500 });
  }
}
