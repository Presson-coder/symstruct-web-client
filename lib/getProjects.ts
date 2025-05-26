import { BACKEND_URL } from "@/constants/connection";
import axios from "axios";

export async function getProjects() {
  try {
    const response = await axios.get(`${BACKEND_URL}projects`);
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}
