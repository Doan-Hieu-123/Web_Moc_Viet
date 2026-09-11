import Footer from "@/components/Footer";
import { Users, Wifi, Music, Trees } from "lucide-react";

export default function SpacePage() {
  const areas = [
    {
      name: "Khu vực Tây",
      description:
        "Không gian mở rộng với cửa sổ lớn nhìn ra đường phố, thích hợp cho các buổi gặp mặt công việc hoặc ăn mừng.",
      capacity: "30-50 khách",
      features: ["Wi-Fi miễn phí", "Không khí thoáng", "Ánh sáng tự nhiên"],
      icon: "🪟",
    },
    {
      name: "Khu vực Đông",
      description:
        "Không gian ấm cúng với trang trí theo phong cách truyền thống Việt Nam, tạo cảm giác thân thuộc.",
      capacity: "20-30 khách",
      features: ["Trang trí truyền thống", "Bàn tròn", "Phù hợp gia đình"],
      icon: "🏮",
    },
    {
      name: "Khu vực Trung tâm",
      description:
        "Quầy bar và khu vực chính, là trái tim của MỘC VIỆT. Nơi khách hàng có thể tương tác với đầu bếp.",
      capacity: "40-60 khách",
      features: [
        "Nhìn bếp mở",
        "Bar counter",
        "Không khí sôi động",
      ],
      icon: "🍽️",
    },
  ];

  const amenities = [
    {
      icon: Wifi,
      name: "Wi-Fi miễn phí",
      desc: "Kết nối internet tốc độ cao tại tất cả khu vực",
    },
    {
      icon: Music,
      name: "Âm nhạc sống",
      desc: "Âm nhạc Việt Nam cổ điển vào các buổi tối cuối tuần",
    },
    {
      icon: Trees,
      name: "Cây xanh tự nhiên",
      desc: "Không gian sân vườn với cây xanh tự nhiên",
    },
    {
      icon: Users,
      name: "Phòng riêng",
      desc: "Có sẵn phòng riêng cho các buổi họp hoặc tiệc",
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            KHÔNG GIAN CỦA CHÚNG TÔI
          </h1>
          <p className="text-lg md:text-xl text-amber-800">
            Một không gian ấm cúng, kết hợp nét truyền thống Việt Nam với hiện
            đại, tạo nên bối cảnh hoàn hảo cho bữa ăn của bạn
          </p>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Ba khu vực chính
          </h2>

          <div className="space-y-16">
            {areas.map((area, index) => (
              <div key={index}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={index % 2 === 1 ? "md:col-start-2" : ""}
                  >
                    <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-96 flex items-center justify-center">
                      <span className="text-7xl">{area.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-950 mb-4">
                      {area.name}
                    </h3>

                    <p className="text-amber-800 text-lg leading-relaxed mb-6">
                      {area.description}
                    </p>

                    <div className="mb-6 p-4 bg-amber-50 rounded border border-amber-200">
                      <p className="text-amber-700 font-semibold">
                        Sức chứa: {area.capacity}
                      </p>
                    </div>

                    <div>
                      <p className="text-amber-700 font-semibold mb-3">
                        Tiện nghi:
                      </p>
                      <ul className="space-y-2">
                        {area.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-amber-800">
                            <span className="text-amber-900">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {index < areas.length - 1 && (
                  <div className="my-16 border-t-2 border-amber-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Tiện nghi & Dịch vụ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="bg-amber-50 rounded-lg p-6 text-center border border-amber-200"
                >
                  <Icon className="w-12 h-12 text-amber-900 mx-auto mb-4" />
                  <h3 className="font-bold text-amber-950 mb-2">
                    {amenity.name}
                  </h3>
                  <p className="text-amber-800 text-sm">{amenity.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Thư viện ảnh
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-64 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  📷
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Events Space */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-amber-950 mb-6 text-center">
              Không gian cho sự kiện đặc biệt
            </h2>

            <p className="text-amber-800 text-lg leading-relaxed mb-8 text-center">
              MỘC VIỆT có sẵn những không gian riêng biệt cho các sự kiện đặc
              biệt như sinh nhật, đám cưới, họp công ty, hoặc tiệc kỷ niệm.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-amber-900 pl-6">
                <h3 className="font-bold text-amber-950 mb-2">
                  Sức chứa tối đa
                </h3>
                <p className="text-amber-800">150 khách</p>
              </div>
              <div className="border-l-4 border-amber-900 pl-6">
                <h3 className="font-bold text-amber-950 mb-2">
                  Hỗ trợ catering
                </h3>
                <p className="text-amber-800">Menu tùy chỉnh có sẵn</p>
              </div>
              <div className="border-l-4 border-amber-900 pl-6">
                <h3 className="font-bold text-amber-950 mb-2">
                  Trang trí & Layout
                </h3>
                <p className="text-amber-800">Tùy chỉnh theo yêu cầu</p>
              </div>
              <div className="border-l-4 border-amber-900 pl-6">
                <h3 className="font-bold text-amber-950 mb-2">
                  Giá cả cạnh tranh
                </h3>
                <p className="text-amber-800">Gói tổng hợp có sẵn</p>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors">
              TƯ VẤN SỰ KIỆN
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
