import Link from "next/link";
import { getDatabase } from "@/lib/db";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/admin";

export default async function AdminPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") return <main className="min-h-screen bg-[#f7f1e7] pt-32 px-4"><div className="max-w-xl mx-auto bg-white border border-[#e4d8c8] p-10 text-center"><h1 className="text-3xl font-bold text-[#3b291e]">Khu vực quản trị</h1><p className="text-[#6d5847] mt-4">Bạn cần đăng nhập bằng tài khoản quản trị để truy cập khu vực này.</p><Link href="/login" className="inline-block mt-6 bg-[#355443] text-white px-6 py-3">ĐĂNG NHẬP</Link></div></main>;
  const db = getDatabase();
  const reservations = (db.prepare("SELECT COUNT(*) as count FROM Reservation").get() as { count: number }).count;
  const customers = (db.prepare("SELECT COUNT(*) as count FROM User WHERE role = 'CUSTOMER'").get() as { count: number }).count;
  const menuItems = (db.prepare("SELECT COUNT(*) as count FROM MenuItem").get() as { count: number }).count;
  const tables = (db.prepare("SELECT COUNT(*) as count FROM RestaurantTable").get() as { count: number }).count;
  const stats = [["Đặt bàn", reservations], ["Khách hàng", customers], ["Món trong thực đơn", menuItems], ["Bàn nhà hàng", tables]];
  const modules = [["Đặt bàn", "các lượt đặt bàn", "/admin/reservations"], ["Bàn ăn", "các bàn ăn", "/admin/tables"], ["Thực đơn", "các món ăn", "/admin/menu"], ["Khách hàng", "khách hàng", "/admin/customers"], ["Sự kiện", "các sự kiện", "/admin/events"], ["Đánh giá", "các đánh giá", "/admin/reviews"]];
  return <div className="min-h-screen bg-[#f7f1e7]"><main className="pt-32 pb-20 px-4"><div className="max-w-7xl mx-auto"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[#a64b32] font-semibold tracking-[0.2em]">QUẢN TRỊ MỘC VIỆT</p><h1 className="text-4xl font-bold text-[#3b291e] mt-3">BẢNG ĐIỀU KHIỂN</h1></div><Link href="/booking" className="bg-[#355443] text-white px-5 py-3">XEM TRANG ĐẶT BÀN</Link></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{stats.map(([label, value]) => <div key={label} className="bg-white border border-[#e4d8c8] p-6"><p className="text-[#6d5847]">{label}</p><p className="text-3xl font-bold text-[#355443] mt-3">{value}</p></div>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">{modules.map(([label, description, href]) => <div key={label} className="bg-white border border-[#e4d8c8] p-6"><h2 className="text-xl font-bold text-[#3b291e]">{label}</h2><p className="text-[#6d5847] mt-2">Quản lý {description}.</p><Link href={href} className="inline-block text-[#a64b32] font-semibold mt-5 hover:text-[#7b3515]">MỞ PHÂN HỆ →</Link></div>)}</div></div></main><Footer /></div>;
}
