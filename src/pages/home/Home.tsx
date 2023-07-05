import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import TokenPopup from "../../components/token-popup/TokenPopup";
import { ROUTES } from "../../config/routes";
import useAuth from "../../store/useAuth";
import useProfile from "../../store/useProfile";
import "./Home.scss";
import chatServices from "./../../services/chatServices";
import { toast } from "react-toastify";

const Home = () => {
  const [openTokenPopup, setOpenTokenPopup] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth((state) => state);
  const { profile } = useProfile((state) => state);

  const requestChat = async () => {
    if (token) {
      if (profile?.coin === 0) {
        setOpenTokenPopup(true);
      } else {
        try {
          await chatServices.requestChat(token);
          navigate(ROUTES.chat);
        } catch (error: any) {
          const errorMessage = error.response.data.error;
          toast.error(errorMessage);
          if (errorMessage.includes("Insufficient")) {
            setOpenTokenPopup(true);
          }
        }
      }
    }
  };

  return (
    <>
      <main className="main home">
        <h1>Good Morning John, Welcome to your Flolog EMS portal</h1>

        <div
          className="request-service"
          onClick={() => navigate(ROUTES.request_medication)}
        >
          <div className="image">
            <img src="/images/request-med.webp" alt="" />
          </div>
          <p>Request for Medications</p>
        </div>

        <div className="request-service" onClick={requestChat}>
          <div className="image">
            <img src="/images/consult-pharm.webp" alt="" />
          </div>
          <p>Consult a Pharmacist</p>
        </div>
      </main>

      {openTokenPopup && (
        <TokenPopup
          openTokenPopup={openTokenPopup}
          setOpenTokenPopup={setOpenTokenPopup}
        />
      )}

      <Footer />
    </>
  );
};

export default Home;
