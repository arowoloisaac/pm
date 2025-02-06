import { IProfile } from "@/app/Project/utils/utils";
import { Token } from "@/components/Storage/Storage";
import Axios from "axios";

const viewProfile = async (): Promise<IProfile | null> => {
  try {
    const response = await Axios.get("https://localhost:7120/api/profile", {
      headers: { Authorization: `Bearer ${Token}` },
    });
    return response.data;
  } catch (err: any) {
    console.error("Error fetching profile:", err.message || err);
    return null;
  }
};

export { viewProfile };
