import { BACKEND_URL } from "@/constants/connection";
import axios from "axios";

export async function getProjects({ category }: { category?: string } = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}projects`, {
      params: {
        category: category ?? undefined,
      },
    });
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export const getProjectsByServiceProvider = async ({ id }: { id: string }) => {
  console.log("service provider id ::: ", id);
  try {
    const response = await axios.get(
      `${BACKEND_URL}projects/service-provider/${id}`
    );
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects by service provider:", error);
  }
};
