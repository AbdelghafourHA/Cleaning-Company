import { motion } from "framer-motion";
import { Home, Building2, Users, Cpu } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Home size={40} />,
      title: "تنظيف المنازل و المكاتب",
      desc: "خدمة تنظيف شاملة تشمل الأرضيات، المطابخ، الحمامات والنوافذ للمنازل والمكاتب.",
    },
    {
      icon: <Users size={40} />,
      title: "توظيف عاملات",
      desc: "نقدم لك عاملات تنظيف محترفات لضمان بيئة نظيفة وصحية في منزلك أو مكتبك.",
    },
    {
      icon: <Cpu size={40} />,
      title: "كراء أجهزة تنظيف",
      desc: "إمكانك استئجار أحدث أجهزة التنظيف لتلبية احتياجاتك الخاصة بسهولة وأمان.",
    },
    {
      icon: <Building2 size={40} />,
      title: "تنظيف شامل",
      desc: "تنظيف عميق وتعقيم شامل لجميع الأسطح باستخدام معدات وتقنيات متطورة.",
    },
  ];

  return (
    <section id="services" dir="rtl" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            خدماتنا
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            نقدم مجموعة متكاملة من خدمات التنظيف، التوظيف، وكراء الأجهزة بأعلى
            معايير الجودة.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className="text-black mb-5 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
