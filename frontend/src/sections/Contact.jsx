import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("cleaning");
  const [acceptedTerms, setAcceptedTerms] = useState({
    cleaning: false,
    rent: false,
    job: false,
  });
  const [showTerms, setShowTerms] = useState({
    cleaning: false,
    rent: false,
    job: false,
  });

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
    "w-full border border-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition";

  // شروط طلب التنظيف من الصور
  const cleaningTerms = [
    "تحديد الخدمة المطلوبة بدقة قبل الموعد (تنظيف عادي، عميق، بعد أشغال، إلخ).",
    "ذكر المساحة الحقيقية وعدد الغرف والمرافق لتحديد السعر الصحيح.",
    "الالتزام بالسعر المتفق عليه مسبقاً وعدم تغييره أثناء أو بعد انتهاء الخدمة.",
    "توفير الماء والكهرباء داخل المكان المراد تنظيفه.",
    "تأمين الحيوانات الأليفة إن وجدت لضمان سلامة الفريق.",
    "إبلاغ الشركة مسبقاً بأي مواد حساسة، أسطح خاصة، أو قطع ثمينة.",
    "في حال الإلغاء، يجب إبلاغ الإدارة قبل 24 ساعة على الأقل.",
    "أي طلب إضافي خارج الاتفاق يحتسب برسوم إضافية.",
    "الدفع يتم فور انتهاء الخدمة حسب الاتفاق.",
    "في حال وجود ملاحظة على العمل، يجب إبلاغ الإدارة خلال 24 ساعة من انتهاء الخدمة.",
    "التعامل باحترام وأدب مع جميع العاملات دون استثناء.",
    "عدم توجيه ألفاظ جارحة أو تصرفات غير لائقة.",
    "عدم تكليف العاملات بأعمال خارج نطاق الخدمة المتفق عليها.",
    "عدم طلب خدمات شخصية أو خاصة خارج إطار الشركة.",
    "عدم التفاوض المباشر مع العاملات بخصوص الأسعار أو خدمات إضافية.",
    "أي ملاحظة أو شكوى يتم توجيهها للإدارة فقط وليس للعاملات مباشرة.",
    "توفير بيئة عمل آمنة ومناسبة للفريق.",
    "عدم تصوير العاملات أو نشر صورهن دون إذن مسبق.",
    "حال وجود شكوى حقيقية بخصوص عدم إتقان العمل، تلتزم الشركة بإعادة الجزء المعني من الخدمة مجاناً بعد التحقق من الحالة.",
    "لا تشمل الإعادة خدمات إضافية لم تكن ضمن الاتفاق.",
    "يحق للإدارة تقييم الشكوى واتخاذ القرار المناسب.",
    "تحرص الشركة على تقديم خدمة احترافية كما تحتفظ بحق رفض اي طلب لا يتوافق مع قوانينها او يمس باحترام فريق العمل.",
    "تحتفظ الشركة بحق ايقاف الخدمة او الغاء التعامل في حال عدم احترام هذه الشروط.",
  ];

  // شروط كراء الأجهزة (مشتقة من الشروط العامة مع تكييفها للكراء)
  const rentTerms = [
    "تحديد الجهاز المطلوب بدقة ومدة الكراء قبل تأكيد الحجز.",
    "الالتزام بالسعر المتفق عليه مسبقاً وعدم تغييره أثناء أو بعد انتهاء مدة الكراء.",
    "تسليم الجهاز بحالة جيدة كما تم استلامه مع الحفاظ عليه من أي تلف.",
    "في حال حدوث أي عطل بالجهاز يتم إبلاغ الإدارة فوراً.",
    "يُمنع محاولة إصلاح الجهاز أو فك أجزائه من قبل المستأجر.",
    "في حال الإلغاء، يجب إبلاغ الإدارة قبل 24 ساعة على الأقل.",
    "تأخير تسليم الجهاز عن المدة المتفق عليها يستدعي رسوم إضافية.",
    "الدفع يتم عند استلام الجهاز أو حسب الاتفاق.",
    "التعامل باحترام وأدب مع جميع العاملين دون استثناء.",
    "عدم توجيه ألفاظ جارحة أو تصرفات غير لائقة.",
    "أي ملاحظة أو شكوى يتم توجيهها للإدارة فقط.",
    "توفير بيئة آمنة لاستخدام الجهاز حسب التعليمات.",
    "في حال وجود ملاحظة على الجهاز، يجب إبلاغ الإدارة خلال 24 ساعة من الاستلام.",
    "تحرص الشركة على تقديم خدمة احترافية كما تحتفظ بحق رفض اي طلب لا يتوافق مع قوانينها او يمس باحترام فريق العمل.",
    "تحتفظ الشركة بحق ايقاف الخدمة او الغاء التعامل في حال عدم احترام هذه الشروط.",
  ];

  // شروط طلب العمل (كما هي دون تغيير)
  const jobTerms = [
    "الالتزام باللباس المحتشم المناسب لطبيعة العمل",
    "الالتزام بالأخلاق الحسنة وحسن التعامل",
    "احترام أوقات العمل والانضباط",
    "الجدية وتحمل المسؤولية",
    "المحافظة على أسرار الزبائن وخصوصيتهم",
    "إعادة إنجاز الجزء المعني مجانا عند وجود شكوى مؤكدة",
    "الالتزام بتعليمات الشركة",
    "الحفاظ على معدات ومواد التنظيف",
    "العمل بروح الفريق",
    "النظافة الشخصية الدائمة",
    "الاستعداد للعمل الميداني بمختلف الأماكن",
    "احترام قوانين الشركة الداخلية",
    "تحرص الشركة على تقديم خدمة احترافية كما تحتفظ بحق رفض اي طلب لا يتوافق مع قوانينها او يمس باحترام فريق العمل.",
    "تحتفظ الشركة بحق ايقاف الخدمة او الغاء التعامل في حال عدم احترام هذه الشروط.",
  ];

  const handleAcceptTerms = (tabId) => {
    setAcceptedTerms((prev) => ({ ...prev, [tabId]: !prev[tabId] }));
  };

  const handleShowTerms = (tabId) => {
    setShowTerms((prev) => ({ ...prev, [tabId]: true }));
  };

  const handleCloseTerms = (tabId) => {
    setShowTerms((prev) => ({ ...prev, [tabId]: false }));
  };

  return (
    <section dir="rtl" className="py-24 bg-white " id="contact">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            احجز خدمتك الآن
          </h2>
          <p className="text-gray-800">
            اختر نوع الطلب واملأ الاستمارة وسيتم التواصل معك في أقرب وقت.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-black">
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

                {/* Terms for Cleaning */}
                <div className="md:col-span-2 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms.cleaning}
                    onChange={() => handleAcceptTerms("cleaning")}
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <p className="text-sm text-gray-800">
                    أوافق على{" "}
                    <span
                      onClick={() => handleShowTerms("cleaning")}
                      className="underline cursor-pointer font-semibold"
                    >
                      شروط الخدمة
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!acceptedTerms.cleaning}
                  className={`md:col-span-2 py-3 rounded-xl border border-black transition ${
                    acceptedTerms.cleaning
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
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

                {/* Terms for Rent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms.rent}
                    onChange={() => handleAcceptTerms("rent")}
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <p className="text-sm text-gray-800">
                    أوافق على{" "}
                    <span
                      onClick={() => handleShowTerms("rent")}
                      className="underline cursor-pointer font-semibold"
                    >
                      شروط الكراء
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!acceptedTerms.rent}
                  className={`w-full py-3 rounded-xl border border-black transition ${
                    acceptedTerms.rent
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
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

                {/* Terms for Job */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms.job}
                    onChange={() => handleAcceptTerms("job")}
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <p className="text-sm text-gray-800">
                    أوافق على{" "}
                    <span
                      onClick={() => handleShowTerms("job")}
                      className="underline cursor-pointer font-semibold"
                    >
                      شروط الترشح
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!acceptedTerms.job}
                  className={`w-full py-3 rounded-xl border border-black transition ${
                    acceptedTerms.job
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  إرسال طلب العمل
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Terms Modal for Cleaning */}
      <AnimatePresence>
        {showTerms.cleaning && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-3xl w-full rounded-3xl p-8 overflow-y-auto max-h-[80vh]"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                شروط وأحكام التعامل مع الزبائن
              </h3>
              <p className="text-center mb-4 font-semibold">
                شركة قدودة سانتر لخدمات التنظيف
              </p>
              <p className="text-center mb-6">
                يرجى الاطلاع على الشروط التالية قبل تأكيد الحجز:
              </p>

              <ul className="space-y-3 text-sm text-gray-800 leading-relaxed">
                {cleaningTerms.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <button
                  onClick={() => handleCloseTerms("cleaning")}
                  className="px-6 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms Modal for Rent */}
      <AnimatePresence>
        {showTerms.rent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-3xl w-full rounded-3xl p-8 overflow-y-auto max-h-[80vh]"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                شروط كراء الأجهزة
              </h3>
              <p className="text-center mb-4 font-semibold">
                شركة قدودة سانتر لخدمات التنظيف
              </p>
              <p className="text-center mb-6">
                يرجى الاطلاع على الشروط التالية قبل تأكيد الحجز:
              </p>

              <ul className="space-y-3 text-sm text-gray-800 leading-relaxed">
                {rentTerms.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <button
                  onClick={() => handleCloseTerms("rent")}
                  className="px-6 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms Modal for Job */}
      <AnimatePresence>
        {showTerms.job && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-3xl w-full rounded-3xl p-8 overflow-y-auto max-h-[80vh]"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                شروط الترشح للعمل
              </h3>
              <p className="text-center mb-4 font-semibold">
                شركة قدودة سانتر لخدمات التنظيف
              </p>
              <p className="text-center mb-6">
                يرجى الاطلاع على الشروط التالية قبل تأكيد الحجز:
              </p>

              <ul className="space-y-3 text-sm text-gray-800 leading-relaxed">
                {jobTerms.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <button
                  onClick={() => handleCloseTerms("job")}
                  className="px-6 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
