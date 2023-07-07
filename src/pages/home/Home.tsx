import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import TokenPopup from "../../components/token-popup/TokenPopup";
import { ROUTES } from "../../config/routes";
import useAuth from "../../store/useAuth";
import "./Home.scss";
import { toast } from "react-toastify";
import paymentServices from "../../services/paymentServices";

const Home = () => {
  const { token } = useAuth((state) => state);
  const [openTokenPopup, setOpenTokenPopup] = useState(false);
  const navigate = useNavigate();
  const [packages, setPackages] = useState<any[]>([]);

  const getPackages = async () => {
    if (token) {
      try {
        const packages = await paymentServices.getPlans(token);
        setPackages(packages);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

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
