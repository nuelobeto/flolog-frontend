import axios from "axios";
import { config } from "../config/headers";
import { BASE_URL } from "./../config/baseUrl";

const getProfile = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/accounts/update_client_profile/`,
    config(token)
  );

  return response.data;
};

const updateProfile = async (token: string) => {};

const getUserActivity = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/accounts/activity/`,
    config(token)
  );

  return response.data;
};

const getBioData = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/biodata/record/`,
    config(token)
  );

  return response.data;
};

const profileServices = {
  getProfile,
  updateProfile,
  getUserActivity,
  getBioData,
};

export default profileServices;
