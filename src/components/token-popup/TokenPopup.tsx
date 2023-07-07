import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
import { ROUTES } from "../../config/routes";
import { Button } from "../button/Button";
import "./TokenPopup.scss";
import useProfile from "./../../store/useProfile";
import useAuth from "./../../store/useAuth";
import chatServices from "../../services/chatServices";
import { toast } from "react-toastify";

type TokenPopupProps = {
  openTokenPopup: boolean;
  setOpenTokenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const packages = [
  {
    title: "Standard",
    feature: `1 session / Single use`,
    price: "499",
  },
  {
    title: "Advanced",
    feature: "10 sessions / monthly use",
    price: "4999",
  },
  {
    title: "Premium",
    feature: "30 sessions / 3 months",
    price: "9999",
  },
];

const TokenPopup = ({ openTokenPopup, setOpenTokenPopup }: TokenPopupProps) => {
  const navigate = useNavigate();
  const { profile } = useProfile((state) => state);
  const { token } = useAuth((state) => state);

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

  console.log(profile);

  return (
    <div className="modal-wrapper token-popup">
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
            size={"sm"}
            color={"primary"}
            variant={"filled"}
            rounded={"lg"}
            style={{ background: "#30B0FF", border: "1px solid #30B0FF" }}
            onClick={requestChat}
          >
            Confirm
          </Button>
        )}

        <h3 style={{ marginBottom: "1rem" }}>Token Packages</h3>

        <div className="token-packages">
          {packages.map((item, index) => (
            <div className="package" key={index}>
              <span className="package-title">{item.title}</span>
              <p className="package-feature">
                <i>{item.feature}</i>
              </p>
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
              >
                Buy
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenPopup;
