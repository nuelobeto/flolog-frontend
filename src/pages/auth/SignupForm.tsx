import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppStoreButtons,
  Button,
  GoogleButton,
} from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import { FormInput } from "../../components/input/Input";
import { ROUTES } from "../../config/routes";
import "./Auth.scss";
import authServices from "./../../services/authServices";
import { RegisterT } from "../../types/type";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirm_password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const payload: RegisterT = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: Number(formData.phone_number),
      country: formData.country,
      state: formData.state,
      city: formData.city,
      password: formData.password,
    };

    setLoading(true);

    try {
      const result = await authServices.register_client(payload);
      setLoading(false);
      console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <main className="auth">
        <div className="auth-form">
          <h2>Create Account</h2>

          <form onSubmit={handleCreateAccount}>
            <FormInput
              type={"text"}
              name={"first_name"}
              value={formData.first_name}
              setValue={setFormData}
              label={"First Name"}
            />
            <FormInput
              type={"text"}
              name={"last_name"}
              value={formData.last_name}
              setValue={setFormData}
              label={"Last Name"}
            />
            <FormInput
              type={"tel"}
              name={"phone_number"}
              value={formData.phone_number}
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
              name={"country"}
              value={formData.country}
              setValue={setFormData}
              label={"Country"}
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
              {!loading ? "Create account" : "Loading.."}
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
