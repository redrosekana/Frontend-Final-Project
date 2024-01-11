import Cookies from "universal-cookie";

// utils
import useAxiosRenewToken from "../hooks/useAxiosRenewToken";

async function renewToken() {
  const cookies = new Cookies();

  try {
    const result = await useAxiosRenewToken(
      "/auth/new-token",
      "get",
      false,
      true
    );

    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.set("accessToken", result.data.accessToken);
    cookies.set("refreshToken", result.data.refreshToken);
  } catch (error) {
    console.log(error);
  }
}

export default renewToken;
