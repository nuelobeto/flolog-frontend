import { useState } from "react";
import { AppStoreButtons, Button } from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import { FormInput } from "../../components/input/Input";
import "./Auth.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    OTP: "",
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <main className="auth">
        <div className="auth-form">
          <h2>Sign-up Verification</h2>

          <p className="verification-subtitle">
            We have sent a verification OTP code to the email provided. kindly
            enter code to continue to login
          </p>

          <form onSubmit={handleLogin}>
            <FormInput
              type={"text"}
              name={"OTP"}
              value={formData.OTP}
              setValue={setFormData}
            />

            <Button
              size={"lg"}
              color={"primary"}
              variant={"filled"}
              rounded={"sm"}
              style={{ width: "235px", height: "46px", margin: "1rem 0 0" }}
            >
              Verify
            </Button>
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
