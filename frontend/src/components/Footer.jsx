import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Gueddouda Center
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            نقدم خدمات تنظيف احترافية باستخدام أحدث المعدات لضمان بيئة نظيفة
            وآمنة لعملائنا.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              الرئيسية
            </li>
            <li className="hover:text-white transition cursor-pointer">
              خدماتنا
            </li>
            <li className="hover:text-white transition cursor-pointer">
              لماذا نحن
            </li>
            <li className="hover:text-white transition cursor-pointer">
              احجز الآن
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">تواصل معنا</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={18} />
              0550 123 456
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} />
              contact@gueddouda.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} />
              الجزائر
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-4">تابعنا على</h4>

          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <Facebook size={20} />
            </a>

            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Gueddouda Center. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
