import React from "react";
import { NavLink } from "react-router-dom";

// types
import { ScopeProfileProps } from "../types/ScopeProfileTypes";

export default function ScopeProfile({ LogoutButton }: ScopeProfileProps) {
  return (
    <React.Fragment>
      <div className="absolute top-20 -right-2 w-44 h-24 bg-gray-100 rounded-lg drop-shadow-xl z-50">
        <ul className="h-full p-2 flex flex-col justify-center">
          <li className="flex items-center pl-2 rounded-md flex-grow cursor-pointer hover:bg-gray-200 z-20">
            <NavLink to="/page/profile" className="w-full">
              โปรไฟล์ผู้ใช้งาน
            </NavLink>
          </li>
          <li
            className="flex items-center pl-2 rounded-md flex-grow cursor-pointer hover:bg-gray-200 z-20"
            onClick={LogoutButton}
          >
            ออกจากระบบ
          </li>
        </ul>
        <div className="absolute w-9 h-9 bg-slate-100 rotate-45 -top-2 right-7 z-10"></div>
      </div>
    </React.Fragment>
  );
}
