import { CloseIcon } from "../../assets/icons";
import { Button } from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import "./Chat.scss";

const Chat = () => {
  const messages: any[] = [];
  return (
    <>
      <main className="chat main">
        <div className="chat-header">
          <div className="online">
            <div className="indicator"></div>
            <span>Online</span>
          </div>
          <CloseIcon />
        </div>

        <div className="messages hide-scroll-bar">
          <p className="init-message">
            You are live, kindly wait for consultant to join.
          </p>
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
      <Footer />
    </>
  );
};

export default Chat;
