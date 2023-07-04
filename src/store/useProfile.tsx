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
  bioData: any | null;
  getBioData: (token: string) => void;
  uuid: string | null;
  medicalHistory: any | null;
  getMedicalHistory: (token: string) => void;
  riskFactors: any | null;
  getRiskFactors: (token: string) => void;
  allergies: any | null;
  getAllergies: (token: string) => void;
};

const useProfile = create<ProfileStateT>((set) => ({
  profile: null,
  getProfileLoading: false,
  updateProfileLoading: false,
  userActivity: [],
  error: "",
  bioData: null,
  uuid: null,
  medicalHistory: null,
  riskFactors: null,
  allergies: null,

  getProfile: async (token: string) => {
    set((state) => ({ getProfileLoading: (state.getProfileLoading = true) }));
    try {
      const profile = await profileServices.getProfile(token);

      set((state) => ({
        getProfileLoading: (state.getProfileLoading = false),
      }));
      set((state) => ({ profile: (state.profile = profile) }));
      set((state) => ({ uuid: (state.uuid = profile.user) }));
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

  getMedicalHistory: async (token: string) => {
    try {
      const medicalHistory = await profileServices.getMedicalHistory(token);
      set((state) => ({
        medicalHistory: (state.medicalHistory = medicalHistory),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  getRiskFactors: async (token: string) => {
    try {
      const riskFactors = await profileServices.getRiskFactors(token);
      set((state) => ({
        riskFactors: (state.riskFactors = riskFactors),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  getAllergies: async (token: string) => {
    try {
      const allergies = await profileServices.getAllergies(token);
      set((state) => ({
        allergies: (state.allergies = allergies),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useProfile;
