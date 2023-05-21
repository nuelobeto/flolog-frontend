import { Route, Routes } from "react-router-dom";
import { PhoneContainer } from "./components/phone-container/PhoneContainer";
import Landing from "./pages/landing/Landing";
import Auth from "./pages/auth/Auth";

const AppRoutes = () => {
  return (
    <PhoneContainer>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </PhoneContainer>
  );
};

export default AppRoutes;
