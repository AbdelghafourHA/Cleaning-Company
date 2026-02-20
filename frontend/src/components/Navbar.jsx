import { useState, useEffect } from "react";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      dir="rtl"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-600" size={28} />
          <span className="dancing-script text-xl font-bold text-gray-800">
            Gueddouda Center
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {["الرئيسية", "خدماتنا", "من نحن", "آراء العملاء", "اتصل بنا"].map(
            (item, i) => (
              <li
                key={i}
                className="relative cursor-pointer hover:text-blue-600 transition"
              >
                {item}
              </li>
            )
          )}
        </ul>

        {/* Phone Button */}
        <div className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition hover:scale-105">
          <Phone size={18} />
          <span>0550 123 456</span>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white shadow-lg border-t overflow-hidden"
          >
            <ul className="flex flex-col text-center py-4 space-y-4 text-gray-700 font-medium">
              {["الرئيسية", "خدماتنا", "من نحن", "اتصل بنا"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-blue-600 transition cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </li>
              ))}

              <div className="flex justify-center mt-3">
                <div className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg">
                  <Phone size={18} />
                  <span>0550 123 456</span>
                </div>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
