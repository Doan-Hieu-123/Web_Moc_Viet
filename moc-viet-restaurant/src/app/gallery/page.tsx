"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const photos = [
  { title: "Bún bò Huế Mộc Việt", category: "Món ăn", icon: "🍜" },
  { title: "Bánh xèo tôm thịt", category: "Món ăn", icon: "🥞" },
  { title: "Cá kho tộ", category: "Món ăn", icon: "🍲" },
  { title: "Bếp mở Mộc Việt", category: "Đầu bếp", icon: "👨‍🍳" },
  { title: "Góc bàn tre", category: "Không gian", icon: "🪵" },
  { title: "Trà sen Huế", category: "Nguyên liệu", icon: "🪷" },
  { title: "Rau thơm địa phương", category: "Nguyên liệu", icon: "🌿" },
  { title: "Mâm cơm ba miền", category: "Văn hóa Việt", icon: "🍚" },
  { title: "Đêm ẩm thực Huế", category: "Sự kiện", icon: "🎎" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["Tất cả", ...new Set(photos.map((photo) => photo.category))];
  const filtered = photos.filter((photo) => activeCategory === "Tất cả" || photo.category === activeCategory);

  const move = (direction: number) => {
    if (selected === null) return;
    setSelected((selected + direction + filtered.length) % filtered.length);
  };

  return (
    <div className="min-h-screen bg-[#f7f1e7]">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#a64b32] font-semibold tracking-[0.2em]">HÌNH ẢNH MỘC VIỆT</p>
            <h1 className="text-5xl font-bold text-[#3b291e] mt-3">THƯ VIỆN ẢNH</h1>
            <p className="text-[#6d5847] mt-4">Những khoảnh khắc từ gian bếp, bàn ăn và những vùng đất Việt.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full border ${activeCategory === category ? "bg-[#355443] text-white border-[#355443]" : "border-[#cdbca5] text-[#355443]"}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((photo, index) => (
              <button key={photo.title} onClick={() => setSelected(index)} className="text-left bg-white border border-[#e4d8c8] overflow-hidden group">
                <div className="h-64 bg-[#e9ddc9] flex items-center justify-center group-hover:bg-[#dfcfb4] transition-colors"><span className="text-8xl group-hover:scale-110 transition-transform">{photo.icon}</span></div>
                <div className="p-5"><p className="text-xs uppercase tracking-wider text-[#a64b32]">{photo.category}</p><h2 className="font-bold text-[#3b291e] mt-2">{photo.title}</h2></div>
              </button>
            ))}
          </div>
        </div>
      </main>
      {selected !== null && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Xem ảnh">
          <button onClick={() => setSelected(null)} className="absolute top-5 right-5 text-white" aria-label="Đóng"><X /></button>
          <button onClick={() => move(-1)} className="absolute left-5 text-white" aria-label="Ảnh trước"><ChevronLeft size={36} /></button>
          <div className="text-center"><div className="text-[10rem]">{filtered[selected].icon}</div><p className="text-white text-xl">{filtered[selected].title}</p></div>
          <button onClick={() => move(1)} className="absolute right-5 text-white" aria-label="Ảnh sau"><ChevronRight size={36} /></button>
        </div>
      )}
      <Footer />
    </div>
  );
}
