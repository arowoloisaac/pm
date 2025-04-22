import { IProfile } from "@/components/Project/utils/utils";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";

const viewProfile = async (): Promise<IProfile | null> => {
  try {
    const response = await Axios.get(`${ApiUrl}/profile`, {
      headers: { Authorization: `Bearer ${Token}` },
    });
    return response.data;
  } catch (err: any) {
    return err;
  }
};

export { viewProfile };
