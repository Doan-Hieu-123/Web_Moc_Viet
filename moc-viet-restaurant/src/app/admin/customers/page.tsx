"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, UserRound, X } from "lucide-react";

interface Customer { id: string; fullName: string; email: string; phone?: string; createdAt: string; }
interface EditForm { fullName: string; email: string; phone: string; }

const normalizeSearchText = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/đ/g, "d")
  .replace(/Đ/g, "D")
  .toLocaleLowerCase("vi");

export default function AdminCustomersPage() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<EditForm>({ fullName: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const response = await fetch("/api/admin/customers");
    const data = await response.json();
    if (response.ok) setRows(data);
    else setMessage(data.error);
  };
  useEffect(() => { load(); }, []);

  const filteredRows = useMemo(() => {
    const normalized = normalizeSearchText(query.trim());
    if (!normalized) return rows;
    return rows.filter((customer) => normalizeSearchText(customer.fullName).includes(normalized));
  }, [query, rows]);

  const openEdit = (customer: Customer) => {
    setEditing(customer);
    setForm({ fullName: customer.fullName, email: customer.email, phone: customer.phone || "" });
  };
  const closeEdit = () => setEditing(null);
  const updateForm = (field: keyof EditForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    const response = await fetch(`/api/admin/customers?id=${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) { closeEdit(); await load(); }
    setSaving(false);
  };
  const remove = async (id: string) => {
    if (!window.confirm("Xóa khách hàng này?")) return;
    const response = await fetch(`/api/admin/customers?id=${id}`, { method: "DELETE" });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) load();
  };

  return (
    <main className="min-h-screen bg-[#f7f1e7] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="text-sm text-[#a64b32] hover:text-[#7b3515]">← Về bảng điều khiển</Link>
        <div className="flex flex-wrap justify-between items-end gap-4 mt-4"><div><h1 className="text-4xl font-bold text-[#3b291e]">QUẢN LÝ KHÁCH HÀNG</h1><p className="text-[#6d5847] mt-2">{filteredRows.length} / {rows.length} khách hàng</p></div></div>
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative"><Search className="absolute left-3 top-3 text-[#8a6a52]" size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên khách hàng..." aria-label="Tìm khách hàng theo tên" className="w-full border border-[#cdbca5] bg-white py-3 pl-10 pr-4 text-[#3b291e] focus:border-[#a64b32] focus:outline-none focus:ring-2 focus:ring-[#eadcc8]" /></div>
          {query && <p className="mt-2 text-center text-xs text-[#8a6a52]" aria-live="polite">Đang hiển thị {filteredRows.length} kết quả cho “{query}”</p>}
        </div>
        {message && <p className="bg-[#eadcc8] p-4 mt-6 text-[#3b291e]">{message}</p>}
        <div className="space-y-3 mt-8">{filteredRows.map((customer) => <article key={customer.id} className="bg-white border border-[#e4d8c8] p-5 flex justify-between gap-4 transition hover:border-[#c9a98d] hover:shadow-sm"><div className="flex gap-4"><div className="h-11 w-11 rounded-full bg-[#eadcc8] flex items-center justify-center text-[#7b3515]"><UserRound size={21} /></div><div><h2 className="font-bold text-[#3b291e]">{customer.fullName}</h2><p className="text-[#6d5847]">{customer.email} · {customer.phone || "Chưa có số điện thoại"}</p></div></div><div className="flex gap-2 shrink-0"><button onClick={() => openEdit(customer)} className="border border-[#cdbca5] px-3 py-2 text-[#355443] transition hover:border-[#355443] hover:bg-[#e8f0eb]">Sửa</button><button onClick={() => remove(customer.id)} className="border border-red-200 px-3 py-2 text-red-700 transition hover:bg-red-50">Xóa</button></div></article>)}{!filteredRows.length && <p className="bg-white border border-[#e4d8c8] p-6 text-[#6d5847]">Không tìm thấy khách hàng phù hợp.</p>}</div>
      </div>
      {editing && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#3b291e]/45 p-4" role="dialog" aria-modal="true" aria-label="Sửa thông tin khách hàng"><form onSubmit={save} className="w-full max-w-lg bg-[#fffdf8] border border-[#d9c5ad] p-7 shadow-xl"><div className="flex justify-between items-center"><div><p className="text-xs font-semibold tracking-[0.16em] text-[#a64b32]">CHỈNH SỬA HỒ SƠ</p><h2 className="text-2xl font-bold text-[#3b291e] mt-2">{editing.fullName}</h2></div><button type="button" onClick={closeEdit} aria-label="Đóng" className="p-2 text-[#7b3515] hover:bg-[#f2e8d9]"><X /></button></div><div className="space-y-4 mt-7"><label className="block text-sm font-semibold text-[#3b291e]">Họ và tên<input required value={form.fullName} onChange={(event) => updateForm("fullName", event.target.value)} className="w-full border border-[#cdbca5] p-3 mt-1 font-normal" /></label><label className="block text-sm font-semibold text-[#3b291e]">Email<input required type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} className="w-full border border-[#cdbca5] p-3 mt-1 font-normal" /></label><label className="block text-sm font-semibold text-[#3b291e]">Số điện thoại<input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} className="w-full border border-[#cdbca5] p-3 mt-1 font-normal" /></label></div><div className="flex justify-end gap-3 mt-7"><button type="button" onClick={closeEdit} className="border border-[#a64b32] bg-[#fffdf8] px-5 py-2 font-semibold text-[#7b3515] hover:bg-[#f2e8d9]">Hủy</button><button disabled={saving} className="bg-[#355443] px-5 py-2 font-semibold text-white hover:bg-[#2a4438] disabled:opacity-60">{saving ? "ĐANG LƯU..." : "LƯU THAY ĐỔI"}</button></div></form></div>}
    </main>
  );
}
