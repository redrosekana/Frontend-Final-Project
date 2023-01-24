//* import library
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useLocation , Location , useNavigate , NavigateFunction } from "react-router";

export default function GatewayFacebook() {
  const cookie = new Cookies();
  const navigate:NavigateFunction = useNavigate();
  const location:Location = useLocation();

  useEffect(() => {
      const url = new URLSearchParams(location.search)
      
      cookie.set("accessToken",url.get("accessToken"),{ path: "/" })
      cookie.set("refreshToken",url.get("refreshToken"),{ path: "/" })

      
      navigate("/page/home")
  },[])

      

  return <div>GatewayFacebook</div>;
}
