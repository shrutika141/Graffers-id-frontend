import axios from "axios";
import { ADD_REVIEW, BASE_URL, DETAIL_REVIEW } from "../constants/url.ts";

export const AddReviewCall = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}${ADD_REVIEW}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const detailReviewCall = async (id: any) => {
  try {
    const response = await axios.get(`${BASE_URL}${DETAIL_REVIEW}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}