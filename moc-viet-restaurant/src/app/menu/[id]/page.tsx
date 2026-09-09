import { getMenuItems } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function MenuItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allMenuItems = getMenuItems();
  const item = allMenuItems.find(
    (m: typeof allMenuItems[0]) => m.id === id
  );

  if (!item) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-amber-950">Không tìm thấy</h1>
            <p className="text-amber-800 mt-4">Món ăn này không tồn tại</p>
            <Link
              href="/menu"
              className="inline-block mt-6 px-6 py-3 bg-amber-900 text-white rounded hover:bg-amber-800 transition-colors"
            >
              Quay lại Thực đơn
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related items (same category, different item)
  const relatedItems = allMenuItems
    .filter(
      (m: typeof allMenuItems[0]) =>
        m.category === item.category && m.id !== item.id
    )
    .slice(0, 3);

  const getSpiceLevelDisplay = (level: number) => {
    return "🌶️".repeat(level);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 mb-8"
          >
            <ArrowLeft size={20} />
            Quay lại thực đơn
          </Link>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-96 flex items-center justify-center">
              <span className="text-9xl">🍜</span>
            </div>

            {/* Details */}
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold">
                  {item.category}
                </span>
                {item.isSignature && (
                  <span className="px-3 py-1 bg-amber-900 text-white rounded-full text-sm font-semibold">
                    ⭐ Đặc biệt
                  </span>
                )}
                {item.isVegetarian && (
                  <span className="px-3 py-1 bg-green-100 text-green-900 rounded-full text-sm font-semibold">
                    🌱 Chay
                  </span>
                )}
              </div>

              {/* Name & Status */}
              <h1 className="text-4xl font-bold text-amber-950 mb-4">
                {item.name}
              </h1>

              {/* Availability */}
              <div className="mb-6">
                {item.isAvailable ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-900 rounded">
                    ✓ Còn hàng
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-900 rounded">
                    ✗ Hết hàng
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-amber-800 text-lg mb-8">{item.description}</p>

              {/* Spice Level */}
              {item.spiceLevel > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-amber-900 mb-2">
                    Mức cay:
                  </p>
                  <p className="text-2xl">{getSpiceLevelDisplay(item.spiceLevel)}</p>
                </div>
              )}

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-amber-200">
                <p className="text-amber-700 text-sm mb-2">Giá</p>
                <p className="text-4xl font-bold text-amber-950">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-amber-900 text-white rounded hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 font-semibold">
                  <ShoppingCart size={20} />
                  Thêm vào giỏ
                </button>
                <button className="px-6 py-3 border-2 border-amber-900 text-amber-900 rounded hover:bg-amber-50 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="mt-16 pt-16 border-t border-amber-200">
              <h2 className="text-3xl font-bold text-amber-950 mb-8">
                Các món khác trong danh mục
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedItems.map((relatedItem: typeof allMenuItems[0]) => (
                  <Link
                    key={relatedItem.id}
                    href={`/menu/${relatedItem.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Image */}
                      <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-40 flex items-center justify-center">
                        <span className="text-5xl">🍜</span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p className="text-sm text-amber-700 mb-2">
                          {relatedItem.category}
                        </p>
                        <h3 className="font-bold text-amber-950 group-hover:text-amber-700 mb-3">
                          {relatedItem.name}
                        </h3>

                        {/* Price */}
                        <p className="text-lg font-bold text-amber-900 mb-3">
                          {relatedItem.price.toLocaleString("vi-VN")}đ
                        </p>

                        {/* View Button */}
                        <button className="w-full px-3 py-2 bg-amber-50 text-amber-900 rounded hover:bg-amber-100 transition-colors text-sm font-semibold">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
