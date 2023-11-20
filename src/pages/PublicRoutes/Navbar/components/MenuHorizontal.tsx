import { NavLink } from "react-router-dom";

// constants
import { LinkThaiContent } from "../../../../data/LinkEntries";

// types
import { MenuHorizontalProps } from "../types/MenuHorizontal";

const MenuHorizontal = ({ path, index }: MenuHorizontalProps) => {
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

export default MenuHorizontal;
