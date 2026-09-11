"use client";

import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface CurrentUser {
  fullName: string;
  email: string;
  role: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data: { user: CurrentUser | null }) => {
        if (active) setCurrentUser(data.user);
      })
      .catch(() => {
        if (active) setCurrentUser(null);
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  const primaryNavItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Câu chuyện", href: "/story" },
    { label: "Thực đơn", href: "/menu" },
    { label: "Món đặc trưng", href: "/signature" },
    { label: "Đầu bếp", href: "/chef" },
    { label: "Không gian", href: "/space" },
  ];

  const secondaryNavItems = [
    { label: "Thư viện ảnh", href: "/gallery" },
    { label: "Sự kiện", href: "/events" },
    { label: "Nhật ký", href: "/blog" },
    { label: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f1e7]/95 backdrop-blur-sm border-b border-[#dfcfb9] shadow-sm transition-colors">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6 text-[#3b291e]">
        {/* Logo */}
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-wide text-[#7b3515]">
          MỘC VIỆT
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex flex-1 justify-center gap-6 text-[13px] font-medium whitespace-nowrap">
          {primaryNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`relative text-[#3b291e] hover:text-[#a64b32] transition-colors ${
                  pathname === item.href
                    ? "font-bold text-[#a64b32] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-[#a64b32]"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="relative">
            <button
              type="button"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              aria-expanded={moreMenuOpen}
              className={`flex items-center gap-2 text-[#3b291e] hover:text-[#a64b32] transition-colors ${
                secondaryNavItems.some((item) => pathname === item.href)
                  ? "font-bold text-[#a64b32]"
                  : ""
              }`}
            >
              <Menu size={17} />
              <span>Xem thêm</span>
            </button>
            {moreMenuOpen && (
              <div className="absolute right-0 top-9 w-48 border border-[#dfcfb9] bg-[#fffdf8] py-2 shadow-lg">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreMenuOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-[#eadcc8] hover:text-[#a64b32] ${
                      pathname === item.href
                        ? "font-bold text-[#a64b32] bg-[#f2e8d9]"
                        : "text-[#3b291e]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right Actions */}
        <div className="hidden xl:flex shrink-0 gap-3 items-center justify-end">
          {!authLoading && currentUser ? (
            <>
              {currentUser.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className={`max-w-40 truncate text-sm font-semibold transition-colors ${
                    pathname === "/admin"
                      ? "text-[#a64b32]"
                      : "text-[#355443] hover:text-[#a64b32]"
                  }`}
                  aria-current={pathname === "/admin" ? "page" : undefined}
                  title={currentUser.fullName}
                >
                  {currentUser.fullName}
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={`max-w-40 truncate text-sm font-semibold transition-colors ${
                    pathname === "/dashboard"
                      ? "text-[#a64b32]"
                      : "text-[#355443] hover:text-[#a64b32]"
                  }`}
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                  title={currentUser.fullName}
                >
                  {currentUser.fullName}
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a98d] px-3 py-1.5 text-xs font-semibold text-[#7b3515] hover:border-[#a64b32] hover:bg-[#f2e8d9] transition-colors"
              >
                <LogOut size={14} />
                Đăng xuất
              </button>
            </>
          ) : !authLoading ? (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#355443] hover:text-[#a64b32]"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="border-l border-[#dfcfb9] pl-3 text-sm font-semibold text-[#355443] hover:text-[#a64b32]"
              >
                Đăng ký
              </Link>
            </>
          ) : null}
          <Link href="/booking" className="bg-[#7b3515] text-white px-6 py-2 rounded text-sm hover:bg-[#5f2810] transition">
            ĐẶT BÀN
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="ml-auto xl:hidden text-[#3b291e]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#f7f1e7] border-t border-[#dfcfb9]">
          <ul className="flex flex-col p-4 gap-4">
            {[...primaryNavItems, ...secondaryNavItems].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm text-[#3b291e] hover:text-[#a64b32] ${
                    pathname === item.href
                      ? "font-bold text-[#a64b32] bg-[#eadcc8] px-3 py-2 -mx-3"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <Link href="/booking" className="bg-[#7b3515] text-white px-6 py-2 rounded text-sm w-full text-center">
              ĐẶT BÀN
            </Link>
            <li className="border-t border-[#dfcfb9] pt-4 mt-1">
              {!authLoading && currentUser ? (
                <>
                  {currentUser.role === "ADMIN" ? (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#355443] hover:text-[#a64b32]">
                      Tài khoản: {currentUser.fullName}
                    </Link>
                  ) : (
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#355443] hover:text-[#a64b32]">
                      Tài khoản: {currentUser.fullName}
                    </Link>
                  )}
                  <button type="button" onClick={handleLogout} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7b3515] hover:text-[#a64b32] mt-3">
                    <LogOut size={14} />
                    Đăng xuất
                  </button>
                </>
              ) : !authLoading ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#355443] hover:text-[#a64b32]">
                    Đăng nhập
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#355443] hover:text-[#a64b32] mt-3">
                    Đăng ký tài khoản
                  </Link>
                </>
              ) : null}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
