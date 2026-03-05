import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import useRequestStore from "../stores/useRequestStore";

const Dashboard = () => {
  const { admin, logout } = useAuthStore();
  const {
    requests,
    stats,
    loading,
    error,
    fetchRequests,
    fetchStats,
    updateRequestStatus,
    deleteRequest,
    setSelectedRequest,
    selectedRequest,
  } = useRequestStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchRequests();
    fetchStats();
  }, []);

  // دالة لتنسيق التاريخ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // دالة لتنسيق البيانات حسب نوع الطلب
  const formatRequestForDisplay = (request) => {
    let displayData = {
      id: request._id,
      client: request.clientName,
      date: formatDate(request.createdAt),
      status: request.status,
      phone: request.phone,
      email: request.email || "—",
      address: request.address || "—",
      notes: request.notes || "—",
      type: request.type,
      typeName:
        request.type === "work"
          ? "طلبات عمل"
          : request.type === "rental"
          ? "كراء أجهزة"
          : "تنظيف",
    };

    // إضافة حقول مخصصة حسب نوع الطلب
    switch (request.type) {
      case "work":
        displayData.service = "طلب عمل";
        displayData.workExperience = request.workExperience || "—";
        break;
      case "rental":
        displayData.item = request.equipmentType || "—";
        displayData.rentalDuration = request.rentalDuration || "—";
        displayData.equipmentNotes = request.equipmentNotes || "—";
        break;
      case "cleaning":
        displayData.service = request.placeType || "—";
        displayData.additionalDetails = request.additionalDetails || "—";
        break;
    }

    return displayData;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const handleStatusChange = async (id, newStatus) => {
    const result = await updateRequestStatus(id, newStatus);
    if (result.success) {
      // تحديث الإحصائيات بعد تغيير الحالة
      fetchStats();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      const result = await deleteRequest(id);
      if (result.success) {
        // تحديث الإحصائيات بعد الحذف
        fetchStats();
      }
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

  // الحصول على الطلبات المفلترة
  const filteredRequests = requests
    .map(formatRequestForDisplay)
    .filter((req) => activeTab === "all" || req.type === activeTab)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // ترتيب من الأحدث للأقدم

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

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

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setSelectedRequest(null);
    }
  };

  if (loading && requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">جارٍ تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">لوحة التحكم</h1>
            <div className="flex items-center gap-4">
              {/* إحصائيات سريعة - تظهر فقط على الشاشات المتوسطة فما فوق */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">المجموع:</span>
                  <span className="font-medium text-gray-900">
                    {stats.total}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">قيد الانتظار:</span>
                  <span className="font-medium text-yellow-600">
                    {stats.pending}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">تمت الموافقة:</span>
                  <span className="font-medium text-green-600">
                    {stats.approved}
                  </span>
                </div>
              </div>
              <span className="text-gray-600 hidden sm:inline">
                مرحباً {admin?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                تسجيل خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* عرض الخطأ إذا وجد */}
      {error && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Tabs */}
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
                ({stats.total})
              </span>
            </button>
            <button
              onClick={() => handleTabChange("rental")}
              className={`py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${
                activeTab === "rental"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              كراء أجهزة{" "}
              <span className="text-xs sm:text-sm text-gray-400 mr-1">
                ({stats.byType?.rental || 0})
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
                ({stats.byType?.work || 0})
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
                ({stats.byType?.cleaning || 0})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Requests Table */}
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
                    onClick={() =>
                      handleViewDetails(
                        requests.find((r) => r._id === request.id)
                      )
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.typeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.item || request.service || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.date}
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
                            handleStatusChange(request.id, e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="approved">موافقة</option>
                          <option value="rejected">رفض</option>
                          <option value="completed">مكتمل</option>
                        </select>
                        <button
                          onClick={() => handleDelete(request.id)}
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
                onClick={() =>
                  handleViewDetails(requests.find((r) => r._id === request.id))
                }
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
                      {request.item || request.service || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">التاريخ:</span>
                    <span className="text-gray-900 mr-1">{request.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">الجوال:</span>
                    <span className="text-gray-900 mr-1" dir="ltr">
                      {request.phone}
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
                      handleStatusChange(request.id, e.target.value)
                    }
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="approved">موافقة</option>
                    <option value="rejected">رفض</option>
                    <option value="completed">مكتمل</option>
                  </select>
                  <button
                    onClick={() => handleDelete(request.id)}
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

        {/* Pagination */}
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedRequest(null);
                  }}
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
                        {selectedRequest.clientName}
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
                        {selectedRequest.email || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">العنوان:</span>
                      <span className="text-sm text-gray-900 mr-2">
                        {selectedRequest.address || "—"}
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
                        {selectedRequest.type === "work"
                          ? "طلب عمل"
                          : selectedRequest.type === "rental"
                          ? "كراء أجهزة"
                          : "تنظيف"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        تاريخ الإنشاء:
                      </span>
                      <span className="text-sm text-gray-900 mr-2">
                        {formatDate(selectedRequest.createdAt)}
                      </span>
                    </div>

                    {/* حقول مخصصة حسب نوع الطلب */}
                    {selectedRequest.type === "work" && (
                      <>
                        <div className="sm:col-span-2">
                          <span className="text-sm text-gray-500">
                            خبرات سابقة:
                          </span>
                          <span className="text-sm text-gray-900 mr-2">
                            {selectedRequest.workExperience || "—"}
                          </span>
                        </div>
                      </>
                    )}

                    {selectedRequest.type === "rental" && (
                      <>
                        <div>
                          <span className="text-sm text-gray-500">
                            نوع الجهاز:
                          </span>
                          <span className="text-sm text-gray-900 mr-2">
                            {selectedRequest.equipmentType || "—"}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">
                            مدة الكراء:
                          </span>
                          <span className="text-sm text-gray-900 mr-2">
                            {selectedRequest.rentalDuration || "—"}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-sm text-gray-500">
                            ملاحظات الكراء:
                          </span>
                          <span className="text-sm text-gray-900 mr-2">
                            {selectedRequest.equipmentNotes || "—"}
                          </span>
                        </div>
                      </>
                    )}

                    {selectedRequest.type === "cleaning" && (
                      <>
                        <div>
                          <span className="text-sm text-gray-500">
                            نوع المكان:
                          </span>
                          <span className="text-sm text-gray-900 mr-2">
                            {selectedRequest.placeType || "—"}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-sm text-gray-500">
                            تفاصيل إضافية:
                          </span>
                          <span className="text-sm text-gray-900 mr-2">
                            {selectedRequest.additionalDetails || "—"}
                          </span>
                        </div>
                      </>
                    )}
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

                {/* Terms Agreement */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      الموافقة على الشروط:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        selectedRequest.agreeToTerms
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedRequest.agreeToTerms
                        ? "تمت الموافقة"
                        : "لم تتم الموافقة"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <select
                  value={selectedRequest.status}
                  onChange={(e) => {
                    handleStatusChange(selectedRequest._id, e.target.value);
                    setSelectedRequest({
                      ...selectedRequest,
                      status: e.target.value,
                    });
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="pending">قيد الانتظار</option>
                  <option value="approved">موافقة</option>
                  <option value="rejected">رفض</option>
                  <option value="completed">مكتمل</option>
                </select>
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
      <style>{`
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
