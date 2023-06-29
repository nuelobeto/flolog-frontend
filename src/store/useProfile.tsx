import { create } from "zustand";
import profileServices from "../services/profileServices";

type ProfileStateT = {
  profile: null | any;
  getProfileLoading: boolean;
  updateProfileLoading: boolean;
  error: string;
  getProfile: (token: string) => void;
  updateProfile: () => void;
  userActivity: any[];
  getUserActivity: (token: string) => void;
  bioData: any;
  getBioData: (token: string) => void;
};

const useProfile = create<ProfileStateT>((set) => ({
  profile: null,
  getProfileLoading: false,
  updateProfileLoading: false,
  userActivity: [],
  error: "",
  bioData: null,

  getProfile: async (token: string) => {
    set((state) => ({ getProfileLoading: (state.getProfileLoading = true) }));
    try {
      const profile = await profileServices.getProfile(token);

      set((state) => ({
        getProfileLoading: (state.getProfileLoading = false),
      }));
      set((state) => ({ profile: (state.profile = profile) }));
    } catch (error) {
      set((state) => ({
        getProfileLoading: (state.getProfileLoading = false),
      }));
      console.log(error);
    }
  },

  updateProfile: async () => {},

  getUserActivity: async (token: string) => {
    try {
      const userActivity = await profileServices.getUserActivity(token);
      set((state) => ({ userActivity: (state.userActivity = userActivity) }));
    } catch (error) {
      console.log(error);
    }
  },

  getBioData: async (token: string) => {
    try {
      const bioData = await profileServices.getBioData(token);
      set((state) => ({ bioData: (state.bioData = bioData) }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useProfile;
