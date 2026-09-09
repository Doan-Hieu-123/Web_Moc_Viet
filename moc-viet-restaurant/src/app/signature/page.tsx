import { getSignatureMenuItems } from "@/lib/db";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function SignaturePage() {
  const signatureItems = getSignatureMenuItems();

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4 text-5xl">⭐</div>
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            HƯƠNG VỊ ĐẶC TRƯNG
          </h1>
          <p className="text-lg md:text-xl text-amber-800 max-w-2xl mx-auto">
            Những món ăn đã được chọn lọc kỹ càng, mang đậm tinh hoa ẩm thực Việt
            Nam qua bàn tay của đầu bếp MỘC VIỆT
          </p>
        </div>
      </section>

      {/* Signature Items */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {signatureItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-700 text-lg">
                Hiện tại chưa có món đặc biệt nào
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {signatureItems.map((item, index) => (
                <div key={item.id}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "md:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={index % 2 === 1 ? "md:col-start-2" : ""}
                    >
                      <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden h-96">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                      <div className="mb-4">
                        <span className="inline-block px-4 py-2 bg-amber-900 text-white text-sm font-semibold rounded-full">
                          ⭐ Đặc biệt
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
                        {item.name}
                      </h2>

                      <p className="text-amber-700 text-sm font-semibold mb-4">
                        {item.category}
                        {item.isVegetarian && " • 🌱 Chay"}
                      </p>

                      <p className="text-amber-800 text-lg leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        {item.spiceLevel > 0 && (
                          <div>
                            <p className="text-amber-700 text-sm font-semibold mb-1">
                              Mức độ chua:
                            </p>
                            <p className="text-lg">
                              {Array(item.spiceLevel)
                                .fill("🌶️")
                                .join("")}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-amber-700 text-sm font-semibold mb-1">
                            Trạng thái:
                          </p>
                          <p className="text-lg">
                            {item.isAvailable ? (
                              <span className="text-green-600 font-semibold">
                                ✓ Có sẵn
                              </span>
                            ) : (
                              <span className="text-red-600 font-semibold">
                                ✗ Hết
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-amber-900">
                            {item.price.toLocaleString("vi-VN")}
                          </span>
                          <span className="text-xl text-amber-700">₫</span>
                        </div>
                        <Link
                          href={`/menu/${item.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
                        >
                          Xem chi tiết
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < signatureItems.length - 1 && (
                    <div className="my-16 border-t-2 border-amber-200" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-amber-900">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Khám phá thêm nhiều hương vị
          </h3>
          <p className="text-amber-100 mb-6">
            Chuyên đến thực đơn đầy đủ của MỘC VIỆT
          </p>
          <Link
            href="/menu"
            className="inline-block px-8 py-3 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-white transition-colors"
          >
            XEM THỰC ĐƠN ĐẦY ĐỦ
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
