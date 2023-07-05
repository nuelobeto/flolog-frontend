import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
import { Button } from "../../components/button/Button";
import { ROUTES } from "../../config/routes";
import useAuth from "../../store/useAuth";
import "./Chat.scss";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  const closeChat = () => {
    const close = confirm("End Chat?");
    if (close) {
      navigate(ROUTES.client_home);
    }
  };

  return (
    <main className="chat main">
      <div className="chat-header">
        <div className="online">
          <div className="indicator"></div>
          <span>Online</span>
        </div>
        <CloseIcon onClick={closeChat} />
      </div>

      <div className="client-messages hide-scroll-bar">
        {messages.length === 0 && (
          <p className="init-message">
            You are live, kindly wait for consultant to join.
          </p>
        )}

        {messages.map((message, index) => (
          <div className="message"></div>
        ))}
      </div>

      <div className="send-message">
        <input type="text" placeholder="Type a message..." />
        <Button
          size={"lg"}
          color={"primary"}
          variant={"filled"}
          rounded={"md"}
          style={{ background: "#30B0FF", border: "1px solid #30B0FF" }}
        >
          Send
        </Button>
      </div>
    </main>
  );
};

export default Chat;
