import axios from "axios";
import { LoginT, RegisterT } from "../types/type";
import { BASE_URL } from "./../config/baseUrl";

const register_client = async (payload: RegisterT) => {
  const response = await axios.post(
    `${BASE_URL}/accounts/register_client/`,
    payload
  );

  localStorage.setItem("user", JSON.stringify(response));
  return response.data;
};

const login = async (payload: LoginT) => {
  const response = await axios.post(`${BASE_URL}/accounts/login/`, payload);

  localStorage.setItem("user", JSON.stringify(response));
  return response.data;
};

const authServices = {
  register_client,
  login,
};

export default authServices;
