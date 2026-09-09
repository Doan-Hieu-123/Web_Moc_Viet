"use client";

import { useState } from "react";
import { Calendar, Clock, Users, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BookingFormData {
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  date: string;
  time: string;
  guestCount: number;
  area: string;
  specialRequest: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    date: "",
    time: "",
    guestCount: 2,
    area: "Tây",
    specialRequest: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormData | null>(null);

  const areas = [
    { value: "Tây", label: "Khu vực Tây" },
    { value: "Đông", label: "Khu vực Đông" },
    { value: "Trung tâm", label: "Khu vực Trung tâm" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "guestCount" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (
        !formData.guestName ||
        !formData.guestPhone ||
        !formData.date ||
        !formData.time
      ) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc");
        setIsSubmitting(false);
        return;
      }

      const submittedBooking = { ...formData };
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedBooking),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Không thể đặt bàn lúc này.");
      }

      setBookingReference(result.reference);
      setConfirmedBooking(submittedBooking);
      setBookingSuccess(true);

      // Reset form
      setFormData({
        guestName: "",
        guestPhone: "",
        guestEmail: "",
        date: "",
        time: "",
        guestCount: 2,
        area: "Tây",
        specialRequest: "",
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Header />

        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-24 h-24 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-amber-950 mb-4">
              Đặt bàn thành công! 🎉
            </h1>

            <p className="text-lg text-amber-800 mb-8">
              Cảm ơn bạn đã chọn MỘC VIỆT. Chúng tôi đã nhận được yêu cầu đặt
              bàn của bạn.
            </p>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="mb-6">
                <p className="text-amber-700 text-sm font-semibold mb-2">
                  Mã tham chiếu đặt bàn
                </p>
                <p className="text-2xl font-bold text-amber-900">
                  {bookingReference}
                </p>
              </div>

              <div className="space-y-4 text-left border-t border-amber-100 pt-6">
                <div>
                  <p className="text-amber-700 text-sm font-semibold">Khách</p>
                  <p className="text-amber-950">{confirmedBooking?.guestName}</p>
                </div>
                <div>
                  <p className="text-amber-700 text-sm font-semibold">Thời gian</p>
                  <p className="text-amber-950">
                    {confirmedBooking && new Date(`${confirmedBooking.date}T${confirmedBooking.time}`)
                      .toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </p>
                </div>
                <div>
                  <p className="text-amber-700 text-sm font-semibold">Số khách</p>
                  <p className="text-amber-950">{confirmedBooking?.guestCount} người</p>
                </div>
                <div>
                  <p className="text-amber-700 text-sm font-semibold">Khu vực</p>
                  <p className="text-amber-950">
                    {areas.find((a) => a.value === confirmedBooking?.area)?.label}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-amber-800 mb-3">
                <span className="font-semibold">Lưu ý quan trọng:</span>
              </p>
              <ul className="text-amber-700 space-y-2 text-sm">
                <li>✓ Chúng tôi sẽ xác nhận đặt bàn của bạn qua điện thoại</li>
                <li>✓ Vui lòng đến sớm 15 phút trước giờ đặt bàn</li>
                <li>
                  ✓ Nếu cần hủy, vui lòng thông báo trước 24 giờ
                </li>
                <li>✓ Mã tham chiếu sẽ được gửi qua email của bạn</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setBookingSuccess(false)}
                className="w-full px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
              >
                TIẾP TỤC DUYỆT THỰC ĐƠN
              </button>
              <a
                href="/"
                className="block px-6 py-3 border-2 border-amber-900 text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors text-center"
              >
                QUAY VỀ TRANG CHỦ
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 text-5xl">📅</div>
          <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            ĐẶT BÀN
          </h1>
          <p className="text-lg text-amber-800">
            Hãy dành chút thời gian để dự trữ bàn yêu thích của bạn tại MỘC VIỆT
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Guest Information */}
              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">
                  Thông tin khách hàng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="guestPhone"
                      value={formData.guestPhone}
                      onChange={handleChange}
                      placeholder="+84 (0)9 1234 5678"
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="guestEmail"
                      value={formData.guestEmail}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Số khách *
                    </label>
                    <select
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? "người" : "người"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">
                  Chọn thời gian
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Ngày *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Giờ *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Area Preference */}
              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">
                  Sở thích khu vực
                </h2>
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Chọn khu vực
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {areas.map((area) => (
                      <button
                        key={area.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            area: area.value,
                          }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.area === area.value
                            ? "border-amber-900 bg-amber-50"
                            : "border-amber-200 hover:border-amber-400"
                        }`}
                      >
                        <p className="font-semibold text-amber-950">
                          {area.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Request */}
              <div>
                <h2 className="text-2xl font-bold text-amber-950 mb-6">
                  Yêu cầu đặc biệt
                </h2>
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Ghi chú thêm (tùy chọn)
                  </label>
                  <textarea
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    placeholder="Vd: Cần bàn gần cửa sổ, có dị ứng, lễ tết, v.v..."
                    rows={4}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6 border-t-2 border-amber-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? "Đang xử lý..." : "XÁC NHẬN ĐẶT BÀN"}
                </button>
              </div>

              {/* Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="text-amber-800 text-sm">
                  <span className="font-semibold">ℹ️ Lưu ý:</span> Chúng tôi sẽ
                  xác nhận yêu cầu đặt bàn của bạn trong vòng 1 giờ qua điện thoại
                  hoặc email. Vui lòng chắc chắn rằng số điện thoại và email của bạn
                  là chính xác.
                </p>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Phone className="w-12 h-12 text-amber-900" />
              </div>
              <h3 className="font-bold text-amber-950 mb-2">Gọi trực tiếp</h3>
              <p className="text-amber-700">+84 (0)23 1234 5678</p>
              <p className="text-amber-600 text-sm">10:00 - 23:00 hàng ngày</p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Mail className="w-12 h-12 text-amber-900" />
              </div>
              <h3 className="font-bold text-amber-950 mb-2">Email</h3>
              <p className="text-amber-700">booking@mocviet.vn</p>
              <p className="text-amber-600 text-sm">Trả lời trong 2 giờ</p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <MapPin className="w-12 h-12 text-amber-900" />
              </div>
              <h3 className="font-bold text-amber-950 mb-2">Địa chỉ</h3>
              <p className="text-amber-700">123 Nguyễn Huệ, Q.1</p>
              <p className="text-amber-600 text-sm">TP. Hồ Chí Minh</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
