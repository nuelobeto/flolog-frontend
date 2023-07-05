import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerIcon } from "../../assets/icons";
import {
  AppStoreButtons,
  Button,
  GoogleButton,
} from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import { FormInput } from "../../components/input/Input";
import { ROUTES } from "../../config/routes";
import useAuth from "../../store/useAuth";
import { LoginT } from "../../types/type";
import "./Auth.scss";

const LoginForm = () => {
  const { user, login, loading, error, is_pharmacist } = useAuth(
    (state) => state
  );
  const [formData, setFormData] = useState({
    mobile_or_email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: LoginT = {
      email: formData.mobile_or_email,
      password: formData.password,
    };

    login(payload);
  };

  useEffect(() => {
    if (user) {
      if (is_pharmacist) {
        navigate(ROUTES.consultant_dashboard);
      } else {
        navigate(ROUTES.client_dashboard);
      }
    }
  }, [user, is_pharmacist]);

  return (
    <>
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
              error={error?.email}
            />
            <FormInput
              type={"password"}
              name={"password"}
              value={formData.password}
              setValue={setFormData}
              label={"Password"}
              error={error?.password}
            />

            <Button
              size={"lg"}
              color={"primary"}
              variant={"filled"}
              rounded={"sm"}
              style={{ width: "235px", height: "46px", margin: "1rem 0 0" }}
            >
              {!loading ? "Sign In" : <SpinnerIcon className="spinner" />}
            </Button>

            <div className="or-divider">
              <div></div>
              <span>OR</span>
              <div></div>
            </div>

            <GoogleButton text={"Sign-in with google"} />

            <p className="alt-action">
              Already have an account? <Link to={ROUTES.signup}>Sign up</Link>
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
