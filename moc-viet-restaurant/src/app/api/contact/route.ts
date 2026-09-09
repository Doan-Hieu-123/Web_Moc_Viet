import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin bắt buộc." }, { status: 400 });
    }

    console.info("Moc Viet contact message", {
      name,
      email,
      phone: body.phone,
      subject,
      message,
    });

    return NextResponse.json({ message: "Đã nhận thông điệp của bạn." }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Không thể gửi thông điệp lúc này." }, { status: 500 });
  }
}
