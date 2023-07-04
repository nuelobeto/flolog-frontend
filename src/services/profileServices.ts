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

const updateProfile = async (token: string, payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/accounts/update_client_profile/`,
    payload,
    config(token)
  );

  return response.data;
};

const getUserActivity = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/accounts/activity/`,
    config(token)
  );

  return response.data;
};

const getBioData = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/biodata/record_detail/`,
    config(token)
  );

  return response.data;
};

const updateBioData = async (token: string, payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/biodata/record_detail/`,
    payload,
    config(token)
  );

  return response.data;
};

const getMedicalHistory = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/biodata/history_detail/`,
    config(token)
  );

  return response.data;
};

const updateMedicalHistory = async (token: string, payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/biodata/history_detail/`,
    payload,
    config(token)
  );

  return response.data;
};

const getRiskFactors = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/biodata/family_detail/`,
    config(token)
  );

  return response.data;
};

const updateRiskFactors = async (token: string, payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/biodata/family_detail/`,
    payload,
    config(token)
  );

  return response.data;
};

const getAllergies = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/biodata/allergy_detail/`,
    config(token)
  );

  return response.data;
};

const updateAllergies = async (token: string, payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/biodata/allergy_detail/`,
    payload,
    config(token)
  );

  return response.data;
};

const profileServices = {
  getProfile,
  updateProfile,
  getUserActivity,
  getBioData,
  updateBioData,
  getMedicalHistory,
  updateMedicalHistory,
  getRiskFactors,
  updateRiskFactors,
  getAllergies,
  updateAllergies,
};

export default profileServices;
