import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">MỘC VIỆT</h3>
          <p className="text-sm text-amber-100">
            Tinh hoa vị Việt, trong từng khoảnh khắc.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Thực đơn</h4>
          <ul className="text-sm space-y-2 text-amber-100">
            <li><a href="/menu" className="hover:text-white">Thực đơn</a></li>
            <li><a href="/signature" className="hover:text-white">Món đặc trưng</a></li>
            <li><a href="/story" className="hover:text-white">Câu chuyện</a></li>
            <li><a href="/events" className="hover:text-white">Sự kiện</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4">Liên hệ</h4>
          <ul className="text-sm space-y-2 text-amber-100">
            <li className="flex gap-2">
              <Phone size={16} />
              <span>(+84) 123 456 789</span>
            </li>
            <li className="flex gap-2">
              <Mail size={16} />
              <span>info@mocviet.vn</span>
            </li>
            <li className="flex gap-2">
              <MapPin size={16} />
              <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-bold mb-4">Theo dõi</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-300">f</a>
            <a href="#" className="hover:text-amber-300">📷</a>
          </div>
        </div>
      </div>

      <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-100">
        <p>&copy; 2024 MỘC VIỆT. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
}
