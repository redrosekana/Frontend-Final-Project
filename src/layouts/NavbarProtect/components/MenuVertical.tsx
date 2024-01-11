import { NavLink } from "react-router-dom";

// types
import { MenuVerticalProps } from "../types/MenuVerticalProtectTypes";

const MenuVertical = ({ path, name, icon, onclick }: MenuVerticalProps) => {
  return (
    <li
      onClick={onclick}
      className="w-full text-xl my-2 text-gray-700 font-medium rounded-lg px-1 py-1.5 hover:bg-gray-100 duration-100 transition-colors"
    >
      <NavLink
        to={`/page/${path.toLowerCase()}`}
        className="flex items-center ml-4 w-full h-full"
      >
        <i className={`fa-solid ${icon} mr-4`}></i>
        {name}
      </NavLink>
    </li>
  );
};

export default MenuVertical;
