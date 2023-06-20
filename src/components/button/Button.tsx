import { AppleIcon } from "../../assets/icons";
import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  color: "primary" | "white";
  variant: "outlined" | "filled";
  rounded?: "sm" | "md" | "lg" | "full";
  style?: any;
  onClick?: () => void;
};

export const Button = ({
  children,
  size,
  color,
  variant,
  rounded,
  style,
  onClick,
}: ButtonProps) => {
  const btnSize =
    size === "sm" ? "sm" : size === "md" ? "md" : size === "lg" && "lg";
  const btnVariant =
    variant === "outlined" && color === "primary"
      ? "outlined-primary"
      : variant === "filled" && color === "primary"
      ? "filled-primary"
      : variant === "outlined" && color === "white"
      ? "outlined-white"
      : variant === "filled" && color === "white"
      ? "filled-white"
      : "";
  const btnRounded =
    rounded === "sm"
      ? "rounded-sm"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "lg"
      ? "rounded-lg"
      : rounded === "full" && "rounded-full";

  return (
    <button
      style={style}
      className={`${btnSize} ${btnVariant} ${btnRounded}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

type GoogleBtnProps = {
  text: string;
};

export const GoogleButton = ({ text }: GoogleBtnProps) => {
  return (
    <button className="google-btn">
      <img src="/images/google.webp" alt="" />
      <span>{text}</span>
    </button>
  );
};

export const AppStoreButtons = () => {
  return (
    <div className="app-store-btns">
      <button>
        <img src="/images/google-play.webp" alt="" />
        <p>
          GET IT ON <br />
          <span>Google Play</span>
        </p>
      </button>

      <button>
        <AppleIcon />
        <p>
          Download on the <br />
          <span>App Store</span>
        </p>
      </button>
    </div>
  );
};
