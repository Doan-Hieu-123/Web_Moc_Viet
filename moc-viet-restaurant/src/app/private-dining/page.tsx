"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

export default function PrivateDiningPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSent(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f1e7]">
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#a64b32] font-semibold tracking-[0.2em]">TIỆC & KHÔNG GIAN RIÊNG</p>
              <h1 className="text-5xl font-bold text-[#3b291e] mt-3">NHỮNG DỊP ĐÁNG NHỚ</h1>
              <p className="text-[#6d5847] text-lg leading-8 mt-6">Từ bữa cơm gia đình đến tiệc công ty, Mộc Việt chăm chút thực đơn, không gian và nhịp phục vụ theo câu chuyện riêng của bạn.</p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {["Sinh nhật", "Kỷ niệm", "Tiệc gia đình", "Tiếp khách"].map((item) => <div key={item} className="bg-white border border-[#e4d8c8] p-5 text-[#355443] font-semibold">{item}</div>)}
              </div>
            </div>
            <div className="bg-white border border-[#e4d8c8] p-8">
              {sent ? (
                <div className="text-center py-12"><div className="text-5xl">✓</div><h2 className="text-2xl font-bold text-[#355443] mt-5">Đã nhận yêu cầu</h2><p className="text-[#6d5847] mt-3">Đội ngũ Mộc Việt sẽ liên hệ để tư vấn không gian và thực đơn.</p></div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#3b291e]">Gửi yêu cầu tư vấn</h2>
                  <input name="name" required placeholder="Họ và tên" className="w-full border border-[#cdbca5] p-3" />
                  <input name="phone" required type="tel" placeholder="Số điện thoại" className="w-full border border-[#cdbca5] p-3" />
                  <select name="event" required className="w-full border border-[#cdbca5] p-3"><option value="">Loại sự kiện</option><option>Sinh nhật</option><option>Tiệc gia đình</option><option>Tiệc công ty</option><option>Tiếp khách</option></select>
                  <div className="grid grid-cols-2 gap-4"><input name="date" required type="date" className="w-full border border-[#cdbca5] p-3" /><input name="guests" required type="number" min="2" placeholder="Số khách" className="w-full border border-[#cdbca5] p-3" /></div>
                  <input name="budget" placeholder="Ngân sách dự kiến" className="w-full border border-[#cdbca5] p-3" />
                  <textarea name="request" rows={4} placeholder="Yêu cầu đặc biệt" className="w-full border border-[#cdbca5] p-3" />
                  <button disabled={submitting} className="w-full bg-[#355443] text-white py-3 font-semibold disabled:opacity-60">{submitting ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
