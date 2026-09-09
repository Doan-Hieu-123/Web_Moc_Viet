"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) setError(result.error); else window.location.href = "/dashboard";
    setLoading(false);
  }
  return <div className="min-h-screen bg-[#f7f1e7]"><Header /><main className="pt-32 pb-20 px-4"><div className="max-w-md mx-auto bg-white border border-[#e4d8c8] p-8"><h1 className="text-3xl font-bold text-[#3b291e]">ĐĂNG NHẬP</h1><p className="text-[#6d5847] mt-2">Chào mừng bạn trở lại Mộc Việt.</p>{error && <p className="mt-5 p-3 bg-red-50 text-red-700">{error}</p>}<form onSubmit={submit} className="space-y-5 mt-8"><input name="email" type="email" required placeholder="Email" className="w-full border border-[#cdbca5] p-3" /><input name="password" type="password" required placeholder="Mật khẩu" className="w-full border border-[#cdbca5] p-3" /><button disabled={loading} className="w-full bg-[#355443] text-white py-3 font-semibold disabled:opacity-60">{loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}</button></form><p className="text-sm text-[#6d5847] mt-6">Chưa có tài khoản? <Link href="/register" className="text-[#a64b32] font-semibold">Đăng ký</Link></p></div></main><Footer /></div>;
}
