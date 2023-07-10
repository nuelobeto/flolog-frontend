import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon, FolderIcon } from "../../assets/icons";
import { Button } from "../../components/button/Button";
import { ROUTES } from "../../config/routes";
import chatServices from "../../services/chatServices";
import useAuth from "../../store/useAuth";
import useProfile from "../../store/useProfile";
import "./Chat.scss";

const ConsultantChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();
  const { is_pharmacist, token } = useAuth((state) => state);
  const { consultantProfile } = useProfile((state) => state);
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [chat, setChat] = useState<any | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const savedChat: string | null = localStorage.getItem("chat");
  const parsedChat: any | undefined = savedChat
    ? JSON.parse(savedChat)
    : undefined;
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");

  const pusher = new Pusher("0555a00d1095bd0a49f2", {
    cluster: "mt1",
  });

  const getChatRequests = async () => {
    if (token) {
      if (is_pharmacist) {
        setOpenSidebar(true);
        setLoadingRequests(true);
        try {
          const res = await chatServices.getChatRequests(token);
          setLoadingRequests(false);
          setRequests(res);
        } catch (error) {
          setLoadingRequests(false);
          console.log(error);
        }
      }
    }
  };

  const acceptChatRequest = async (chat: any) => {
    const payload = {
      chatroom_id: chat.id,
    };

    if (token) {
      try {
        await chatServices.acceptChatRequests(token, payload);
        localStorage.setItem("chat", JSON.stringify(chat));

        setChat(chat);
        setOpenSidebar(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getChat = () => {
    setChat(parsedChat ? parsedChat : null);
  };

  const closeChat = () => {
    if (!chat) {
      navigate(ROUTES.consultant_dashboard);
      return;
    } else {
      localStorage.removeItem("chat");
      localStorage.removeItem("messages");
      setChat(null);
    }
  };

  const sendMessage = async () => {
    if (message === "") {
      return;
    }

    const payload = {
      room: chat?.id,
      sender: consultantProfile?.email,
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

  const showRequests = () => {
    getChatRequests();
    setOpenSidebar(true);
  };

  useEffect(() => {
    const savedMessages: string | null = localStorage.getItem("messages");
    const parsedMessages: any[] | undefined = savedMessages
      ? JSON.parse(savedMessages)
      : undefined;

    getChatRequests();
    getChat();
    setMessages(parsedMessages ? parsedMessages : []);
  }, []);

  useEffect(() => {
    if (chat) {
      const chatroomChannel = pusher.subscribe("chatroom-channel");
      const chatChannel = pusher.subscribe(chat?.channel_name);

      if (chatChannel?.name === chat?.channel_name) {
        chatroomChannel.bind("pharmacist-joined", (data: any) => {
          console.log("pharmacist-joined");
        });
        chatroomChannel.bind("chatroom-closed", (data: any) => {
          console.log("chatroom-closed");
        });

        chatChannel.bind("new-message", (data: any) => {
          setContent(data.content);
          setSender(data.sender);
        });
      }
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

      <div className={`chat-requests ${openSidebar ? "open" : "close"}`}>
        {loadingRequests ? (
          <p className="init-message">Waiting for requests...</p>
        ) : (
          <>
            <div className="request-header">
              <h3>Requests</h3>
              <Button
                size={"sm"}
                color={"primary"}
                variant={"filled"}
                rounded={"md"}
                onClick={() => setOpenSidebar(false)}
              >
                Hide Requests
              </Button>
            </div>
            <div className="requests hide-scroll-bar">
              {requests.map((item, index) => (
                <div className="request" key={index}>
                  <p>{item.client_email}</p>
                  <Button
                    size={"sm"}
                    color={"primary"}
                    variant={"filled"}
                    rounded={"md"}
                    onClick={() => acceptChatRequest(item)}
                  >
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {!chat && (
        <div className="empty-chat">
          <div className="request-header">
            <Button
              size={"sm"}
              color={"primary"}
              variant={"filled"}
              rounded={"md"}
              onClick={showRequests}
            >
              Show Requests
            </Button>
          </div>
        </div>
      )}

      <div
        className={`client-details hide-scroll-bar ${
          openDetails ? "open" : "close"
        }`}
      >
        <div className="client-data-wrapper">
          <h3>Patients Bio-Data </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <p>
              <b>Name:</b> {chat?.med_records.owner.first_name}{" "}
              {chat?.med_records.owner.last_name}
            </p>
            <p>
              <b>Age:</b> {chat?.med_records.age}
            </p>
            <p>
              <b>Sex:</b> {chat?.med_records.sex}
            </p>
            <p>
              <b>Weight:</b> {chat?.med_records.weight}Kg
            </p>
            <p>
              <b>Height:</b> {chat?.med_records.height}
            </p>
            <p>
              <b>Bloog Group:</b> {chat?.med_records.bloog_group}
            </p>
            <p>
              <b>Genotype:</b> {chat?.med_records.genotype}
            </p>
          </div>
        </div>

        <div className="client-data-wrapper">
          <h3>Medical Records</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <h4>Past Medical/Surgical History</h4>
              <p>
                {chat?.med_history.histories}, {chat?.med_history.others}
              </p>
            </div>

            <div>
              <h4>Risk Factors, Social/Family History</h4>
              <p>
                {chat?.fam_history.risks}, {chat?.fam_history.others}
              </p>
            </div>

            <div>
              <h4>Allergy Status</h4>
              <p>
                {chat?.allergy.allergies}, {chat?.allergy.others}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="messages hide-scroll-bar">
        <div className="client">
          {chat?.client_email}{" "}
          <FolderIcon
            style={{ color: `${!openDetails ? "#999999" : "#2E83B5"}` }}
            onClick={() => setOpenDetails(!openDetails)}
          />
        </div>
        {messages.map((message, index) => (
          <div
            className={`message ${
              message.sender === consultantProfile?.email
                ? "sender"
                : "receiver"
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
          style={{ background: "#2e83b5", border: "1px solid #2e83b5" }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </main>
  );
};

export default ConsultantChat;
