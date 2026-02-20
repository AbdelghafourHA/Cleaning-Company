import { motion } from "framer-motion";
import { Home, Building2, Sparkles, ShieldCheck } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Home size={40} />,
      title: "تنظيف المنازل",
      desc: "خدمة تنظيف شاملة للمنازل تشمل الأرضيات، المطابخ، الحمامات والنوافذ.",
    },
    {
      icon: <Building2 size={40} />,
      title: "تنظيف المكاتب",
      desc: "نضمن بيئة عمل نظيفة وصحية تعكس احترافية شركتك.",
    },
    {
      icon: <Sparkles size={40} />,
      title: "تنظيف عميق",
      desc: "تنظيف دقيق يشمل التفاصيل الصغيرة باستخدام معدات متطورة.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "تعقيم شامل",
      desc: "خدمات تعقيم احترافية لضمان بيئة آمنة وخالية من الجراثيم.",
    },
  ];

  return (
    <section dir="rtl" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            خدماتنا الاحترافية
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            نقدم مجموعة متكاملة من خدمات التنظيف بأعلى معايير الجودة وباستخدام
            أحدث المعدات.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
