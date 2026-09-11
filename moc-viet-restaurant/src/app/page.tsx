"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-950 mb-4">
              CÂU CHUYỆN CỦA MỘC VIỆT
            </h2>
            <p className="text-amber-700 text-lg">
              Tình yêu dành cho những món ăn đã đi cùng người Việt qua nhiều thế hệ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-amber-900 mb-4">
                MỘC VIỆT được tạo nên từ tình yêu dành cho những món ăn đã đi cùng
                người Việt qua nhiều thế hệ.
              </p>
              <ul className="space-y-2 text-amber-800">
                <li>✓ Hương vị gia đình</li>
                <li>✓ Nguyên liệu địa phương</li>
                <li>✓ Gia vị truyền thống</li>
                <li>✓ Kỹ thuật chế biến hiện đại</li>
                <li>✓ Văn hóa ẩm thực ba miền</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-80 rounded-lg flex items-center justify-center">
              <p className="text-amber-700">Hình ảnh nhà hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Regions */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-amber-950 mb-12 text-center">
            HƯƠNG VỊ BA MIỀN
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                region: "MIỀN BẮC",
                description: "Thanh, tinh tế, cân bằng",
                dishes: ["Phở Bò", "Chả Cá", "Bún Thang"],
              },
              {
                region: "MIỀN TRUNG",
                description: "Đậm đà, cay, nhiều tầng hương vị",
                dishes: ["Bún Bò Huế", "Mì Quảng", "Bánh Bèo"],
              },
              {
                region: "MIỀN NAM",
                description: "Ngọt dịu, phóng khoáng, sông nước",
                dishes: ["Cá Kho Tộ", "Lẩu Mắm", "Bánh Xèo"],
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  {item.region}
                </h3>
                <p className="text-amber-700 mb-4">{item.description}</p>
                <ul className="space-y-1 text-sm text-amber-800">
                  {item.dishes.map((dish, i) => (
                    <li key={i}>• {dish}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

