import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
import { ROUTES } from "../../config/routes";
import { Button } from "../button/Button";
import "./TokenPopup.scss";

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

  return (
    <div className="modal-wrapper token-popup">
      <div className="modal token-modal">
        <CloseIcon
          className="close-modal"
          onClick={() => setOpenTokenPopup(false)}
        />

        <div className="token-image">
          <img src="/images/token-image.webp" alt="" />
        </div>

        <h2>Congratulations!!</h2>

        <p className="title">
          You have a free token, click continue to access live chat immediately.
        </p>

        <Button
          size={"sm"}
          color={"primary"}
          variant={"filled"}
          rounded={"lg"}
          style={{ background: "#30B0FF", border: "1px solid #30B0FF" }}
          onClick={() => navigate(ROUTES.chat)}
        >
          Confirm
        </Button>

        <p className="subtitle">
          <span>Don’t have a token?</span> Get any of these token packages below
          in one click!
        </p>

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
