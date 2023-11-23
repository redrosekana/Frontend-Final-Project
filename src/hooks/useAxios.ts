import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = import.meta.env.VITE_URL_BACKEND;

const useAxios = async (
  path: string,
  method: "get" | "post" | "patch" | "put" | "delete",
  attachBody: any,
  attachToken: boolean
) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");
    const formatToken = "Bearer " + token;

    return await axios({
      url: `${baseURL}${path}`,
      method: method,
      data: attachBody ? attachBody : undefined,
      headers: {
        "content-type": "application/json",
        Authorization: attachToken ? formatToken : undefined,
      },
      timeout: 30000,
    });
  } catch (error) {
    throw error;
  }
};

export default useAxios;
