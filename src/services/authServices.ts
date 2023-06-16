import axios from "axios";
import { RegisterT } from "../types/type";
import { BASE_URL } from "./../config/baseUrl";

const register_client = async (payload: RegisterT) => {
  const response = await axios.post(
    `${BASE_URL}/accounts/register_client/`,
    payload
  );

  return response.data;
};

const login = async (payload: RegisterT) => {
  const response = await axios.post(`${BASE_URL}/accounts/login/`, payload);

  return response.data;
};

const authServices = {
  register_client,
};

export default authServices;
