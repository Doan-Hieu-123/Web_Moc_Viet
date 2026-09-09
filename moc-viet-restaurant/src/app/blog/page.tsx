import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Hành trình khám phá vị Việt ở nước Pháp",
      excerpt:
        "Bếp trưởng Nguyễn Văn A chia sẻ những trải nghiệm độc đáo khi học nấu ăn Việt Nam tại các nhà hàng 5 sao ở Pháp.",
      date: "2024-10-10",
      author: "Bếp trưởng Nguyễn Văn A",
      category: "Chuyến đi",
      image: "✈️",
      readTime: "5 phút đọc",
    },
    {
      id: 2,
      title: "Bí quyết nấu Phở thơm ngon",
      excerpt:
        "Học cách nấu Phở ngon như nhà hàng với các bí quyết từ đầu bếp lão luyện.",
      date: "2024-10-08",
      author: "Bếp phó Trần Thị B",
      category: "Công thức",
      image: "🍜",
      readTime: "7 phút đọc",
    },
    {
      id: 3,
      title: "Nguyên liệu địa phương: Hành trình tìm kiếm chất lượng",
      excerpt:
        "Khám phá cách MỘC VIỆT chọn lọc những nguyên liệu tốt nhất từ các vùng nông thôn.",
      date: "2024-10-05",
      author: "MỘC VIỆT",
      category: "Nguyên liệu",
      image: "🌾",
      readTime: "6 phút đọc",
    },
    {
      id: 4,
      title: "Ẩm thực ba miền: Sự khác nhau và sự hòa hợp",
      excerpt:
        "Tìm hiểu những đặc điểm riêng của ẩm thực Bắc, Trung, Nam và cách MỘC VIỆT kết hợp chúng.",
      date: "2024-09-30",
      author: "Bếp bánh Lê Văn C",
      category: "Văn hóa",
      image: "🇻🇳",
      readTime: "8 phút đọc",
    },
    {
      id: 5,
      title: "Xu hướng ẩm thực 2024 tại TP. HCM",
      excerpt:
        "Phân tích những xu hướng ẩm thực nóng nhất hiện nay và cách MỘC VIỆT thích ứng.",
      date: "2024-09-25",
      author: "MỘC VIỆT",
      category: "Xu hướng",
      image: "📊",
      readTime: "6 phút đọc",
    },
    {
      id: 6,
      title: "Cách bảo quản thực phẩm tươi lâu hơn",
      excerpt:
        "Các mẹo bảo quản thực phẩm từ đầu bếp chuyên nghiệp để giữ chất lượng tốt nhất.",
      date: "2024-09-20",
      author: "Bếp trưởng Nguyễn Văn A",
      category: "Mẹo vặt",
      image: "❄️",
      readTime: "4 phút đọc",
    },
  ];

  const categories = [
    "Tất cả",
    "Công thức",
    "Nguyên liệu",
    "Văn hóa",
    "Xu hướng",
    "Chuyến đi",
    "Mẹo vặt",
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
            NHẬT KÝ MỘC VIỆT
          </h1>
          <p className="text-lg md:text-xl text-amber-800">
            Những câu chuyện, kinh nghiệm, và kiến thức về ẩm thực từ đội ngũ
            MỘC VIỆT
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Posts */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Image */}
                      <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-48 flex items-center justify-center">
                        <span className="text-5xl group-hover:scale-110 transition-transform">
                          {post.image}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-2 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">
                              {post.category}
                            </span>
                            <span className="text-amber-700 text-xs">
                              {post.readTime}
                            </span>
                          </div>

                          <h2 className="text-xl md:text-2xl font-bold text-amber-950 mb-3 group-hover:text-amber-700">
                            {post.title}
                          </h2>

                          <p className="text-amber-800 mb-4">{post.excerpt}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-amber-700 text-sm">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.date)}
                            </div>
                          </div>

                          <button className="p-2 hover:bg-amber-50 rounded transition-colors">
                            <ArrowRight className="w-5 h-5 text-amber-900" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded transition-colors ${
                      page === 1
                        ? "bg-amber-900 text-white"
                        : "bg-white text-amber-900 hover:bg-amber-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm bài viết..."
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 pl-10"
                  />
                  <Search className="absolute left-3 top-3 w-4 h-4 text-amber-700" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="font-bold text-amber-950 mb-4">Danh mục</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <button className="text-amber-800 hover:text-amber-900 hover:underline transition-colors text-left w-full">
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="font-bold text-amber-950 mb-4">Bài viết mới</h3>
                <ul className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <li key={post.id}>
                      <button className="text-sm hover:text-amber-900 transition-colors text-left">
                        <p className="font-semibold text-amber-950 line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-amber-700 text-xs mt-1">
                          {formatDate(post.date)}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg p-6 border border-amber-200">
                <h3 className="font-bold text-amber-950 mb-3">
                  Nhận bài viết mới
                </h3>
                <p className="text-amber-800 text-sm mb-4">
                  Đăng ký để nhận thông báo về bài viết mới nhất
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-3 py-2 border border-amber-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-900"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-3 py-2 bg-amber-900 text-white text-sm font-semibold rounded hover:bg-amber-800 transition-colors"
                  >
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
