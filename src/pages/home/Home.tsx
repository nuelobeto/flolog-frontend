import { useState } from "react";
import Footer from "../../components/footer/Footer";
import TokenPopup from "../../components/token-popup/TokenPopup";
import "./Home.scss";

const Home = () => {
  const [openTokenPopup, setOpenTokenPopup] = useState(false);

  return (
    <>
      <main className="main home">
        <h1>Good Morning John, Welcome to your Flolog EMS portal</h1>

        <div className="request-service">
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
