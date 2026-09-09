"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.password !== data.confirmPassword) { setError("Mật khẩu xác nhận không khớp."); return; }
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) setError(result.error); else window.location.href = "/login";
  }
  return <div className="min-h-screen bg-[#f7f1e7]"><Header /><main className="pt-32 pb-20 px-4"><div className="max-w-md mx-auto bg-white border border-[#e4d8c8] p-8"><h1 className="text-3xl font-bold text-[#3b291e]">TẠO TÀI KHOẢN</h1>{error && <p className="mt-5 p-3 bg-red-50 text-red-700">{error}</p>}<form onSubmit={submit} className="space-y-5 mt-8"><input name="fullName" required placeholder="Họ và tên" className="w-full border border-[#cdbca5] p-3" /><input name="email" type="email" required placeholder="Email" className="w-full border border-[#cdbca5] p-3" /><input name="phone" type="tel" placeholder="Số điện thoại" className="w-full border border-[#cdbca5] p-3" /><input name="password" type="password" minLength={8} required placeholder="Mật khẩu (tối thiểu 8 ký tự)" className="w-full border border-[#cdbca5] p-3" /><input name="confirmPassword" type="password" required placeholder="Nhập lại mật khẩu" className="w-full border border-[#cdbca5] p-3" /><button className="w-full bg-[#355443] text-white py-3 font-semibold">ĐĂNG KÝ</button></form><p className="text-sm text-[#6d5847] mt-6">Đã có tài khoản? <Link href="/login" className="text-[#a64b32] font-semibold">Đăng nhập</Link></p></div></main><Footer /></div>;
}
