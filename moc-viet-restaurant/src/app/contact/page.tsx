"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Footer from "@/components/Footer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Không thể gửi thông điệp.");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h1>
          <p className="text-lg md:text-xl text-amber-800">
            Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-amber-950 mb-6">
                Gửi thông điệp cho chúng tôi
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700">
                  ✓ Cảm ơn bạn! Chúng tôi đã nhận được thông điệp của bạn. Chúng
                  tôi sẽ trả lời trong vòng 24 giờ.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+84 (0)9 1234 5678"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Chủ đề *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    required
                  >
                    <option value="">-- Chọn chủ đề --</option>
                    <option value="Đặt bàn">Đặt bàn</option>
                    <option value="Phản hồi">Phản hồi về nhà hàng</option>
                    <option value="Hợp tác kinh doanh">Hợp tác kinh doanh</option>
                    <option value="Tuyển dụng">Tuyển dụng</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Nội dung *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    rows={6}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Đang gửi..." : "GỬI THÔNG ĐIỆP"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex gap-4 mb-4">
                  <MapPin className="w-8 h-8 text-amber-900 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 mb-2">
                      Địa chỉ
                    </h3>
                    <p className="text-amber-800">
                      123 Nguyễn Huệ, Quận 1
                      <br />
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex gap-4 mb-4">
                  <Phone className="w-8 h-8 text-amber-900 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 mb-2">
                      Điện thoại
                    </h3>
                    <p className="text-amber-800">
                      Đặt bàn: +84 (0)23 1234 5678
                      <br />
                      Chung: +84 (0)23 1234 5679
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex gap-4 mb-4">
                  <Mail className="w-8 h-8 text-amber-900 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 mb-2">
                      Email
                    </h3>
                    <p className="text-amber-800">
                      Đặt bàn: booking@mocviet.vn
                      <br />
                      Chung: info@mocviet.vn
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex gap-4 mb-4">
                  <Clock className="w-8 h-8 text-amber-900 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 mb-2">
                      Giờ mở cửa
                    </h3>
                    <div className="text-amber-800 space-y-1">
                      <div>
                        <span className="font-semibold">Thứ Hai - Thứ Năm:</span>{" "}
                        10:00 - 23:00
                      </div>
                      <div>
                        <span className="font-semibold">Thứ Sáu - Chủ Nhật:</span>{" "}
                        10:00 - 24:00
                      </div>
                      <div className="mt-2">
                        <span className="font-semibold">Lễ/Tết:</span> 9:00 -
                        24:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-950 mb-4">
                  Theo dõi chúng tôi
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://facebook.com/mocviet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-amber-800 hover:text-amber-900"
                  >
                    <span className="text-2xl">f</span> Facebook
                  </a>
                  <a
                    href="https://instagram.com/mocviet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-amber-800 hover:text-amber-900"
                  >
                    <span className="text-2xl">📷</span> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-950 mb-8 text-center">
            Vị trí của chúng tôi
          </h2>
          <div className="h-96 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden">
            {/* Embedded map would go here */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-amber-700 text-center">
                <span className="text-4xl mb-2 block">📍</span>
                123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
