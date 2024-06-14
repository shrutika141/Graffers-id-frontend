import axios from "axios";
import { ADD_COMPANY, BASE_URL, GET_COMPANY } from "../constants/url.ts";

export const UseAddCompany = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}${ADD_COMPANY}`, data);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const UseGetCompany = async (search?: any) => {
  try {
      const response = await axios.get(`${BASE_URL}${GET_COMPANY}`, {
        params: search // Pass id as a query parameter
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}