import { getMenuItems } from "@/lib/db";
import Link from "next/link";
import { Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function MenuPage() {
  const allMenuItems = getMenuItems();

  // Group items by category
  const itemsByCategory = allMenuItems.reduce(
    (acc: Record<string, typeof allMenuItems>, item: typeof allMenuItems[0]) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof allMenuItems>
  );

  const categoryOrder = [
    "Khai vị",
    "Món cuốn",
    "Món Bắc",
    "Món Trung",
    "Món Nam",
    "Hải sản",
    "Món chay",
    "Cơm Việt",
    "Canh",
    "Tráng miệng",
    "Trà Việt",
    "Cà phê",
    "Đồ uống",
  ];

  const sortedCategories = categoryOrder.filter(
    (cat) => itemsByCategory[cat]
  );

  const categoryLabels: Record<string, string> = {
    "Khai vị": "🥟 Khai vị",
    "Món cuốn": "🌮 Món cuốn",
    "Món Bắc": "🍜 Món Bắc",
    "Món Trung": "🌶️ Món Trung",
    "Món Nam": "🥘 Món Nam",
    "Hải sản": "🦐 Hải sản",
    "Món chay": "🥒 Món chay",
    "Cơm Việt": "🍚 Cơm Việt",
    "Canh": "🍲 Canh Việt",
    "Tráng miệng": "🍰 Tráng miệng",
    "Trà Việt": "🍵 Trà Việt",
    "Cà phê": "☕ Cà phê Việt",
    "Đồ uống": "🥤 Đồ uống",
  };

  const getSpiceLevelDisplay = (level: number) => {
    const peppers = Array(level).fill("🌶️").join("");
    return peppers || "Nhẹ";
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            THỰC ĐƠN MỘC VIỆT
          </h1>
          <p className="text-lg md:text-xl text-amber-800 max-w-2xl mx-auto">
            Khám phá những hương vị truyền thống được chế biến từ những nguyên liệu
            tốt nhất, mang đến cho bạn trải nghiệm ẩm thực đầy ấn tượng.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {sortedCategories.map((category) => (
            <div key={category} className="mb-16">
              {/* Category Header */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-950 pb-4 border-b-2 border-amber-900">
                  {categoryLabels[category]}
                </h2>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {itemsByCategory[category].map((item: typeof allMenuItems[0]) => (
                  <Link
                    key={item.id}
                    href={`/menu/${item.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                      {/* Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-50 relative overflow-hidden">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        {item.isSignature && (
                          <div className="absolute top-3 right-3 bg-amber-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            ⭐ Đặc biệt
                          </div>
                        )}
                        {item.isVegetarian && (
                          <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            🌱 Chay
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-amber-950 mb-2 group-hover:text-amber-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-amber-700 mb-3 flex-1 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Spice Level */}
                        {item.spiceLevel > 0 && (
                          <div className="text-sm mb-3">
                            {getSpiceLevelDisplay(item.spiceLevel)}
                          </div>
                        )}

                        {/* Price and Favorite */}
                        <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                          <span className="text-xl font-bold text-amber-900">
                            {item.price.toLocaleString("vi-VN")}₫
                          </span>
                          <button
                            className="p-2 rounded-full hover:bg-amber-100 transition-colors"
                            type="button"
                            aria-label={`Lưu ${item.name} vào món yêu thích`}
                          >
                            <Heart className="w-5 h-5 text-amber-700 hover:text-amber-900" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-amber-900">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sẵn sàng thưởng thức?
          </h3>
          <p className="text-amber-100 mb-6">
            Hãy đặt bàn ngay để trải nghiệm hương vị MỘC VIỆT
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-white transition-colors"
          >
            ĐẶT BÀN NGAY
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
