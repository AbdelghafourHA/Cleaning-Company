import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="bg-white text-black pt-16 pb-8 border-t border-black"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Gueddouda Center</h3>
          <p className="text-gray-800 text-sm leading-relaxed">
            نقدم خدمات تنظيف احترافية باستخدام أحدث المعدات لضمان بيئة نظيفة
            وآمنة لعملائنا.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-black cursor-pointer transition">
              الرئيسية
            </li>
            <li className="hover:text-black cursor-pointer transition">
              خدماتنا
            </li>
            <li className="hover:text-black cursor-pointer transition">
              لماذا نحن
            </li>
            <li className="hover:text-black cursor-pointer transition">
              احجز الآن
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">تواصل معنا</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={18} /> 0797 57 49 05
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} /> gueddoudacenter@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} /> الجزائر
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">تابعنا على</h4>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/1CWiPzHdaz/"
              className="p-3 border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/gueddoudacenter/"
              className="p-3 border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@gueddouda.center"
              className="p-3 border border-black rounded-full hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 text-center text-sm text-gray-800 border-t border-black">
        © {new Date().getFullYear()} Gueddouda Center. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
