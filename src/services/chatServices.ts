import axios from "axios";
import { config } from "../config/headers";
import { BASE_URL } from "./../config/baseUrl";

const requestChat = async (token: string) => {
  const response = await axios.post(
    `${BASE_URL}/chat/request_chat/`,
    {},
    config(token)
  );

  return response.data;
};

const getChatRequests = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/chat/view_chat_request/`,
    config(token)
  );

  return response.data;
};

const acceptChatRequests = async (token: string, payload: any) => {
  const response = await axios.post(
    `${BASE_URL}/chat/view_chat_request/`,
    payload,
    config(token)
  );

  return response.data;
};

const chatServices = {
  requestChat,
  getChatRequests,
  acceptChatRequests,
};

export default chatServices;
