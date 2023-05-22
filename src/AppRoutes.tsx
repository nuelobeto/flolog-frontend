import { Route, Routes } from "react-router-dom";
import { PhoneContainer } from "./components/phone-container/PhoneContainer";
import Landing from "./pages/landing/Landing";
import Auth from "./pages/auth/Auth";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";

const AppRoutes = () => {
  return (
    <PhoneContainer>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="auth" element={<Auth />} />
        <Route path="auth/signup" element={<SignupForm />} />
        <Route path="auth/login" element={<LoginForm />} />
      </Routes>
    </PhoneContainer>
  );
};

export default AppRoutes;
