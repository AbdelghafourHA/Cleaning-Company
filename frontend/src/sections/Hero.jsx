import { motion } from "framer-motion";
import HeroImg from "../assets/Hero.jpg";

export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HeroImg}
          alt="شركة تنظيف"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
        className="relative z-10 max-w-5xl text-center px-6"
      >
        {/* Title */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-extrabold leading-tight mb-6
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          نظافة مثالية… وراحة تدوم
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="text-gray-200 mb-8
          text-base sm:text-lg md:text-xl
          max-w-3xl mx-auto leading-relaxed"
        >
          نقدم خدمات تنظيف احترافية للمنازل، المكاتب، والشركات بأعلى معايير
          الجودة وبأفضل الأسعار. فريق متخصص يضمن لك بيئة نظيفة وصحية.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-105">
            احجز الآن
          </button>

          <button className="cursor-pointer bg-white text-gray-900 hover:bg-gray-200 transition-all duration-300 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-105">
            تعرف على خدماتنا
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
