import { useEffect } from "react";
import useAuth from "../store/useAuth";
import useProfile from "../store/useProfile";

const useProfileEffects = () => {
  const { token } = useAuth((state) => state);
  const {
    getProfile,
    getUserActivity,
    getBioData,
    getMedicalHistory,
    getRiskFactors,
    getAllergies,
  } = useProfile((state) => state);

  useEffect(() => {
    if (!token) {
      return;
    }
    getProfile(token);
    getUserActivity(token);
    getBioData(token);
    getMedicalHistory(token);
    getRiskFactors(token);
    getAllergies(token);
  }, [token]);
};

export default useProfileEffects;
