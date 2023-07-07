import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
import { Button } from "../../components/button/Button";
import { ROUTES } from "../../config/routes";
import useAuth from "../../store/useAuth";
import Pusher from "pusher-js";
import "./Chat.scss";
import chatServices from "../../services/chatServices";
import useProfile from "../../store/useProfile";

const Chat = () => {
  const { token } = useAuth((state) => state);
  const { profile } = useProfile((state) => state);
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatroom, setChatroom] = useState<any | null>(null);
  const savedChatroom: string | null = localStorage.getItem("chatroomId");
  const parsedChatroom: any | undefined = savedChatroom
    ? JSON.parse(savedChatroom)
    : undefined;
  const [pharmacistJoined, setPharmacistJoined] = useState(false);
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");

  const pusher = new Pusher("0555a00d1095bd0a49f2", {
    cluster: "mt1",
  });

  const closeChat = () => {
    const close = confirm("End Chat?");
    if (close) {
      setPharmacistJoined(false);
      localStorage.removeItem("pharm-joined");
      localStorage.removeItem("chatroomId");
      localStorage.removeItem("messages");
      navigate(ROUTES.client_home);
    }
  };

  const sendMessage = async () => {
    if (message === "") {
      return;
    }

    const payload = {
      room: chatroom?.chatroom.id,
      sender: profile?.email,
      content: message,
    };

    if (token) {
      try {
        await chatServices.sendMessage(token, payload);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const savedJoined: string | null = localStorage.getItem("pharm-joined");
    const parsedJoined: boolean | undefined = savedJoined
      ? JSON.parse(savedJoined)
      : undefined;

    const savedMessages: string | null = localStorage.getItem("messages");
    const parsedMessages: any[] | undefined = savedMessages
      ? JSON.parse(savedMessages)
      : undefined;

    setChatroom(parsedChatroom ? parsedChatroom : null);
    setPharmacistJoined(parsedJoined ? parsedJoined : false);
    setMessages(parsedMessages ? parsedMessages : []);
  }, []);

  useEffect(() => {
    const chatroomChannel = pusher.subscribe("chatroom-channel");
    chatroomChannel.bind("pharmacist-joined", (data: any) => {
      setPharmacistJoined(true);
      localStorage.setItem("pharm-joined", JSON.stringify(true));
    });
    chatroomChannel.bind("chatroom-closed", (data: any) => {
      setPharmacistJoined(false);
      localStorage.removeItem("pharm-joined");
    });
  });

  useEffect(() => {
    if (chatroom) {
      const chatChannel = pusher.subscribe(chatroom.chatroom.channel_name);
      chatChannel.bind("new-message", (data: any) => {
        setContent(data.content);
        setSender(data.sender);
      });
    }
  });

  useEffect(() => {
    if (content) {
      const newMessage = {
        content,
        sender,
      };

      setMessages([...messages, newMessage]);
    }
  }, [content]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

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
        {!pharmacistJoined && (
          <p className="init-message">
            You are live, kindly wait for consultant to join.
          </p>
        )}

        {messages.map((message, index) => (
          <div
            className={`message ${
              message.sender === profile?.email ? "sender" : "receiver"
            }`}
            key={index}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="send-message">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size={"lg"}
          color={"primary"}
          variant={"filled"}
          rounded={"md"}
          style={{ background: "#30B0FF", border: "1px solid #30B0FF" }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </main>
  );
};

export default Chat;
