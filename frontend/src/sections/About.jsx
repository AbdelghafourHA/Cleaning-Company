import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, Wrench } from "lucide-react";
import WhyImg from "../assets/WhyImg.jpg";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <CheckCircle size={26} />,
      title: "جودة مضمونة",
      desc: "نلتزم بأعلى معايير الجودة في جميع خدماتنا.",
    },
    {
      icon: <Clock size={26} />,
      title: "الالتزام بالمواعيد",
      desc: "نحترم وقت عملائنا ونلتزم بالوقت المحدد.",
    },
    {
      icon: <Users size={26} />,
      title: "فريق متخصص",
      desc: "عمال مدربون بخبرة عالية في مجال التنظيف.",
    },
    {
      icon: <Wrench size={26} />,
      title: "أجهزة تنظيف احترافية",
      desc: "نستخدم أحدث المعدات والتقنيات لضمان أفضل النتائج.",
    },
  ];

  return (
    <section dir="rtl" className="py-24 bg-white overflow-hidden " id="about">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gray-200/10 rounded-3xl blur-2xl"></div>
          <img
            src={WhyImg}
            alt="معدات تنظيف احترافية"
            className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
          />
        </motion.div>

        {/* Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-black mb-6"
          >
            لماذا تختار Gueddouda Center؟
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-gray-700 mb-10 text-base md:text-lg leading-relaxed"
          >
            نحن نؤمن أن النظافة ليست خدمة فقط، بل تجربة راحة وثقة. نعتمد على
            فريق متخصص وأجهزة تنظيف احترافية حديثة لنضمن لك أفضل النتائج بأعلى
            مستوى من الدقة.
          </motion.p>

          <div className="space-y-7">
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.7 }}
                className="flex items-start gap-5 group"
              >
                <div className="p-3 bg-gray-200 text-black rounded-xl transition-all duration-300 group-hover:bg-black group-hover:text-white">
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-semibold text-black text-lg">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
