import { useNavigate } from "react-router-dom";
import { CloseIcon, SpinnerIcon } from "../../assets/icons";
import { ROUTES } from "../../config/routes";
import { Button } from "../button/Button";
import "./TokenPopup.scss";
import useProfile from "./../../store/useProfile";
import useAuth from "./../../store/useAuth";
import chatServices from "../../services/chatServices";
import { toast } from "react-toastify";
import paymentServices from "../../services/paymentServices";
import { useEffect, useState } from "react";

type TokenPopupProps = {
  openTokenPopup: boolean;
  setOpenTokenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  packages: any[];
};

const TokenPopup = ({
  openTokenPopup,
  setOpenTokenPopup,
  packages,
}: TokenPopupProps) => {
  const navigate = useNavigate();
  const { profile, getProfile } = useProfile((state) => state);
  const { token } = useAuth((state) => state);
  const [paying, setPaying] = useState(false);
  const [paystackUrl, setPaystackUrl] = useState("");
  const [ref, setRef] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [tokenAmount, setTokenAmount] = useState<string | null>(null);

  const requestChat = async () => {
    if (token) {
      try {
        const chatroom = await chatServices.requestChat(token);
        localStorage.setItem("chatroomId", JSON.stringify(chatroom));
        navigate(ROUTES.chat);
      } catch (error: any) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      }
    }
  };

  const makePayment = async (plan: any) => {
    const payload = {
      plan_id: plan.id,
    };

    if (token) {
      try {
        const res = await paymentServices.makePayment(token, payload);
        setPaystackUrl(res.data.authorization_url);
        setRef(res.data.reference);
        setPaying(true);
        setTokenAmount(plan.token);
      } catch (error) {
        setPaying(false);
        console.log(error);
      }
    }
  };

  const verifyPayment = async () => {
    if (token) {
      setVerifying(true);
      try {
        const res = await paymentServices.verifyPayment(token, ref);
        if (res.data.status === "success") {
          setPaymentVerified(true);
          setVerifying(false);
          getProfile(token);
        }
        if (res.data.status === "abandoned") {
          setVerifying(false);
          toast.warn("Your Payment has not been verified. Try again.");
        }
      } catch (error) {
        setVerifying(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (paystackUrl) {
      window.open(paystackUrl, "_blank");
    }
  }, [paystackUrl]);

  return (
    <div className="modal-wrapper token-popup">
      {!paymentVerified ? (
        <div className="modal token-modal">
          <CloseIcon
            className="close-modal"
            onClick={() => setOpenTokenPopup(false)}
          />

          {/* <div className="token-image">
          <img src="/images/token-image.webp" alt="" />
        </div>

        <h2>Congratulations!!</h2> */}

          <p className="subtitle">
            You have <span>{profile?.coin}</span> token
            {profile?.coin === 1 ? "" : "s"},{" "}
            {profile?.coin === 0
              ? "Get any of the token packages below."
              : "click continue to access live chat immediately."}
          </p>

          {profile?.coin > 0 && (
            <Button
              size={"lg"}
              color={"primary"}
              variant={"filled"}
              rounded={"lg"}
              style={{
                background: "#30B0FF",
                border: "1px solid #30B0FF",
              }}
              onClick={requestChat}
            >
              Continue
            </Button>
          )}

          <h3 style={{ margin: "2rem 0 1rem" }}>Token Packages</h3>

          <div className="token-packages">
            {packages.length === 0 && <p>Fetching Packages...</p>}
            {packages.map((item, index) => (
              <div className="package" key={index}>
                <span className="package-title">{item.name}</span>
                <p className="package-feature">Token: {item.token}</p>
                <span className="package-price">N{item.price}</span>
                <Button
                  size={"sm"}
                  color={"primary"}
                  variant={"filled"}
                  rounded={"md"}
                  style={{
                    background: "#30B0FF",
                    border: "1px solid #30B0FF",
                    fontSize: "11px",
                  }}
                  onClick={() => makePayment(item)}
                >
                  Buy
                </Button>
              </div>
            ))}
          </div>

          {paying && (
            <Button
              size={"lg"}
              color={"primary"}
              variant={"filled"}
              rounded={"lg"}
              style={{
                background: "#30B0FF",
                border: "1px solid #30B0FF",
                marginTop: "2rem",
                width: "100%",
              }}
              onClick={verifyPayment}
            >
              {!verifying ? (
                "I have made payment"
              ) : (
                <SpinnerIcon className="spinner" />
              )}
            </Button>
          )}
        </div>
      ) : (
        <div className="modal token-modal">
          <CloseIcon
            className="close-modal"
            onClick={() => setOpenTokenPopup(false)}
          />

          <h3 style={{ margin: "1rem 0" }}>Congratulations!!</h3>

          <p className="subtitle">
            Payment verified! You have successfully purchased{" "}
            <span>{tokenAmount}</span> token
            {Number(tokenAmount) === 1 ? "" : "s"}.
          </p>
          <Button
            size={"lg"}
            color={"primary"}
            variant={"filled"}
            rounded={"lg"}
            style={{
              background: "#30B0FF",
              border: "1px solid #30B0FF",
            }}
            onClick={requestChat}
          >
            Continue to chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default TokenPopup;
