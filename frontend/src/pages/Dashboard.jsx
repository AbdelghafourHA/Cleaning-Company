import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data for different request types
  const [requests, setRequests] = useState({
    equipment: [
      {
        id: 1,
        client: "أحمد محمد",
        item: "جهاز تتبع",
        date: "2024-01-15",
        status: "pending",
      },
      {
        id: 2,
        client: "سارة أحمد",
        item: "جهاز مراقبة",
        date: "2024-01-14",
        status: "approved",
      },
      {
        id: 3,
        client: "خالد علي",
        item: "جهاز استشعار",
        date: "2024-01-13",
        status: "rejected",
      },
      {
        id: 4,
        client: "نورا حسن",
        item: "جهاز قياس",
        date: "2024-01-12",
        status: "completed",
      },
      {
        id: 11,
        client: "فيصل عمر",
        item: "جهاز تتبع",
        date: "2024-01-11",
        status: "pending",
      },
      {
        id: 12,
        client: "لمى سعد",
        item: "جهاز مراقبة",
        date: "2024-01-10",
        status: "approved",
      },
    ],
    work: [
      {
        id: 5,
        client: "محمد عمر",
        service: "صيانة عامة",
        date: "2024-01-15",
        status: "pending",
      },
      {
        id: 6,
        client: "فاطمة سعيد",
        service: "تركيب جهاز",
        date: "2024-01-14",
        status: "approved",
      },
      {
        id: 7,
        client: "عمر خالد",
        service: "إصلاح عطل",
        date: "2024-01-13",
        status: "pending",
      },
      {
        id: 13,
        client: "نوال أحمد",
        service: "صيانة دورية",
        date: "2024-01-09",
        status: "completed",
      },
    ],
    cleaning: [
      {
        id: 8,
        client: "لمى أحمد",
        service: "تنظيف مكتب",
        date: "2024-01-15",
        status: "pending",
      },
      {
        id: 9,
        client: "سعود فهد",
        service: "تنظيف ورشة",
        date: "2024-01-14",
        status: "completed",
      },
      {
        id: 10,
        client: "هيا عبدالله",
        service: "تنظيف معمل",
        date: "2024-01-13",
        status: "approved",
      },
      {
        id: 14,
        client: "بدر محمد",
        service: "تنظيف مكتب",
        date: "2024-01-08",
        status: "pending",
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
    if (window.confirm("Are you sure you want to delete this request?")) {
      setRequests((prev) => ({
        ...prev,
        [type]: prev[type].filter((req) => req.id !== id),
      }));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: "قيد الانتظار", className: "bg-gray-100 text-gray-800" },
      approved: { text: "تم الموافقة", className: "bg-gray-800 text-white" },
      rejected: { text: "مرفوض", className: "bg-gray-300 text-gray-800" },
      completed: { text: "مكتمل", className: "bg-black text-white" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs ${config.className}`}>
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
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-medium text-black">لوحة التحكم</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mt-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => handleTabChange("all")}
              className={`py-3 px-1 ${
                activeTab === "all"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              الكل ({getAllRequests().length})
            </button>
            <button
              onClick={() => handleTabChange("equipment")}
              className={`py-3 px-1 ${
                activeTab === "equipment"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              كراء أجهزة ({requests.equipment.length})
            </button>
            <button
              onClick={() => handleTabChange("work")}
              className={`py-3 px-1 ${
                activeTab === "work"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              طلبات عمل ({requests.work.length})
            </button>
            <button
              onClick={() => handleTabChange("cleaning")}
              className={`py-3 px-1 ${
                activeTab === "cleaning"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              تنظيف ({requests.cleaning.length})
            </button>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="container mx-auto px-4 py-6">
        <div className="border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 text-gray-600 font-medium">
                  العميل
                </th>
                <th className="text-left p-3 text-gray-600 font-medium">
                  نوع الطلب
                </th>
                <th className="text-left p-3 text-gray-600 font-medium">
                  التفاصيل
                </th>
                <th className="text-left p-3 text-gray-600 font-medium">
                  التاريخ
                </th>
                <th className="text-left p-3 text-gray-600 font-medium">
                  الحالة
                </th>
                <th className="text-left p-3 text-gray-600 font-medium">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3 text-black">{request.client}</td>
                  <td className="p-3 text-gray-700">{request.typeName}</td>
                  <td className="p-3 text-gray-700">
                    {request.item || request.service}
                  </td>
                  <td className="p-3 text-gray-600">{request.date}</td>
                  <td className="p-3">{getStatusBadge(request.status)}</td>
                  <td className="p-3">
                    <div className="flex space-x-2 space-x-reverse">
                      <select
                        value={request.status}
                        onChange={(e) =>
                          handleStatusChange(
                            request.type,
                            request.id,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 px-2 py-1 text-xs bg-white text-black"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="approved">موافقة</option>
                        <option value="rejected">رفض</option>
                        <option value="completed">مكتمل</option>
                      </select>
                      <button
                        onClick={() => handleDelete(request.type, request.id)}
                        className="border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    لا توجد طلبات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <div className="flex justify-center items-center mt-6 space-x-2 space-x-reverse">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              السابق
            </button>

            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`px-3 py-1 border ${
                  currentPage === number
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-black hover:bg-gray-100"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              التالي
            </button>
          </div>
        )}

        {/* Showing info */}
        {filteredRequests.length > 0 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            عرض {startIndex + 1} - {Math.min(endIndex, filteredRequests.length)}{" "}
            من {filteredRequests.length} طلب
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
