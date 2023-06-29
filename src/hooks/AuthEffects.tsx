import { useEffect } from "react";
import useAuth from "../store/useAuth";

const useAuthEffects = () => {
  const { error, success, resetAuth } = useAuth((state) => state);

  useEffect(() => {
    if (success || error) {
      resetAuth();
    }
  }, [error, success]);
};

export default useAuthEffects;
