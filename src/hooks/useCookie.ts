import { useState } from "react";
import Cookies from "universal-cookie";

const useCookie = (
  key: string,
  value: string | null
): [string | null, (newValue: string | null) => void] => {
  const cookies = new Cookies();

  // get original value
  const storeValue = cookies.get(key);
  const initialValue = storeValue ? storeValue : value;

  // set original value
  const [cookie, setCookie] = useState<string | null>(initialValue);

  // function for change value
  const onSetCookie = (newValue: string | null) => {
    cookies.set(key, newValue);
    setCookie(newValue);
  };

  return [cookie, onSetCookie];
};

export default useCookie;
