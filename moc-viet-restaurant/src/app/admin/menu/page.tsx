"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Edit3, Trash2, X } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isSignature: number | boolean;
  spiceLevel: number;
  isVegetarian: number | boolean;
  isAvailable: number | boolean;
}

type MenuFormData = Omit<MenuItem, "id">;

const emptyForm: MenuFormData = {
  name: "",
  description: "",
  price: 0,
  category: "Món Bắc",
  isSignature: false,
  spiceLevel: 0,
  isVegetarian: false,
  isAvailable: true,
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<MenuFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const loadItems = async () => {
    const response = await fetch("/api/admin/menu");
    if (response.ok) setItems(await response.json());
    else setMessage("Bạn cần đăng nhập bằng tài khoản quản trị.");
  };

  useEffect(() => {
    loadItems();
  }, []);

  const update = (field: keyof MenuFormData, value: string | number | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      ...item,
      isSignature: Boolean(item.isSignature),
      isVegetarian: Boolean(item.isVegetarian),
      isAvailable: Boolean(item.isAvailable),
    });
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    const response = await fetch(
      editingId ? `/api/admin/menu?id=${editingId}` : "/api/admin/menu",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    setMessage(result.error || (editingId ? "Đã cập nhật món ăn." : "Đã thêm món ăn."));
    if (response.ok) {
      setForm(emptyForm);
      setEditingId(null);
      await loadItems();
    }
    setIsSaving(false);
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa món này?")) return;
    const response = await fetch(`/api/admin/menu?id=${id}`, { method: "DELETE" });
    const result = await response.json();
    setMessage(result.error || "Đã xóa món ăn.");
    if (response.ok) {
      if (editingId === id) cancelEditing();
      await loadItems();
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f1e7] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <Link href="/admin" className="text-sm text-[#a64b32] hover:text-[#7b3515]">
              ← Về bảng điều khiển
            </Link>
            <h1 className="text-4xl font-bold text-[#3b291e] mt-3">QUẢN LÝ THỰC ĐƠN</h1>
          </div>
        </div>

        {message && <p className="mt-6 bg-[#eadcc8] text-[#3b291e] p-4">{message}</p>}

        <div className="grid gap-8 mt-8 items-stretch lg:grid-cols-[360px_1fr] lg:h-[calc(100dvh-15rem)] lg:max-h-[680px]">
          <form ref={formRef} onSubmit={submit} className="bg-white border border-[#e4d8c8] p-6 space-y-4 h-full overflow-y-auto lg:sticky lg:top-28 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#3b291e]">
                {editingId ? "Sửa món ăn" : "Thêm món mới"}
              </h2>
              {editingId && <span className="text-xs font-semibold text-[#a64b32] bg-[#f2e8d9] px-2 py-1">ĐANG SỬA</span>}
            </div>

            <input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Tên món" className="w-full border border-[#cdbca5] p-3" />
            <textarea required value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Mô tả món ăn" rows={4} className="w-full border border-[#cdbca5] p-3" />
            <input required type="number" min="0" value={form.price} onChange={(event) => update("price", Number(event.target.value))} placeholder="Giá VNĐ" className="w-full border border-[#cdbca5] p-3" />
            <input required value={form.category} onChange={(event) => update("category", event.target.value)} placeholder="Danh mục" className="w-full border border-[#cdbca5] p-3" />

            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm text-[#3b291e]">Độ cay
                <input type="number" min="0" max="3" value={form.spiceLevel} onChange={(event) => update("spiceLevel", Number(event.target.value))} className="w-full border border-[#cdbca5] p-3 mt-1" />
              </label>
              <label className="text-sm text-[#3b291e]">Trạng thái
                <select value={String(form.isAvailable)} onChange={(event) => update("isAvailable", event.target.value === "true")} className="w-full border border-[#cdbca5] p-3 mt-1">
                  <option value="true">Đang bán</option>
                  <option value="false">Tạm hết</option>
                </select>
              </label>
            </div>

            <label className="flex gap-2 text-sm text-[#3b291e]"><input type="checkbox" checked={Boolean(form.isSignature)} onChange={(event) => update("isSignature", event.target.checked)} /> Món đặc trưng</label>
            <label className="flex gap-2 text-sm text-[#3b291e]"><input type="checkbox" checked={Boolean(form.isVegetarian)} onChange={(event) => update("isVegetarian", event.target.checked)} /> Món chay</label>

            <div className="flex gap-3">
              <button disabled={isSaving} className="flex-1 bg-[#355443] text-white py-3 font-semibold transition hover:bg-[#2a4438] active:scale-[0.98] disabled:opacity-60">
                {isSaving ? "ĐANG LƯU..." : editingId ? "LƯU THAY ĐỔI" : "THÊM MÓN"}
              </button>
              {editingId && <button type="button" onClick={cancelEditing} className="inline-flex items-center gap-1 rounded border border-[#a64b32] bg-[#fffdf8] px-4 py-2 font-semibold text-[#7b3515] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f2e8d9] hover:shadow-sm active:translate-y-0 active:scale-[0.98]"><X size={16} /> Hủy</button>}
            </div>
          </form>

          <section aria-label="Danh sách món ăn" className="min-w-0 min-h-0 flex h-full flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-[#3b291e]">Danh sách món ăn</h2>
              <span className="text-xs text-[#6d5847]">{items.length} món</span>
            </div>
            <div className="admin-menu-scroll min-h-[360px] min-w-0 flex-1 overflow-y-scroll overscroll-contain space-y-3 rounded border border-[#d9c5ad] bg-[#eee3d4] p-3 pr-2">
              {items.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <article
                    key={item.id}
                    tabIndex={0}
                    onClick={() => startEditing(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") startEditing(item);
                    }}
                    className={`cursor-pointer bg-white border p-5 flex items-center justify-between gap-4 transition-all duration-200 ${isEditing ? "border-[#a64b32] bg-[#fff8ef] shadow-md ring-2 ring-[#d9ad88]" : "border-[#e4d8c8] hover:border-[#c9a98d] hover:shadow-sm"}`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2 items-center">
                        <h2 className="font-bold text-[#3b291e]">{item.name}</h2>
                        <span className="text-xs text-[#a64b32]">{item.category}</span>
                        {isEditing && <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#a64b32]"><Check size={13} /> Đang chọn</span>}
                        {!Boolean(item.isAvailable) && <span className="text-xs text-red-700">Tạm hết</span>}
                      </div>
                      <p className="text-sm text-[#6d5847] mt-1 line-clamp-2">{item.description}</p>
                      <p className="font-semibold text-[#355443] mt-2">{item.price.toLocaleString("vi-VN")}₫</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button type="button" onClick={(event) => { event.stopPropagation(); startEditing(item); }} className={`inline-flex items-center gap-1 text-sm border px-3 py-2 transition-all active:scale-95 ${isEditing ? "border-[#a64b32] bg-[#a64b32] text-white" : "border-[#cdbca5] text-[#355443] hover:border-[#355443] hover:bg-[#e8f0eb] hover:-translate-y-0.5"}`}><Edit3 size={15} /> Sửa</button>
                      <button type="button" onClick={(event) => { event.stopPropagation(); remove(item.id); }} className="inline-flex items-center gap-1 text-sm border border-red-200 px-3 py-2 text-red-700 transition-all hover:border-red-500 hover:bg-red-50 hover:-translate-y-0.5 active:scale-95"><Trash2 size={15} /> Xóa</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
