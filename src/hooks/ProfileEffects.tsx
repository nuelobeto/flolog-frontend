import { useEffect } from "react";
import useAuth from "../store/useAuth";
import useProfile from "../store/useProfile";

const useProfileEffects = () => {
  const { token, is_pharmacist } = useAuth((state) => state);
  const {
    getProfile,
    getUserActivity,
    getBioData,
    getMedicalHistory,
    getRiskFactors,
    getAllergies,
    getConsultantProfile,
  } = useProfile((state) => state);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (is_pharmacist) {
      getConsultantProfile(token);
      getUserActivity(token);
    } else {
      getProfile(token);
      getUserActivity(token);
      getBioData(token);
      getMedicalHistory(token);
      getRiskFactors(token);
      getAllergies(token);
    }
  }, [token]);
};

export default useProfileEffects;
