import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tối Nhạc Truyền Thống Việt Nam",
      date: "2024-10-15",
      time: "19:00",
      location: "Khu vực Trung tâm",
      capacity: "50 khách",
      description:
        "Một buổi tối đặc biệt với âm nhạc truyền thống Việt Nam được biểu diễn trực tiếp, kết hợp với thực đơn đặc biệt.",
      price: "Miễn phí (có tiêu dùng tối thiểu)",
      image: "🎵",
    },
    {
      id: 2,
      title: "Lớp nấu ăn cơ bản Việt Nam",
      date: "2024-10-22",
      time: "10:00",
      location: "Bếp MỘC VIỆT",
      capacity: "15 khách",
      description:
        "Học hỏi những kỹ thuật nấu ăn cơ bản từ đầu bếp chuyên nghiệp và tạo nên những món ăn Việt Nam nổi tiếng.",
      price: "500.000₫ / người",
      image: "👨‍🍳",
    },
    {
      id: 3,
      title: "Buổi thử thực đơn mùa thu",
      date: "2024-10-29",
      time: "18:00",
      location: "Khu vực Tây",
      capacity: "30 khách",
      description:
        "Hãy trước tiên thử những món ăn mới nhất của mùa thu tại MỘC VIỆT với những tài liệu mô tả chi tiết.",
      price: "350.000₫ / người",
      image: "🍂",
    },
    {
      id: 4,
      title: "Cơm tối gia đình",
      date: "2024-11-05",
      time: "17:30",
      location: "Khu vực Đông",
      capacity: "Không giới hạn",
      description:
        "Buổi cơm tối đặc biệt cho gia đình và bạn bè, với thực đơn giảm giá và không khí ấm cúng.",
      price: "Giảm 20% cho nhóm từ 4 người",
      image: "👨‍👩‍👧‍👦",
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            SỰ KIỆN TẠI MỘC VIỆT
          </h1>
          <p className="text-lg md:text-xl text-amber-800">
            Tham gia những buổi sự kiện đặc biệt, học hỏi và tận hưởng ẩm thực
            cùng cộng đồng MỘC VIỆT
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Sự kiện sắp tới
          </h2>

          <div className="space-y-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-64 md:h-auto flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform">
                      {event.image}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-950 mb-4 group-hover:text-amber-700">
                        {event.title}
                      </h3>

                      <p className="text-amber-800 mb-6 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-amber-900" />
                          <div>
                            <p className="text-amber-700 text-sm">Ngày</p>
                            <p className="font-semibold text-amber-950">
                              {formatDate(event.date)} {event.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-amber-900" />
                          <div>
                            <p className="text-amber-700 text-sm">Sức chứa</p>
                            <p className="font-semibold text-amber-950">
                              {event.capacity}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-amber-900" />
                          <div>
                            <p className="text-amber-700 text-sm">Địa điểm</p>
                            <p className="font-semibold text-amber-950">
                              {event.location}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-amber-700 text-sm">Giá vé</p>
                          <p className="font-semibold text-amber-950">
                            {event.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <div>
                      <button className="flex items-center gap-2 px-6 py-2 bg-amber-900 text-white font-semibold rounded hover:bg-amber-800 transition-colors">
                        ĐỀN SỰ KIỆN NGAY
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Sự kiện đã qua
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-40 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  📸
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-3 border-2 border-amber-900 text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors">
              XEM TẤT CẢ SỰ KIỆN
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg p-12 border border-amber-200">
          <h2 className="text-2xl font-bold text-amber-950 mb-4 text-center">
            Nhận thông báo sự kiện
          </h2>
          <p className="text-amber-800 text-center mb-6">
            Đăng ký để nhận thông báo về các sự kiện sắp tới và ưu đãi đặc biệt
            cho các thành viên
          </p>

          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Không tìm thấy sự kiện bạn muốn?
          </h2>
          <p className="text-amber-100 mb-8">
            Hãy liên hệ với chúng tôi để tổ chức sự kiện riêng của bạn
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-white transition-colors"
          >
            LIÊN HỆ NGAY
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
