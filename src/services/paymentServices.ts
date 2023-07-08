import axios from "axios";
import { config } from "../config/headers";
import { BASE_URL } from "./../config/baseUrl";

const getPlans = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/accounts/plan/`, config(token));

  return response.data;
};

const makePayment = async (token: string, payload: any) => {
  const response = await axios.post(
    `${BASE_URL}/accounts/make_payment/`,
    payload,
    config(token)
  );

  return response.data;
};

const verifyPayment = async (token: string, reference: string) => {
  const response = await axios.get(
    `${BASE_URL}/accounts/verify_payment/${reference}/`,
    config(token)
  );

  return response.data;
};

const paymentServices = {
  getPlans,
  makePayment,
  verifyPayment,
};

export default paymentServices;
