import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

const ProtectedRoutes = (props: any) => {
  const { isAllowed } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) {
      navigate(ROUTES.landing);
    }
  }, [isAllowed, navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
