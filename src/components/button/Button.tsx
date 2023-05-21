import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  color: "primary" | "white";
  variant: "outlined" | "filled";
  rounded?: "sm" | "md" | "lg" | "full";
  style?: any;
};

const Button = ({
  children,
  size,
  color,
  variant,
  rounded,
  style,
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
    <button style={style} className={`${btnSize} ${btnVariant} ${btnRounded}`}>
      {children}
    </button>
  );
};

export default Button;
