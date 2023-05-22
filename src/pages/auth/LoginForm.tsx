import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppStoreButtons,
  Button,
  GoogleButton,
} from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import { FormInput } from "../../components/input/Input";
import Navbar from "../../components/navbar/Navbar";
import { ROUTES } from "../../config/routes";
import "./Auth.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mobile_or_email: "",
    password: "",
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="auth">
        <div className="auth-form">
          <h2>Log In</h2>

          <form onSubmit={handleLogin}>
            <FormInput
              type={"text"}
              name={"mobile_or_email"}
              value={formData.mobile_or_email}
              setValue={setFormData}
              label={"Phone number or email"}
            />
            <FormInput
              type={"password"}
              name={"password"}
              value={formData.password}
              setValue={setFormData}
              label={"Password"}
            />

            <Button
              size={"lg"}
              color={"primary"}
              variant={"filled"}
              rounded={"sm"}
              style={{ width: "235px", height: "46px", margin: "1rem 0 0" }}
            >
              Sign In
            </Button>

            <div className="or-divider">
              <div></div>
              <span>OR</span>
              <div></div>
            </div>

            <GoogleButton text={"Sign-in with google"} />

            <p className="alt-action">
              Already have an account? <Link to={ROUTES.login}>Sign up</Link>
            </p>
          </form>

          <div className="get-the-app">
            <AppStoreButtons />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginForm;
