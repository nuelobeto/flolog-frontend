import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import { config } from "../config/headers";

const requestMedication = async (token: string, payload: any) => {
  const response = await axios.post(
    `${BASE_URL}/medications/medication/`,
    payload,
    config(token)
  );

  return response.data;
};

const medicationServices = {
  requestMedication,
};

export default medicationServices;
