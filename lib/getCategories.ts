import { BACKEND_URL } from "@/constants/connection";
import axios from "axios";

export async function getCategories() {
  try {
    const response = await axios.get(`${BACKEND_URL}categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
