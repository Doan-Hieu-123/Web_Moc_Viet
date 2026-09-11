import { requireAdmin } from "@/lib/admin";
import { getDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAdmin();
    const db = getDatabase();
    const pendingReservations = db.prepare("SELECT id, tableId, date, status FROM Reservation WHERE status IN ('PENDING', 'CONFIRMED', 'SEATED') ORDER BY date ASC").all() as Array<{ id: string; tableId?: string; date: string; status: string }>;
    const now = new Date();

    for (const reservation of pendingReservations) {
      if (reservation.status === "PENDING") {
        db.prepare("UPDATE Reservation SET status = 'CONFIRMED' WHERE id = ?").run(reservation.id);
        if (reservation.tableId) {
          db.prepare("UPDATE RestaurantTable SET status = 'RESERVED' WHERE id = ? AND status = 'AVAILABLE'").run(reservation.tableId);
        }
        reservation.status = "CONFIRMED";
      }

      const reservationDate = new Date(reservation.date.replace(" ", "T"));
      if (Number.isNaN(reservationDate.getTime()) || reservationDate > now) continue;
      if (reservation.status !== "SEATED") {
        db.prepare("UPDATE Reservation SET status = 'SEATED' WHERE id = ?").run(reservation.id);
        if (reservation.tableId) {
          db.prepare("UPDATE RestaurantTable SET status = 'OCCUPIED' WHERE id = ?").run(reservation.tableId);
        }
      }
    }

    const reservations = db.prepare("SELECT r.*, rt.tableNumber, rt.area FROM Reservation r LEFT JOIN RestaurantTable rt ON rt.id = r.tableId ORDER BY r.date DESC").all();
    return NextResponse.json(reservations);
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });
    console.error(error);
    return NextResponse.json({ error: "Không thể tải danh sách đặt bàn." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    const { status } = await request.json();
    const allowed = ["PENDING", "CONFIRMED", "SEATED", "COMPLETED", "CANCELLED"];
    if (!id || !allowed.includes(status)) return NextResponse.json({ error: "Dữ liệu cập nhật không hợp lệ." }, { status: 400 });
    const db = getDatabase();
    const reservation = db.prepare("SELECT tableId, date FROM Reservation WHERE id = ?").get(id) as { tableId?: string; date: string } | undefined;
    if (!reservation) return NextResponse.json({ error: "Không tìm thấy lượt đặt bàn." }, { status: 404 });

    const update = db.transaction(() => {
      db.prepare("UPDATE Reservation SET status = ? WHERE id = ?").run(status, id);
      if (!reservation.tableId) return;

      const reservationDate = reservation.date.slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);
      if (reservationDate !== today) return;

      const tableStatus = status === "SEATED" ? "OCCUPIED" : status === "CONFIRMED" || status === "PENDING" ? "RESERVED" : "AVAILABLE";
      db.prepare("UPDATE RestaurantTable SET status = ? WHERE id = ?").run(tableStatus, reservation.tableId);
    });
    update();
    return NextResponse.json({ message: "Đã cập nhật trạng thái đặt bàn." });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });
    console.error(error);
    return NextResponse.json({ error: "Không thể cập nhật đặt bàn." }, { status: 500 });
  }
}
