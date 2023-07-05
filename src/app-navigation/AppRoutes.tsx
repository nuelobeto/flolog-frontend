import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhoneContainer } from "../components/phone-container/PhoneContainer";
import Landing from "../pages/landing/Landing";
import Auth from "../pages/auth/Auth";
import SignupForm from "../pages/auth/SignupForm";
import LoginForm from "../pages/auth/LoginForm";
import { ROUTES } from "../config/routes";
import UserDashboard from "../pages/user-dashboard/UserDashboard";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import RequestMedication from "../pages/request-medication/RequestMedication";
import Verification from "../pages/auth/Verification";
import ProtectedRoutes from "./ProtectedRoutes";
import useAuth from "../store/useAuth";
import useAuthEffects from "./../hooks/AuthEffects";
import useProfileEffects from "../hooks/ProfileEffects";
import ConsultantDashboard from "../pages/consultant-dashboard/ConsultantDashboard";
import ConsultantHome from "../pages/consultant-home/ConsultantHome";
import ConsultantActivies from "../pages/consultant-activities/ConsultantActivities";
import ConsultantChat from "./../pages/chat/ConsultantChat";
import { useState } from "react";

const AppRoutes = () => {
  const { user } = useAuth((state) => state);
  useAuthEffects();
  useProfileEffects();

  return (
    <PhoneContainer>
      <Routes>
        <Route path={ROUTES.landing} element={<Landing />} />
        <Route path={ROUTES.auth} element={<Auth />} />
        <Route path={ROUTES.signup} element={<SignupForm />} />
        <Route path={ROUTES.login} element={<LoginForm />} />
        <Route path={ROUTES.verification} element={<Verification />} />

        <Route element={<ProtectedRoutes isAllowed={user} />}>
          <Route path={ROUTES.client_dashboard} element={<UserDashboard />} />
          <Route
            path={ROUTES.consultant_dashboard}
            element={<ConsultantDashboard />}
          />
          <Route path={ROUTES.client_home} element={<Home />} />
          <Route path={ROUTES.consultant_home} element={<ConsultantHome />} />
          <Route
            path={ROUTES.consultant_activities}
            element={<ConsultantActivies />}
          />
          <Route path={ROUTES.chat} element={<Chat />} />
          <Route path={ROUTES.consultant_chat} element={<ConsultantChat />} />
          <Route
            path={ROUTES.request_medication}
            element={<RequestMedication />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </PhoneContainer>
  );
};

export default AppRoutes;
