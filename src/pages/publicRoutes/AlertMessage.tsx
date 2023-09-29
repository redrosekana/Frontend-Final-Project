// import librarys
import { useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// import utils
import { createSwal } from "../../utils/createSwal";

interface AlertMessageProps {
  title: string;
  text: string;
  icon: "error" | "success" | "question" | "success" | "warning";
  color: string;
}

function AlertMessage({ title, text, icon, color }: AlertMessageProps) {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    createSwal(
      "แจ้งให้ทราบ",
      "ต้องการทำการสมัครสมาชิกและเข้าสู่ระบบก่อน",
      "warning",
      "#ec9e18"
    ).then(() => {
      navigate("/home");
    });

    return () => {};
  }, []);

  return (
    <main className="bg-gray-100 fixed top-0 left-0 right-0 bottom-0"></main>
  );
}

export default AlertMessage;
