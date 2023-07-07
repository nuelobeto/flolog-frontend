import axios from "axios";
import { config } from "../config/headers";
import { BASE_URL } from "./../config/baseUrl";

const getPlans = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/accounts/plan/`, config(token));

  return response.data;
};

const paymentServices = {
  getPlans,
};

export default paymentServices;
