import { NavLink } from "react-router-dom";

// constants
import { LinkThaiContent } from "../../../data/LinkEntries";

// types
import { MenuHorizontalPublicProps } from "../types/MenuHorizontalPublicTypes";

const MenuHorizontalPublic = ({ path, index }: MenuHorizontalPublicProps) => {
  return (
    <NavLink
      to={`/${path.toLowerCase()}`}
      className={({ isActive }) =>
        isActive ? "activeclassName" : "notActiveclassName"
      }
    >
      {LinkThaiContent[index]}
    </NavLink>
  );
};

export default MenuHorizontalPublic;
