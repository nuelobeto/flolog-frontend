import { Route, Routes } from "react-router-dom";
import { PhoneContainer } from "./components/phone-container/PhoneContainer";
import Landing from "./pages/landing/Landing";
import Auth from "./pages/auth/Auth";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import { ROUTES } from "./config/routes";
import UserDashboard from "./pages/user-dashboard/UserDashboard";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import RequestMedication from "./pages/request-medication/RequestMedication";
import Verification from "./pages/auth/Verification";

const AppRoutes = () => {
  return (
    <PhoneContainer>
      <Routes>
        <Route path={ROUTES.landing} element={<Landing />} />
        <Route path={ROUTES.auth} element={<Auth />} />
        <Route path={ROUTES.signup} element={<SignupForm />} />
        <Route path={ROUTES.login} element={<LoginForm />} />
        <Route path={ROUTES.verification} element={<Verification />} />
        <Route path={ROUTES.user_dashboard} element={<UserDashboard />} />
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.chat} element={<Chat />} />
        <Route
          path={ROUTES.request_medication}
          element={<RequestMedication />}
        />
      </Routes>
    </PhoneContainer>
  );
};

export default AppRoutes;
