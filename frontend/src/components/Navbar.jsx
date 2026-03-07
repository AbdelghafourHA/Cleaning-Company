import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "الرئيسية", href: "#home" },
    { name: "خدماتنا", href: "#services" },
    { name: "من نحن", href: "#about" },
    { name: "اتصل بنا", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md shadow-lg"
          : "bg-white/0 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          dir="ltr"
          className={`dancing-script text-xl font-semibold transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          Gueddouda Center
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <a
                href={link.href}
                className={`font-medium transition-all duration-300 hover:scale-105 inline-block ${
                  scrolled
                    ? "text-gray-800 hover:text-black"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* WhatsApp Button */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          href="https://wa.me/213797574905"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:inline-block px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            scrolled
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-green-500/90 backdrop-blur-sm text-white hover:bg-green-600"
          }`}
        >
          واتساب
        </motion.a>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20"
          >
            <ul className="flex flex-col text-center py-8 space-y-6">
              {links.map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => {
                      setTimeout(() => setOpen(false), 800);
                    }}
                    className="block text-gray-800 font-medium hover:text-black transition-colors py-2"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center pt-4"
              >
                <a
                  href="https://wa.me/213797574905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
                >
                  واتساب
                </a>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
