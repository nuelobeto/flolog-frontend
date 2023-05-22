import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
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

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    state: "",
    city: "",
    password: "",
    confirm_password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
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
          <h2>Create Account</h2>

          <form onSubmit={handleCreateAccount}>
            <FormInput
              type={"text"}
              name={"firstname"}
              value={formData.firstname}
              setValue={setFormData}
              label={"First Name"}
            />
            <FormInput
              type={"text"}
              name={"lastname"}
              value={formData.lastname}
              setValue={setFormData}
              label={"Last Name"}
            />
            <FormInput
              type={"tel"}
              name={"mobile"}
              value={formData.mobile}
              setValue={setFormData}
              label={"Mobile Number"}
            />
            <FormInput
              type={"email"}
              name={"email"}
              value={formData.email}
              setValue={setFormData}
              label={"Email Address"}
            />
            <FormInput
              type={"text"}
              name={"state"}
              value={formData.state}
              setValue={setFormData}
              label={"State"}
            />
            <FormInput
              type={"text"}
              name={"city"}
              value={formData.city}
              setValue={setFormData}
              label={"City"}
            />
            <FormInput
              type={"password"}
              name={"password"}
              value={formData.password}
              setValue={setFormData}
              label={"Password"}
            />
            <FormInput
              type={"password"}
              name={"confirm_password"}
              value={formData.confirm_password}
              setValue={setFormData}
              label={"Confirm Password"}
            />
            <div className="check-box">
              <input type="checkbox" />
              <label>
                I agree to all the <Link to={"/"}>Terms</Link> and{" "}
                <Link to={"/"}>Privacy policy</Link>{" "}
              </label>
            </div>

            <Button
              size={"lg"}
              color={"primary"}
              variant={"filled"}
              rounded={"sm"}
              style={{ width: "235px", height: "46px", margin: "1rem 0 0" }}
            >
              Create account
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

export default SignupForm;
