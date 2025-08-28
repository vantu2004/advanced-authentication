import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  // --------- STATE ---------
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  message: null,

  // --------- ACTIONS ---------

  // Đăng ký
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Đăng nhập
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Đăng xuất
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      set({ error: "Error logging out" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Xác minh email
  verifyEmail: async (OTP) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/verify-email`, { OTP });
      set({
        user: data.user,
        isAuthenticated: true,
      });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Kiểm tra trạng thái đăng nhập
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/check-auth`);
      set({
        user: data.user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Quên mật khẩu
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: data.message });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: data.message });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
