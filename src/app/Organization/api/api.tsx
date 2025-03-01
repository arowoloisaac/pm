import { Token } from "@/components/Storage/Storage";
import Axios from "axios"


const getOrganization = async () => {
  try {
    const response = await Axios.get(``, {
        headers: {
            Authorization: `Bearer ${Token}`
        }
    })

    return response
  } catch (error:any) {
    return error
  }
}

export { getOrganization };
