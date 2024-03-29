import { useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// utils
import { createSwal } from "../../../utils/createSwal";

// types
import { AlertMessageProps } from "../types/AlertMessageTypes";

function AlertMessage({ title, text, icon, color }: AlertMessageProps) {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    createSwal(title, text, icon, color).then(() => {
      navigate("/home");
    });
  }, []);

  return (
    <main className="bg-gray-100 fixed top-0 left-0 right-0 bottom-0"></main>
  );
}

export default AlertMessage;
