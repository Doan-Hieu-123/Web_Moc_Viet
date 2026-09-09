"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Câu chuyện", href: "/story" },
    { label: "Thực đơn", href: "/menu" },
    { label: "Món đặc trưng", href: "/signature" },
    { label: "Đầu bếp", href: "/chef" },
    { label: "Không gian", href: "/space" },
    { label: "Thư viện ảnh", href: "/gallery" },
    { label: "Sự kiện", href: "/events" },
    { label: "Nhật ký", href: "/blog" },
    { label: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f1e7]/95 backdrop-blur-sm border-b border-[#dfcfb9] shadow-sm transition-colors">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-[#3b291e]">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-[#7b3515]">
          MỘC VIỆT
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-5 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[#3b291e] hover:text-[#a64b32] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="hidden lg:flex gap-4 items-center">
          <button className="text-sm text-[#355443] hover:text-[#a64b32]">VN / EN</button>
          <Link href="/booking" className="bg-[#7b3515] text-white px-6 py-2 rounded text-sm hover:bg-[#5f2810] transition">
            ĐẶT BÀN
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[#3b291e]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f7f1e7] border-t border-[#dfcfb9]">
          <ul className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[#3b291e] hover:text-[#a64b32]">
                  {item.label}
                </Link>
              </li>
            ))}
            <Link href="/booking" className="bg-[#7b3515] text-white px-6 py-2 rounded text-sm w-full text-center">
              ĐẶT BÀN
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
