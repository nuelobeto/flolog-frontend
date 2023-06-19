import Footer from "../../components/footer/Footer";
import "./Home.scss";

const Home = () => {
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

        <div className="request-service">
          <div className="image">
            <img src="/images/consult-pharm.webp" alt="" />
          </div>
          <p>Consult a Pharmacist</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
