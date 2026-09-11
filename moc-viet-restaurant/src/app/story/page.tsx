import Footer from "@/components/Footer";
import Link from "next/link";
import { Leaf, Heart, Zap } from "lucide-react";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            CÂU CHUYỆN CỦA MỘC VIỆT
          </h1>
          <p className="text-lg md:text-xl text-amber-800 max-w-3xl mx-auto">
            Từ tình yêu dành cho ẩm thực truyền thống, MỘC VIỆT được sinh ra
            như một lời tri ân dành cho di sản ẩm thực Việt Nam
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-950 mb-6">
                Nguồn gốc MỘC VIỆT
              </h2>
              <p className="text-amber-800 text-lg leading-relaxed mb-4">
                MỘC VIỆT được tạo nên từ tình yêu dành cho những món ăn dân dã,
                những hương vị quen thuộc từ lâu lắc của người Việt. Tên gọi
                "Mộc Việt" chứa đầy ý nghĩa - "Mộc" tượng trưng cho cái nguyên
                thủy, tự nhiên, không giả tạo; "Việt" nói đến cái hồn ẩm thực
                của đất nước ta.
              </p>
              <p className="text-amber-800 text-lg leading-relaxed">
                Từng công thức nấu ăn, từng hương liệu, từng nguyên liệu được
                lựa chọn kỹ càng từ các vùng quê xa xôi của Việt Nam. Chúng tôi
                tin rằng ẩm thực chân thực phải bắt đầu từ những nguyên liệu tốt
                nhất.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-96" />
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:grid-flow-dense">
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-96" />
            <div>
              <h2 className="text-3xl font-bold text-amber-950 mb-6">
                Triết lý của chúng tôi
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Leaf className="w-8 h-8 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-950 mb-2">
                      Nguyên liệu địa phương
                    </h3>
                    <p className="text-amber-800">
                      Chúng tôi hợp tác với những nông dân và nhà sản xuất địa
                      phương để mang đến những nguyên liệu tươi ngon, chất lượng
                      cao nhất.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Heart className="w-8 h-8 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-950 mb-2">
                      Nấu ăn với tình yêu
                    </h3>
                    <p className="text-amber-800">
                      Mỗi công thức nấu ăn được thêm công yêu thương và tâm huyết
                      của đầu bếp. Chúng tôi tin rằng ẩm thực tốt nhất là ẩm thực
                      được nấu từ trái tim.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Zap className="w-8 h-8 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-950 mb-2">
                      Đổi mới truyền thống
                    </h3>
                    <p className="text-amber-800">
                      Trong khi tôn trọng truyền thống, chúng tôi không ngừng đổi
                      mới để mang đến những trải nghiệm ẩm thực mới mẻ và hiện đại.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
              Những giá trị cốt lõi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 text-5xl">👨‍🍳</div>
                <h3 className="font-bold text-amber-950 mb-3 text-lg">
                  Đầu bếp giàu kinh nghiệm
                </h3>
                <p className="text-amber-800">
                  Đội ngũ đầu bếp của MỘC VIỆT có hơn 15 năm kinh nghiệm nấu
                  nước ngoài và trong nước, mang lại những góc nhìn độc đáo.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-5xl">🌾</div>
                <h3 className="font-bold text-amber-950 mb-3 text-lg">
                  Nguyên liệu tuyệt vời
                </h3>
                <p className="text-amber-800">
                  Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất, tươi ngon,
                  được chọn lọc cẩn thận từ các vùng nổi tiếng.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-5xl">❤️</div>
                <h3 className="font-bold text-amber-950 mb-3 text-lg">
                  Dịch vụ tận tâm
                </h3>
                <p className="text-amber-800">
                  Mỗi khách hàng là quý khách của MỘC VIỆT. Chúng tôi cam kết mang
                  đến trải nghiệm tuyệt nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Chef Intro */}
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg p-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-amber-200 rounded-full flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-amber-950">
                  Bếp trưởng Nguyễn Văn A
                </h3>
                <p className="text-amber-700">Đầu bếp - Sáng lập viên</p>
              </div>
            </div>
            <p className="text-amber-800 text-lg leading-relaxed">
              Với 15 năm kinh nghiệm nấu ăn tại các nhà hàng 5 sao ở Hà Nội, TP.
                  HCM và Pháp, Bếp trưởng Nguyễn Văn A mang lại một góc nhìn độc đáo về
              ẩm thực Việt Nam. Niềm đam mê của Chef là kết hợp các kỹ thuật
              nấu ăn hiện đại với những công thức truyền thống của đất nước.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Trở thành một phần của gia đình MỘC VIỆT
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            Chúng tôi rất mong chờ được chào đón bạn tại MỘC VIỆT
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-8 py-3 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-white transition-colors"
            >
              KHÁM PHÁ THỰC ĐƠN
            </Link>
            <Link
              href="/booking"
              className="px-8 py-3 border-2 border-amber-100 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              ĐẶT BÀN NGAY
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
