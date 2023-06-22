import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import TokenPopup from "../../components/token-popup/TokenPopup";
import { ROUTES } from "../../config/routes";
import "./Home.scss";

const Home = () => {
  const [openTokenPopup, setOpenTokenPopup] = useState(false);
  const navigate = useNavigate();

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

        <div
          className="request-service"
          onClick={() => setOpenTokenPopup(true)}
        >
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
