import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-b from-amber-50 to-white pt-24 flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Logo/Name */}
        <h1 className="text-6xl md:text-7xl font-bold text-amber-950 mb-4">
          MỘC VIỆT
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-amber-800 mb-8 font-light">
          Tinh hoa vị Việt, trong từng khoảnh khắc.
        </p>

        {/* Description */}
        <p className="text-lg text-amber-700 max-w-2xl mx-auto mb-12">
          Khám phá những hương vị quen thuộc của Việt Nam qua một góc nhìn mới –
          tinh tế, hiện đại và trọn vẹn bản sắc.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="bg-amber-900 text-white px-8 py-4 rounded-lg text-lg hover:bg-amber-800 transition-all flex items-center justify-center gap-2"
          >
            KHÁM PHÁ THỰC ĐƠN
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/booking"
            className="border-2 border-amber-900 text-amber-900 px-8 py-4 rounded-lg text-lg hover:bg-amber-50 transition-all"
          >
            ĐẶT BÀN
          </Link>
        </div>
      </div>
    </section>
  );
}
