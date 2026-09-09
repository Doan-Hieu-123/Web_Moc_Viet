import { checkTableAvailability, createReservation } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface BookingPayload {
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  date?: string;
  time?: string;
  guestCount?: number;
  area?: string;
  specialRequest?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingPayload;
    const guestCount = Number(body.guestCount);

    if (!body.guestName || !body.guestPhone || !body.date || !body.time || !Number.isInteger(guestCount)) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin bắt buộc." }, { status: 400 });
    }

    if (guestCount < 1 || guestCount > 20) {
      return NextResponse.json({ error: "Số khách phải từ 1 đến 20 người." }, { status: 400 });
    }

    const dateTime = `${body.date} ${body.time}`;
    const availableTables = checkTableAvailability(guestCount, dateTime) as Array<{ id: string }>;
    const table = availableTables[0];

    if (!table) {
      return NextResponse.json(
        { error: "Khung giờ này hiện đã kín. Vui lòng chọn thời gian khác." },
        { status: 409 }
      );
    }

    const reference = `MV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    createReservation({
      guestName: body.guestName.trim(),
      guestPhone: body.guestPhone.trim(),
      tableId: table.id,
      date: dateTime,
      guestsCount: guestCount,
      specialReq: [body.guestEmail, body.area, body.specialRequest].filter(Boolean).join(" | "),
      status: "PENDING",
    });

    return NextResponse.json({ reference }, { status: 201 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Không thể tạo đặt bàn lúc này." }, { status: 500 });
  }
}
