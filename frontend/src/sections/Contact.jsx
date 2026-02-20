import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("cleaning");

  const tabs = [
    { id: "cleaning", label: "طلب تنظيف" },
    { id: "rent", label: "كراء أجهزة" },
    { id: "job", label: "طلب عمل" },
  ];

  const equipmentList = [
    "آلة تنظيف بالبخار",
    "مكنسة صناعية قوية",
    "آلة تلميع الأرضيات",
    "جهاز تعقيم احترافي",
  ];

  const inputStyle =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <section dir="rtl" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            احجز خدمتك الآن
          </h2>
          <p className="text-gray-600">
            اختر نوع الطلب واملأ الاستمارة وسيتم التواصل معك في أقرب وقت.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <AnimatePresence mode="wait">
            {/* Cleaning */}
            {activeTab === "cleaning" && (
              <motion.form
                key="cleaning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className={inputStyle}
                />
                <input
                  type="text"
                  placeholder="العنوان"
                  className={`${inputStyle} md:col-span-2`}
                />

                <select className={`${inputStyle} md:col-span-2`}>
                  <option>نوع المكان</option>
                  <option>منزل</option>
                  <option>مكتب</option>
                  <option>محل تجاري</option>
                </select>

                <textarea
                  placeholder="تفاصيل إضافية"
                  className={`${inputStyle} md:col-span-2 h-32 resize-none`}
                />

                <button
                  type="submit"
                  className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  إرسال الطلب
                </button>
              </motion.form>
            )}

            {/* Rent */}
            {activeTab === "rent" && (
              <motion.form
                key="rent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className={inputStyle}
                />

                <select className={inputStyle}>
                  {equipmentList.map((eq, i) => (
                    <option key={i}>{eq}</option>
                  ))}
                </select>

                <textarea
                  placeholder="مدة الكراء / ملاحظات"
                  className={`${inputStyle} h-28 resize-none`}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  إرسال طلب الكراء
                </button>
              </motion.form>
            )}

            {/* Job */}
            {activeTab === "job" && (
              <motion.form
                key="job"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className={inputStyle}
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className={inputStyle}
                />

                <textarea
                  placeholder="خبراتك السابقة"
                  className={`${inputStyle} h-32 resize-none`}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  إرسال طلب العمل
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
