import { NavLink } from "react-router-dom";

// constants
import { LinkThaiContent, LinkIcon } from "../../../data/LinkEntries";

// components
import { MenuVerticalPublicProps } from "../types/MenuVerticalPublicTypes";

const MenuVerticalPublic = ({
  path,
  index,
  onclick,
}: MenuVerticalPublicProps) => {
  return (
    <li
      onClick={onclick}
      className="w-full text-xl my-2 text-gray-700 font-medium rounded-lg px-1 py-1.5 hover:bg-gray-100 duration-100 transition-colors"
    >
      <NavLink
        to={`/${path.toLowerCase()}`}
        className="flex items-center ml-4 w-full h-full"
      >
        <i className={`fa-solid ${LinkIcon[index]} mr-4`}></i>
        {LinkThaiContent[index]}
      </NavLink>
    </li>
  );
};

export default MenuVerticalPublic;
