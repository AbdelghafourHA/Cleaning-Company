import { create } from "zustand";
import axios from "../lib/axios";

const useRequestStore = create((set, get) => ({
  // State
  requests: [],
  stats: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    completed: 0,
    byType: {
      work: 0,
      rental: 0,
      cleaning: 0,
    },
  },
  loading: false,
  error: null,
  selectedRequest: null,

  fetchRequests: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/requests");
      set({ requests: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء جلب الطلبات",
        loading: false,
      });
    }
  },

  fetchStats: async () => {
    try {
      const res = await axios.get("/requests/stats");
      set({ stats: res.data });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  },

  fetchRequestById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/requests/${id}`);
      set({ selectedRequest: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء جلب الطلب",
        loading: false,
      });
    }
  },

  createRequest: async (requestData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/requests", requestData);

      const { requests } = get();
      if (requests.length > 0) {
        set({ requests: [res.data.request, ...requests] });
      }

      await get().fetchStats();

      set({ loading: false });
      return { success: true, data: res.data };
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء إنشاء الطلب",
        loading: false,
      });
      return { success: false, error: err.response?.data?.message };
    }
  },

  updateRequestStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/requests/${id}/status`, { status });

      set((state) => ({
        requests: state.requests.map((req) =>
          req._id === id ? { ...req, status } : req
        ),
        selectedRequest:
          state.selectedRequest?._id === id
            ? { ...state.selectedRequest, status }
            : state.selectedRequest,
        loading: false,
      }));

      await get().fetchStats();

      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء تحديث الحالة",
        loading: false,
      });
      return { success: false };
    }
  },

  updateRequest: async (id, requestData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/requests/${id}`, requestData);

      set((state) => ({
        requests: state.requests.map((req) =>
          req._id === id ? res.data.request : req
        ),
        selectedRequest:
          state.selectedRequest?._id === id
            ? res.data.request
            : state.selectedRequest,
        loading: false,
      }));

      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء تحديث الطلب",
        loading: false,
      });
      return { success: false };
    }
  },

  deleteRequest: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/requests/${id}`);

      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
        selectedRequest:
          state.selectedRequest?._id === id ? null : state.selectedRequest,
        loading: false,
      }));

      await get().fetchStats();

      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء حذف الطلب",
        loading: false,
      });
      return { success: false };
    }
  },

  getRequestsByType: (type) => {
    const { requests } = get();
    if (type === "all") return requests;
    return requests.filter((req) => req.type === type);
  },

  getRequestsByStatus: (status) => {
    const { requests } = get();
    return requests.filter((req) => req.status === status);
  },

  clearError: () => set({ error: null }),

  setSelectedRequest: (request) => set({ selectedRequest: request }),

  clearSelectedRequest: () => set({ selectedRequest: null }),
}));

export default useRequestStore;
