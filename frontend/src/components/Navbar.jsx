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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          dir="ltr"
          className="dancing-script text-xl font-semibold text-black"
        >
          Gueddouda Center
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-gray-800 font-medium">
          {links.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="hover:text-black transition">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/213797574905"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block px-6 py-2  bg-green-500 text-white rounded-full"
        >
          واتساب
        </a>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black" onClick={() => setOpen(!open)}>
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
            className="md:hidden bg-white border-t"
          >
            <ul className="flex flex-col text-center py-6 space-y-6 text-gray-800 font-medium">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setTimeout(() => setOpen(false), 800);
                    }}
                    className="block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              <div className="flex justify-center">
                <a
                  href="https://wa.me/213797574905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-green-500 text-white rounded-full"
                >
                  واتساب
                </a>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
