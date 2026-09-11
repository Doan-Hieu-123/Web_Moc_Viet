"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Reservation { id: string; guestName: string; guestPhone: string; date: string; guestsCount: number; status: string; tableNumber?: number; area?: string; specialReq?: string; }
const statuses = [{ value: "PENDING", label: "Chờ xác nhận" }, { value: "CONFIRMED", label: "Đã xác nhận" }, { value: "SEATED", label: "Đã nhận khách" }, { value: "COMPLETED", label: "Hoàn tất" }, { value: "CANCELLED", label: "Đã hủy" }];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [message, setMessage] = useState("");
  const load = async () => { const response = await fetch("/api/admin/reservations"); const data = await response.json(); if (response.ok) setReservations(data); else setMessage(data.error); };
  useEffect(() => { load(); const timer = setInterval(load, 3000); return () => clearInterval(timer); }, []);
  const updateStatus = async (id: string, status: string) => { const response = await fetch(`/api/admin/reservations?id=${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); const data = await response.json(); setMessage(data.error || data.message); if (response.ok) load(); };
  const visible = filter === "ALL" ? reservations : reservations.filter((item) => item.status === filter);
  return <main className="min-h-screen bg-[#f7f1e7] pt-32 pb-20 px-4"><div className="max-w-7xl mx-auto"><Link href="/admin" className="text-sm text-[#a64b32]">← Về bảng điều khiển</Link><div className="flex flex-wrap justify-between items-end gap-4 mt-3"><h1 className="text-4xl font-bold text-[#3b291e]">QUẢN LÝ ĐẶT BÀN</h1><select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-[#cdbca5] bg-white p-3"><option value="ALL">Tất cả trạng thái</option>{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></div>{message && <p className="mt-6 bg-[#eadcc8] p-4 text-[#3b291e]">{message}</p>}<div className="space-y-3 mt-8">{visible.length ? visible.map((reservation) => <article key={reservation.id} className="bg-white border border-[#e4d8c8] p-5 grid md:grid-cols-[1fr_auto] gap-5"><div><div className="flex flex-wrap items-center gap-3"><h2 className="font-bold text-[#3b291e]">{reservation.guestName}</h2><span className="text-sm text-[#6d5847]">{reservation.guestPhone}</span></div><p className="text-[#6d5847] mt-2">{reservation.date} · {reservation.guestsCount} khách · {reservation.area || "Chưa chọn khu vực"} {reservation.tableNumber ? `· Bàn ${reservation.tableNumber}` : ""}</p>{reservation.specialReq && <p className="text-sm text-[#6d5847] mt-2">Ghi chú: {reservation.specialReq}</p>}</div><select value={reservation.status} onChange={(e) => updateStatus(reservation.id, e.target.value)} className="border border-[#cdbca5] p-3 h-fit">{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></article>) : <div className="bg-white border border-[#e4d8c8] p-8 text-center text-[#6d5847]">Chưa có lượt đặt bàn phù hợp.</div>}</div></div></main>;
}
