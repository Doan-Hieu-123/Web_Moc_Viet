import Link from "next/link";
import { getDatabase } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const db = getDatabase();
  const reservations = (db.prepare("SELECT COUNT(*) as count FROM Reservation").get() as { count: number }).count;
  const customers = (db.prepare("SELECT COUNT(*) as count FROM User WHERE role = 'CUSTOMER'").get() as { count: number }).count;
  const menuItems = (db.prepare("SELECT COUNT(*) as count FROM MenuItem").get() as { count: number }).count;
  const stats = [["Đặt bàn", reservations], ["Khách hàng", customers], ["Món trong thực đơn", menuItems], ["Bàn nhà hàng", (db.prepare("SELECT COUNT(*) as count FROM RestaurantTable").get() as { count: number }).count]];
  return <div className="min-h-screen bg-[#f7f1e7]"><Header /><main className="pt-32 pb-20 px-4"><div className="max-w-7xl mx-auto"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[#a64b32] font-semibold tracking-[0.2em]">QUẢN TRỊ MỘC VIỆT</p><h1 className="text-4xl font-bold text-[#3b291e] mt-3">BẢNG ĐIỀU KHIỂN</h1></div><Link href="/booking" className="bg-[#355443] text-white px-5 py-3">XEM TRANG ĐẶT BÀN</Link></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{stats.map(([label, value]) => <div key={label} className="bg-white border border-[#e4d8c8] p-6"><p className="text-[#6d5847]">{label}</p><p className="text-3xl font-bold text-[#355443] mt-3">{value}</p></div>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">{[["Đặt bàn", "các lượt đặt bàn"], ["Bàn ăn", "các bàn ăn"], ["Thực đơn", "các món ăn"], ["Khách hàng", "khách hàng"], ["Sự kiện", "các sự kiện"], ["Đánh giá", "các đánh giá"]].map(([label, description]) => <div key={label} className="bg-white border border-[#e4d8c8] p-6"><h2 className="text-xl font-bold text-[#3b291e]">{label}</h2><p className="text-[#6d5847] mt-2">Quản lý {description}.</p><button className="text-[#a64b32] font-semibold mt-5">MỞ PHÂN HỆ →</button></div>)}</div></div></main><Footer /></div>;
}
