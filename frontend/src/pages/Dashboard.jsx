import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  // Sample data for different request types with more details
  const [requests, setRequests] = useState({
    equipment: [
      {
        id: 1,
        client: "أحمد محمد",
        item: "جهاز تتبع",
        date: "2024-01-15",
        status: "pending",
        phone: "0555123456",
        email: "ahmed@example.com",
        address: "الرياض، حي النزهة",
        notes: "يرغب في تركيب الجهاز يوم السبت",
        price: "1500 ريال",
        quantity: 2,
      },
      {
        id: 2,
        client: "سارة أحمد",
        item: "جهاز مراقبة",
        date: "2024-01-14",
        status: "approved",
        phone: "0555123457",
        email: "sara@example.com",
        address: "جدة، حي السلامة",
        notes: "كاميرات داخلية وخارجية",
        price: "2500 ريال",
        quantity: 4,
      },
      {
        id: 3,
        client: "خالد علي",
        item: "جهاز استشعار",
        date: "2024-01-13",
        status: "rejected",
        phone: "0555123458",
        email: "khaled@example.com",
        address: "الدمام، حي الشاطئ",
        notes: "للمنزل الذكي",
        price: "800 ريال",
        quantity: 3,
      },
      {
        id: 4,
        client: "نورا حسن",
        item: "جهاز قياس",
        date: "2024-01-12",
        status: "completed",
        phone: "0555123459",
        email: "noura@example.com",
        address: "مكة، حي العزيزية",
        notes: "جهاز قياس الحرارة والرطوبة",
        price: "600 ريال",
        quantity: 1,
      },
      {
        id: 11,
        client: "فيصل عمر",
        item: "جهاز تتبع",
        date: "2024-01-11",
        status: "pending",
        phone: "0555123460",
        email: "faisal@example.com",
        address: "الرياض، حي الملقا",
        notes: "للسيارة الشخصية",
        price: "1200 ريال",
        quantity: 1,
      },
      {
        id: 12,
        client: "لمى سعد",
        item: "جهاز مراقبة",
        date: "2024-01-10",
        status: "approved",
        phone: "0555123461",
        email: "lama@example.com",
        address: "الخبر، حي العليا",
        notes: "نظام كاميرات متكامل",
        price: "3200 ريال",
        quantity: 6,
      },
    ],
    work: [
      {
        id: 5,
        client: "محمد عمر",
        service: "صيانة عامة",
        date: "2024-01-15",
        status: "pending",
        phone: "0555123462",
        email: "mohammed@example.com",
        address: "الرياض، حي الورود",
        notes: "صيانة دورية للمكيفات",
        price: "400 ريال",
        technician: "أحمد محمود",
      },
      {
        id: 6,
        client: "فاطمة سعيد",
        service: "تركيب جهاز",
        date: "2024-01-14",
        status: "approved",
        phone: "0555123463",
        email: "fatima@example.com",
        address: "جدة، حي الروضة",
        notes: "تركيب مكيف سبليت",
        price: "300 ريال",
        technician: "خالد عبدالله",
      },
      {
        id: 7,
        client: "عمر خالد",
        service: "إصلاح عطل",
        date: "2024-01-13",
        status: "pending",
        phone: "0555123464",
        email: "omar@example.com",
        address: "الدمام، حي الجلوية",
        notes: "عطل في الثلاجة",
        price: "250 ريال",
        technician: "سامي أحمد",
      },
      {
        id: 13,
        client: "نوال أحمد",
        service: "صيانة دورية",
        date: "2024-01-09",
        status: "completed",
        phone: "0555123465",
        email: "nawal@example.com",
        address: "الرياض، حي النرجس",
        notes: "صيانة جميع الأجهزة",
        price: "800 ريال",
        technician: "فيصل عمر",
      },
    ],
    cleaning: [
      {
        id: 8,
        client: "لمى أحمد",
        service: "تنظيف مكتب",
        date: "2024-01-15",
        status: "pending",
        phone: "0555123466",
        email: "lama.a@example.com",
        address: "الرياض، حي العليا",
        notes: "تنظيف شامل للمكتب",
        price: "600 ريال",
        area: "150 متر مربع",
      },
      {
        id: 9,
        client: "سعود فهد",
        service: "تنظيف ورشة",
        date: "2024-01-14",
        status: "completed",
        phone: "0555123467",
        email: "saud@example.com",
        address: "جدة، حي الصناعية",
        notes: "تنظيف بعد الترميم",
        price: "1200 ريال",
        area: "300 متر مربع",
      },
      {
        id: 10,
        client: "هيا عبدالله",
        service: "تنظيف معمل",
        date: "2024-01-13",
        status: "approved",
        phone: "0555123468",
        email: "haya@example.com",
        address: "الخبر، حي الثقبة",
        notes: "تنظيم وتعقيم المعمل",
        price: "900 ريال",
        area: "200 متر مربع",
      },
      {
        id: 14,
        client: "بدر محمد",
        service: "تنظيف مكتب",
        date: "2024-01-08",
        status: "pending",
        phone: "0555123469",
        email: "badr@example.com",
        address: "الرياض، حي السليمانية",
        notes: "تنظيف يومي",
        price: "400 ريال",
        area: "100 متر مربع",
      },
    ],
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleStatusChange = (type, id, newStatus) => {
    setRequests((prev) => ({
      ...prev,
      [type]: prev[type].map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      ),
    }));
  };

  const handleDelete = (type, id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      setRequests((prev) => ({
        ...prev,
        [type]: prev[type].filter((req) => req.id !== id),
      }));
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        text: "قيد الانتظار",
        className: "bg-yellow-100 text-yellow-800",
      },
      approved: {
        text: "تم الموافقة",
        className: "bg-green-100 text-green-800",
      },
      rejected: { text: "مرفوض", className: "bg-red-100 text-red-800" },
      completed: { text: "مكتمل", className: "bg-blue-100 text-blue-800" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${config.className}`}
      >
        {config.text}
      </span>
    );
  };

  const getAllRequests = () => {
    return [
      ...requests.equipment.map((r) => ({
        ...r,
        type: "equipment",
        typeName: "كراء أجهزة",
      })),
      ...requests.work.map((r) => ({
        ...r,
        type: "work",
        typeName: "طلبات عمل",
      })),
      ...requests.cleaning.map((r) => ({
        ...r,
        type: "cleaning",
        typeName: "تنظيف",
      })),
    ];
  };

  const getFilteredRequests = () => {
    if (activeTab === "all") return getAllRequests();
    if (activeTab === "equipment")
      return requests.equipment.map((r) => ({
        ...r,
        type: "equipment",
        typeName: "كراء أجهزة",
      }));
    if (activeTab === "work")
      return requests.work.map((r) => ({
        ...r,
        type: "work",
        typeName: "طلبات عمل",
      }));
    if (activeTab === "cleaning")
      return requests.cleaning.map((r) => ({
        ...r,
        type: "cleaning",
        typeName: "تنظيف",
      }));
    return [];
  };

  // Pagination logic
  const filteredRequests = getFilteredRequests();
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  // Reset to first page when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Close modal when clicking outside
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">لوحة التحكم</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </header>

      {/* Tabs - Scrollable on mobile */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto pb-1 space-x-4 sm:space-x-8 hide-scrollbar">
            <button
              onClick={() => handleTabChange("all")}
              className={`py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
                activeTab === "all"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              الكل{" "}
              <span className="text-xs sm:text-sm text-gray-400 mr-1">
                ({getAllRequests().length})
              </span>
            </button>
            <button
              onClick={() => handleTabChange("equipment")}
              className={`py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
                activeTab === "equipment"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              كراء أجهزة{" "}
              <span className="text-xs sm:text-sm text-gray-400 mr-1">
                ({requests.equipment.length})
              </span>
            </button>
            <button
              onClick={() => handleTabChange("work")}
              className={`py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
                activeTab === "work"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              طلبات عمل{" "}
              <span className="text-xs sm:text-sm text-gray-400 mr-1">
                ({requests.work.length})
              </span>
            </button>
            <button
              onClick={() => handleTabChange("cleaning")}
              className={`py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
                activeTab === "cleaning"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              تنظيف{" "}
              <span className="text-xs sm:text-sm text-gray-400 mr-1">
                ({requests.cleaning.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Requests Table - Responsive */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نوع الطلب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التفاصيل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleViewDetails(request)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.typeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.item || request.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.date).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div
                        className="flex space-x-2 space-x-reverse"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={request.status}
                          onChange={(e) =>
                            handleStatusChange(
                              request.type,
                              request.id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="approved">موافقة</option>
                          <option value="rejected">رفض</option>
                          <option value="completed">مكتمل</option>
                        </select>
                        <button
                          onClick={() => handleDelete(request.type, request.id)}
                          className="border border-gray-300 rounded-md px-2 py-1 text-xs hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      لا توجد طلبات
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {currentRequests.map((request) => (
              <div
                key={request.id}
                className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewDetails(request)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {request.client}
                    </h3>
                    <p className="text-sm text-gray-500">{request.typeName}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">التفاصيل:</span>
                    <span className="text-gray-900 mr-1">
                      {request.item || request.service}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">التاريخ:</span>
                    <span className="text-gray-900 mr-1">
                      {new Date(request.date).toLocaleDateString("ar-SA")}
                    </span>
                  </div>
                </div>

                <div
                  className="flex space-x-2 space-x-reverse"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(
                        request.type,
                        request.id,
                        e.target.value
                      )
                    }
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="approved">موافقة</option>
                    <option value="rejected">رفض</option>
                    <option value="completed">مكتمل</option>
                  </select>
                  <button
                    onClick={() => handleDelete(request.type, request.id)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
            {filteredRequests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                لا توجد طلبات
              </div>
            )}
          </div>
        </div>

        {/* Pagination - Responsive */}
        {filteredRequests.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 order-2 sm:order-1">
                عرض {startIndex + 1} -{" "}
                {Math.min(endIndex, filteredRequests.length)} من{" "}
                {filteredRequests.length} طلب
              </div>

              <div className="flex items-center space-x-2 space-x-reverse order-1 sm:order-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  السابق
                </button>

                {/* Desktop Pagination */}
                <div className="hidden sm:flex space-x-2 space-x-reverse">
                  {getPageNumbers().map((number) => (
                    <button
                      key={number}
                      onClick={() => goToPage(number)}
                      className={`px-3 py-2 rounded-md border text-sm ${
                        currentPage === number
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                {/* Mobile Pagination */}
                <div className="sm:hidden">
                  <span className="text-sm text-gray-700">
                    صفحة {currentPage} من {totalPages}
                  </span>
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  تفاصيل الطلب
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex justify-end">
                  {getStatusBadge(selectedRequest.status)}
                </div>

                {/* Client Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    معلومات العميل
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">الاسم:</span>
                      <span className="text-sm text-gray-900 mr-2">
                        {selectedRequest.client}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">رقم الجوال:</span>
                      <span className="text-sm text-gray-900 mr-2" dir="ltr">
                        {selectedRequest.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        البريد الإلكتروني:
                      </span>
                      <span className="text-sm text-gray-900 mr-2">
                        {selectedRequest.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">العنوان:</span>
                      <span className="text-sm text-gray-900 mr-2">
                        {selectedRequest.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    تفاصيل الطلب
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">نوع الطلب:</span>
                      <span className="text-sm text-gray-900 mr-2">
                        {selectedRequest.typeName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">التاريخ:</span>
                      <span className="text-sm text-gray-900 mr-2">
                        {new Date(selectedRequest.date).toLocaleDateString(
                          "ar-SA"
                        )}
                      </span>
                    </div>

                    {/* Dynamic fields based on request type */}
                    {selectedRequest.item && (
                      <div>
                        <span className="text-sm text-gray-500">الجهاز:</span>
                        <span className="text-sm text-gray-900 mr-2">
                          {selectedRequest.item}
                        </span>
                      </div>
                    )}

                    {selectedRequest.service && (
                      <div>
                        <span className="text-sm text-gray-500">الخدمة:</span>
                        <span className="text-sm text-gray-900 mr-2">
                          {selectedRequest.service}
                        </span>
                      </div>
                    )}

                    {selectedRequest.quantity && (
                      <div>
                        <span className="text-sm text-gray-500">الكمية:</span>
                        <span className="text-sm text-gray-900 mr-2">
                          {selectedRequest.quantity}
                        </span>
                      </div>
                    )}

                    {selectedRequest.technician && (
                      <div>
                        <span className="text-sm text-gray-500">الفني:</span>
                        <span className="text-sm text-gray-900 mr-2">
                          {selectedRequest.technician}
                        </span>
                      </div>
                    )}

                    {selectedRequest.area && (
                      <div>
                        <span className="text-sm text-gray-500">المساحة:</span>
                        <span className="text-sm text-gray-900 mr-2">
                          {selectedRequest.area}
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="text-sm text-gray-500">السعر:</span>
                      <span className="text-sm text-gray-900 mr-2">
                        {selectedRequest.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                {selectedRequest.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      ملاحظات إضافية
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedRequest.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-2 space-x-reverse">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom styles for scrollbar hiding */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
