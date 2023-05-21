import "./Auth.scss";
import Navbar from "./../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  Button,
  GoogleButton,
  AppStoreButtons,
} from "./../../components/button/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

const Auth = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="auth-main">
        <div>
          <h1>
            <span>Transform</span> Your Medication Management with{" "}
            <span>Flolog</span>
          </h1>
          <p className="subtitle">
            Your Personalized <br /> Pharmacy on the Go
          </p>
        </div>

        <Button
          size={"lg"}
          color={"primary"}
          variant={"filled"}
          rounded={"sm"}
          style={{ width: "235px", height: "46px" }}
        >
          Sign Up with Form
        </Button>

        <div className="or-divider">
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        <GoogleButton text={"Sign-Up with google"} />

        <p className="alt-action">
          Already have an account? <Link to={ROUTES.login}>Log In</Link>
        </p>

        <div className="get-the-app">
          <AppStoreButtons />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Auth;
