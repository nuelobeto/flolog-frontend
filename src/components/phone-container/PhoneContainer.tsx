import "./PhoneContainer.scss";
import Navbar from "./../navbar/Navbar";

type PhoneContainerProps = {
  children: React.ReactNode;
};

export const PhoneContainer = ({ children }: PhoneContainerProps) => {
  return (
    <div className="phone-container">
      <div className="phone">
        <Navbar />
        <div className="hide-scroll-bar phone-content">{children}</div>
      </div>
    </div>
  );
};
