import { create } from "zustand";
import axios from "../lib/axios";

const useAuthStore = create((set) => ({
  admin: null,
  loading: false,
  error: null,

  /* ================= LOGIN ================= */

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/auth/login", { email, password });

      set({
        admin: res.data.admin,
        loading: false,
        error: null,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
        loading: false,
      });
      return false;
    }
  },

  /* ================= LOGOUT ================= */

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ admin: null });
    } catch (error) {
      console.log(error);
      set({ admin: null });
    }
  },

  /* ================= CHECK AUTH ================= */

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/check-auth");

      if (res.data?.admin) {
        set({ admin: res.data.admin, loading: false, error: null });
      } else {
        set({ admin: null, loading: false });
      }
    } catch (error) {
      console.error("Check auth error:", error);
      set({ admin: null, loading: false });
    }
  },
}));

export default useAuthStore;
