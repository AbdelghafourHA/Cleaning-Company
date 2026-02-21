import { motion } from "framer-motion";
import HeroImg from "../assets/Hero.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28"
    >
      {/* Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={HeroImg}
          alt="شركة تنظيف احترافية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-6 text-white">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bold leading-tight mb-6
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          نظافة مثالية ... و راحة تدوم
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-gray-300 mb-10
          text-base sm:text-lg md:text-xl
          max-w-3xl mx-auto leading-relaxed"
        >
          نرتقي بمستوى النظافة لنمنحكم بيئة نظيفة، منظمة و مريحة في كل وقت.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          {/* Primary Button */}
          <a
            href="#booking"
            className="px-8 py-3 bg-black text-white rounded-full font-medium text-lg hover:opacity-90 transition"
          >
            احجز الآن
          </a>

          {/* Secondary Button */}
          <a
            href="#services"
            className="px-8 py-3 border border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition"
          >
            استكشف خدماتنا
          </a>
        </motion.div>
      </div>
    </section>
  );
}
