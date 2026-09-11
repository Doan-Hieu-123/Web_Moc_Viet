import Footer from "@/components/Footer";

const ingredients = [
  ["Tiêu Phú Quốc", "Kiên Giang", "Tạo độ cay ấm và hương thơm sâu cho món kho.", "🌶️"],
  ["Quế Trà My", "Quảng Nam", "Gia vị bản địa dùng trong nước dùng và món nướng.", "🌿"],
  ["Sen Huế", "Thừa Thiên Huế", "Hương sen thanh nhẹ cho trà và món tráng miệng.", "🪷"],
  ["Cà phê Buôn Ma Thuột", "Đắk Lắk", "Vị đậm, hậu chocolate cho phin cà phê Việt.", "☕"],
  ["Mắm truyền thống", "Phú Quốc", "Nền vị umami cân bằng cho các món Việt.", "🫙"],
  ["Gạo Việt", "Đồng bằng sông Cửu Long", "Hạt gạo thơm dẻo trong cơm và món cuốn.", "🌾"],
];

export default function IngredientsPage() {
  return <div className="min-h-screen bg-[#f7f1e7]"><main className="pt-32 pb-20 px-4"><div className="max-w-6xl mx-auto"><div className="max-w-2xl mb-12"><p className="text-[#a64b32] font-semibold tracking-[0.2em]">TỪ NHỮNG VÙNG ĐẤT VIỆT</p><h1 className="text-5xl font-bold text-[#3b291e] mt-3">NGUYÊN LIỆU MỘC VIỆT</h1><p className="text-[#6d5847] mt-5 text-lg">Mỗi nguyên liệu là một câu chuyện về đất, nước và bàn tay người Việt.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{ingredients.map(([name, origin, story, icon]) => <article key={name} className="bg-white border border-[#e4d8c8] p-7"><div className="text-6xl mb-6">{icon}</div><p className="text-sm text-[#a64b32]">{origin}</p><h2 className="text-2xl font-bold text-[#3b291e] mt-2">{name}</h2><p className="text-[#6d5847] mt-4 leading-7">{story}</p></article>)}</div></div></main><Footer /></div>;
}
