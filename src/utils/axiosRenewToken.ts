import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = import.meta.env.VITE_URL_BACKEND;
export const axiosRenewToken = (
  url: string,
  method: "get" | "post" | "patch" | "put" | "delete",
  attachBody: any,
  attachToken: boolean
) => {
  const cookies = new Cookies();
  const token = cookies.get("refreshToken");
  const formatToken = "Bearer " + token;
  const formatURL = baseURL + url;

  return axios({
    url: formatURL,
    method: method,
    data: attachBody ? attachBody : undefined,
    headers: {
      "content-type": "application/json",
      Authorization: attachToken ? formatToken : undefined,
    },
    timeout: 30000,
  });
};
