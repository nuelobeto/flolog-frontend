import { create } from "zustand";
import authServices from "../services/authServices";
import { LoginT, RegisterT } from "../types/type";

type UserStateT = {
  user: null | any;
  loading: boolean;
  error: any;
  success: boolean;
  setUser: (user: null | any) => void;
  googleAuth: () => void;
  login: (payload: LoginT) => void;
  register: (payload: RegisterT) => void;
  logout: () => void;
  resetAuth: () => void;
};

const savedUser: string | null = localStorage.getItem("user");
const parsedUser: any | undefined = savedUser
  ? JSON.parse(savedUser)
  : undefined;

const useAuth = create<UserStateT>((set) => ({
  user: parsedUser ? parsedUser : null,
  loading: false,
  error: "",
  success: false,

  setUser: (user: null | any) => {
    set((state) => ({ user: (state.user = user) }));
  },

  googleAuth: async () => {},

  login: async (payload: LoginT) => {
    set((state) => ({ loading: (state.loading = true) }));
    try {
      const user = await authServices.login(payload);
      set((state) => ({ loading: (state.loading = false) }));
      set((state) => ({ success: (state.success = true) }));
      set((state) => ({ user: (state.user = user) }));
    } catch (error: any) {
      set((state) => ({ loading: (state.loading = false) }));
      set((state) => ({ error: (state.error = error.response.data) }));
    }
  },

  register: async (payload: RegisterT) => {
    set((state) => ({ loading: (state.loading = true) }));
    try {
      await authServices.register_client(payload);
      set((state) => ({ loading: (state.loading = false) }));
      set((state) => ({ success: (state.success = true) }));
    } catch (error: any) {
      set((state) => ({ loading: (state.loading = false) }));
      set((state) => ({ error: (state.error = error.response.data) }));
    }
  },

  logout: async () => {},

  resetAuth: () => {
    set((state) => ({ loading: (state.loading = false) }));
    set((state) => ({ success: (state.success = false) }));
    set((state) => ({ error: (state.error = "") }));
  },
}));

export default useAuth;
