import axios from "axios";
import Cookies from "universal-cookie";

const backendUrl = import.meta.env.VITE_URL_BACKEND;

const useAxiosRenewToken = (
  path: string,
  method: "get" | "post" | "patch" | "put" | "delete",
  attachBody: any,
  attachToken: boolean
) => {
  const cookies = new Cookies();
  const token = cookies.get("refreshToken");
  const formatToken = "Bearer " + token;
  const formatURL = backendUrl + path;

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

export default useAxiosRenewToken;
