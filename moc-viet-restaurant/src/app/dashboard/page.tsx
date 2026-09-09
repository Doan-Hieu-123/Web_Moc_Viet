import { cookies } from "next/headers";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDatabase } from "@/lib/db";

export default async function DashboardPage() {
  const userId = (await cookies()).get("moc_viet_user")?.value;
  const user = userId ? getDatabase().prepare("SELECT fullName, email FROM User WHERE id = ?").get(userId) as { fullName: string; email: string } | undefined : undefined;
  const reservations = userId ? getDatabase().prepare("SELECT id, date, guestsCount, status FROM Reservation WHERE userId = ? ORDER BY date DESC LIMIT 5").all(userId) as Array<{ id: string; date: string; guestsCount: number; status: string }> : [];
  return <div className="min-h-screen bg-[#f7f1e7]"><Header /><main className="pt-32 pb-20 px-4"><div className="max-w-6xl mx-auto">{user ? <><p className="text-[#a64b32] font-semibold tracking-[0.2em]">TÀI KHOẢN CỦA TÔI</p><h1 className="text-4xl font-bold text-[#3b291e] mt-3">Xin chào, {user.fullName}</h1><p className="text-[#6d5847] mt-2">{user.email}</p><div className="grid md:grid-cols-3 gap-5 mt-10">{[["Đặt bàn sắp tới", reservations.length], ["Món yêu thích", 0], ["Đánh giá của tôi", 0]].map(([label, value]) => <div key={label} className="bg-white border border-[#e4d8c8] p-6"><p className="text-[#6d5847]">{label}</p><p className="text-3xl font-bold text-[#355443] mt-3">{value}</p></div>)}</div><section className="bg-white border border-[#e4d8c8] p-6 mt-8"><h2 className="text-2xl font-bold text-[#3b291e]">Lịch sử đặt bàn</h2>{reservations.length ? <div className="divide-y mt-4">{reservations.map((reservation) => <div key={reservation.id} className="py-4 flex justify-between"><span>{reservation.date} · {reservation.guestsCount} khách</span><span className="text-[#a64b32]">{reservation.status}</span></div>)}</div> : <p className="text-[#6d5847] mt-4">Bạn chưa có lịch đặt bàn nào.</p>}</section></> : <div className="bg-white border border-[#e4d8c8] p-10 text-center"><h1 className="text-3xl font-bold text-[#3b291e]">Đăng nhập để xem tài khoản</h1><Link href="/login" className="inline-block mt-6 bg-[#355443] text-white px-6 py-3">ĐĂNG NHẬP</Link></div>}</div></main><Footer /></div>;
}
