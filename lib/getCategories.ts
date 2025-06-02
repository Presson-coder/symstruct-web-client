import { BACKEND_URL } from "@/constants/connection";
import axiosInstance from "@/utils/axiosInstance";

export async function getCategories() {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
