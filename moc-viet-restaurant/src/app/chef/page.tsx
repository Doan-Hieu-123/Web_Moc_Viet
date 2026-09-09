import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Award, Utensils, Heart } from "lucide-react";

export default function ChefPage() {
  const chefs = [
    {
      name: "Bếp trưởng Nguyễn Văn A",
      role: "Bếp trưởng & Nhà sáng lập",
      bio: "Với 15 năm kinh nghiệm nấu ăn tại các nhà hàng 5 sao ở Hà Nội, TP. HCM và Pháp, Bếp trưởng Nguyễn Văn A mang lại một góc nhìn độc đáo về ẩm thực Việt Nam.",
      speciality: "Món nước & Cơm chiên",
      image: "👨‍🍳",
    },
    {
      name: "Bếp phó Trần Thị B",
      role: "Bếp phó",
      bio: "Bếp phó Trần Thị B là chuyên gia về ẩm thực miền Bắc với 10 năm kinh nghiệm. Cô luôn tìm cách mang đến hương vị truyền thống nhưng mới mẻ.",
      speciality: "Hải sản & Canh súp",
      image: "👩‍🍳",
    },
    {
      name: "Bếp bánh Lê Văn C",
      role: "Phụ trách bánh & tráng miệng",
      bio: "Bếp bánh Lê Văn C đã học tập và làm việc tại các tiệm bánh nổi tiếng ở Pháp và Hà Nội. Anh tạo nên những món tráng miệng độc đáo.",
      speciality: "Tráng miệng & Bánh",
      image: "👨‍🍳",
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            ĐỘI NGŨ ĐẦU BẾP
          </h1>
          <p className="text-lg md:text-xl text-amber-800">
            Những tài năng nấu ăn hàng đầu, tận tâm mang đến những trải
            nghiệm ẩm thực tuyệt vời cho bạn
          </p>
        </div>
      </section>

      {/* Head Chef Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg h-96 flex items-center justify-center">
                <span className="text-9xl">{chefs[0].image}</span>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-amber-700 font-semibold mb-2">
                  👑 Nhân vật chính
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-2">
                  {chefs[0].name}
                </h2>
                <p className="text-lg text-amber-800 mb-6">{chefs[0].role}</p>

                <div className="mb-6 space-y-4">
                  <p className="text-amber-800 leading-relaxed">
                    {chefs[0].bio}
                  </p>

                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-amber-900" />
                    <span className="text-amber-900 font-semibold">
                      Chuyên môn: {chefs[0].speciality}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-amber-800">
                  <div className="flex gap-2">
                    <Award className="w-5 h-5 text-amber-900 flex-shrink-0 mt-1" />
                    <span>Giải Đầu bếp xuất sắc 2022</span>
                  </div>
                  <div className="flex gap-2">
                    <Award className="w-5 h-5 text-amber-900 flex-shrink-0 mt-1" />
                    <span>Huy chương Vàng cuộc thi ẩm thực Quốc tế 2021</span>
                  </div>
                  <div className="flex gap-2">
                    <Heart className="w-5 h-5 text-amber-900 flex-shrink-0 mt-1" />
                    <span>Khách hàng yêu thích 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg p-12 mb-16 border-l-4 border-amber-900">
            <p className="text-xl md:text-2xl text-amber-950 font-semibold mb-4 italic">
              "Nấu ăn không chỉ là công việc, đó là cách tôi thể hiện tình yêu
              với ẩm thực Việt Nam. Mỗi món ăn là một câu chuyện, mỗi hương liệu
              là một hồi ức."
            </p>
            <p className="text-amber-800">— {chefs[0].name}</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Đội ngũ tận tâm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <div
                key={index}
                className="bg-amber-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-64 flex items-center justify-center">
                  <span className="text-7xl">{chef.image}</span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-950 mb-1">
                    {chef.name}
                  </h3>
                  <p className="text-amber-700 font-semibold mb-4">
                    {chef.role}
                  </p>

                  <p className="text-amber-800 text-sm leading-relaxed mb-4">
                    {chef.bio}
                  </p>

                  <div className="bg-white rounded p-3 mb-4">
                    <p className="text-amber-700 text-xs font-semibold mb-1">
                      CHUYÊN MÔN
                    </p>
                    <p className="text-amber-950 font-semibold">
                      {chef.speciality}
                    </p>
                  </div>

                  <button className="w-full py-2 bg-amber-900 text-white rounded hover:bg-amber-800 transition-colors text-sm font-semibold">
                    Xem thêm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-12 text-center">
            Quy trình tạo nên từng món ăn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Lựa chọn nguyên liệu",
                desc: "Những nguyên liệu tốt nhất từ các vùng nổi tiếng được chọn lọc cẩn thận",
              },
              {
                step: "2",
                title: "Chuẩn bị & Cắt",
                desc: "Quy trình chuẩn bị chi tiết, đảm bảo mọi thứ sẵn sàng trước khi nấu",
              },
              {
                step: "3",
                title: "Nấu ăn",
                desc: "Đầu bếp sử dụng kỹ thuật truyền thống và hiện đại để tạo hương vị hoàn hảo",
              },
              {
                step: "4",
                title: "Trình bày & Phục vụ",
                desc: "Từng món ăn được trình bày đẹp mắt và phục vụ ngay khi còn nóng",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-amber-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-amber-800 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Hãy thưởng thức tác phẩm của đầu bếp
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            Khám phá những cảm xúc ẩm thực mà chỉ đội ngũ MỘC VIỆT có thể mang
            đến
          </p>
          <Link href="/booking" className="inline-block px-8 py-3 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-white transition-colors">
            ĐẶT BÀN NGAY
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
