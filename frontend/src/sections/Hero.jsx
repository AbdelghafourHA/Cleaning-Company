import { motion } from "framer-motion";
import HeroImg from "../assets/Hero.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0"
      >
        <img
          src={HeroImg}
          alt="شركة تنظيف احترافية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute inset-0 z-5 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
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
          نظافة{" "}
          <span className="relative inline-block">
            مثالية
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1 bg-white rounded-full"
            ></motion.span>
          </span>{" "}
          ... و راحة تدوم
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-gray-200 mb-10
          text-base sm:text-lg md:text-xl
          max-w-2xl mx-auto leading-relaxed"
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
          <a
            href="#contact"
            className="group px-8 py-3 bg-black text-white rounded-full font-medium text-lg 
            hover:bg-opacity-90 transition-all duration-300 
            shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] 
            hover:-translate-y-1"
          >
            احجز الآن
          </a>

          <a
            href="#services"
            className="group px-8 py-3 border-2 border-white text-white rounded-full font-medium text-lg 
            hover:bg-white hover:text-black transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]"
          >
            استكشف خدماتنا
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-2 bg-white/70 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
