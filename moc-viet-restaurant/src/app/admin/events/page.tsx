"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Edit3, Trash2, X } from "lucide-react";

interface EventRow {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  price: string;
  image: string;
  isPublished: number | boolean;
}

type EventForm = Omit<EventRow, "id">;
const blank: EventForm = { title: "", description: "", date: "", time: "19:00", location: "Khu vực Trung tâm", capacity: "50 khách", price: "Miễn phí", image: "🎉", isPublished: true };

export default function AdminEventsPage() {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [form, setForm] = useState<EventForm>(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const load = async () => {
    const response = await fetch("/api/admin/events");
    const data = await response.json();
    if (response.ok) setRows(data);
    else setMessage(data.error);
  };

  useEffect(() => { load(); }, []);

  const update = (field: keyof EventForm, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));
  const startEditing = (event: EventRow) => {
    setEditingId(event.id);
    setForm({ ...event, isPublished: Boolean(event.isPublished) });
    window.requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };
  const cancelEditing = () => { setEditingId(null); setForm(blank); };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    const response = await fetch(editingId ? `/api/admin/events?id=${editingId}` : "/api/admin/events", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) { setForm(blank); setEditingId(null); await load(); }
    setIsSaving(false);
  };

  const remove = async (id: string) => {
    if (!window.confirm("Xóa sự kiện này?")) return;
    const response = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) { if (editingId === id) cancelEditing(); await load(); }
  };

  const fields: Array<{ key: keyof EventForm; label: string; required?: boolean }> = [
    { key: "title", label: "Tên sự kiện", required: true },
    { key: "description", label: "Mô tả", required: true },
    { key: "location", label: "Địa điểm", required: true },
    { key: "capacity", label: "Sức chứa" },
    { key: "price", label: "Giá vé" },
    { key: "image", label: "Biểu tượng" },
  ];

  return (
    <main className="min-h-screen bg-[#f7f1e7] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div><Link href="/admin" className="text-sm text-[#a64b32] hover:text-[#7b3515]">← Về bảng điều khiển</Link><h1 className="text-4xl font-bold text-[#3b291e] mt-4">QUẢN LÝ SỰ KIỆN</h1></div>
          <span className="text-[#6d5847]">{rows.length} sự kiện</span>
        </div>
        {message && <p className="bg-[#eadcc8] text-[#3b291e] p-4 mt-6">{message}</p>}

        <div className="grid gap-8 mt-8 items-stretch lg:grid-cols-[360px_1fr] lg:h-[calc(100dvh-15rem)] lg:max-h-[680px]">
          <form ref={formRef} onSubmit={save} className="bg-white border border-[#e4d8c8] p-6 space-y-3 h-full overflow-y-auto lg:sticky lg:top-28 shadow-sm">
            <div className="flex justify-between items-center gap-3"><h2 className="text-xl font-bold text-[#3b291e]">{editingId ? "Sửa sự kiện" : "Thêm sự kiện"}</h2>{editingId && <span className="text-xs font-semibold text-[#a64b32] bg-[#f2e8d9] px-2 py-1">ĐANG SỬA</span>}</div>
            {fields.map((field) => <input key={field.key} required={field.required} value={String(form[field.key])} onChange={(event) => update(field.key, event.target.value)} placeholder={field.label} className="w-full border border-[#cdbca5] p-3" />)}
            <div className="grid grid-cols-2 gap-2"><input required type="date" value={form.date} onChange={(event) => update("date", event.target.value)} className="border border-[#cdbca5] p-3" /><input required type="time" value={form.time} onChange={(event) => update("time", event.target.value)} className="border border-[#cdbca5] p-3" /></div>
            <label className="flex gap-2 text-sm text-[#3b291e]"><input type="checkbox" checked={Boolean(form.isPublished)} onChange={(event) => update("isPublished", event.target.checked)} /> Đang hiển thị</label>
            <div className="flex gap-3"><button disabled={isSaving} className="flex-1 bg-[#355443] text-white py-3 font-semibold transition hover:bg-[#2a4438] active:scale-[0.98] disabled:opacity-60">{isSaving ? "ĐANG LƯU..." : editingId ? "LƯU THAY ĐỔI" : "THÊM SỰ KIỆN"}</button>{editingId && <button type="button" onClick={cancelEditing} className="inline-flex items-center gap-1 rounded border border-[#a64b32] bg-[#fffdf8] px-4 py-2 font-semibold text-[#7b3515] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f2e8d9] hover:shadow-sm active:translate-y-0 active:scale-[0.98]"><X size={16} /> Hủy</button>}</div>
          </form>

          <section aria-label="Danh sách sự kiện" className="min-w-0 min-h-0 flex h-full flex-col">
            <div className="flex items-center justify-between mb-3"><h2 className="text-xl font-bold text-[#3b291e]">Danh sách sự kiện</h2><span className="text-xs text-[#6d5847]">{rows.length} sự kiện · Cuộn trong khung</span></div>
            <div className="admin-menu-scroll min-h-[360px] min-w-0 flex-1 overflow-y-scroll overscroll-contain space-y-3 rounded border border-[#d9c5ad] bg-[#eee3d4] p-3 pr-2">
              {rows.map((row) => { const active = editingId === row.id; return <article key={row.id} tabIndex={0} onClick={() => startEditing(row)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") startEditing(row); }} className={`cursor-pointer bg-white border p-5 flex items-center justify-between gap-4 transition-all duration-200 ${active ? "border-[#a64b32] bg-[#fff8ef] shadow-md ring-2 ring-[#d9ad88]" : "border-[#e4d8c8] hover:border-[#c9a98d] hover:shadow-sm"}`}><div className="min-w-0"><div className="flex flex-wrap gap-2 items-center"><h2 className="font-bold text-[#3b291e]">{row.image} {row.title}</h2>{active && <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#a64b32]"><Check size={13} /> Đang chọn</span>}<span className="text-xs text-[#a64b32]">{row.isPublished ? "Đang hiển thị" : "Đang ẩn"}</span></div><p className="text-sm text-[#6d5847] mt-1">{row.date} · {row.time} · {row.location}</p><p className="text-sm text-[#6d5847] mt-1 line-clamp-2">{row.description}</p><p className="font-semibold text-[#355443] mt-2">{row.price} · {row.capacity}</p></div><div className="flex gap-2 shrink-0"><button type="button" onClick={(event) => { event.stopPropagation(); startEditing(row); }} className={`inline-flex items-center gap-1 text-sm border px-3 py-2 transition-all active:scale-95 ${active ? "border-[#a64b32] bg-[#a64b32] text-white" : "border-[#cdbca5] text-[#355443] hover:border-[#355443] hover:bg-[#e8f0eb] hover:-translate-y-0.5"}`}><Edit3 size={15} /> Sửa</button><button type="button" onClick={(event) => { event.stopPropagation(); remove(row.id); }} className="inline-flex items-center gap-1 text-sm border border-red-200 px-3 py-2 text-red-700 transition-all hover:border-red-500 hover:bg-red-50 hover:-translate-y-0.5 active:scale-95"><Trash2 size={15} /> Xóa</button></div></article>; })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
