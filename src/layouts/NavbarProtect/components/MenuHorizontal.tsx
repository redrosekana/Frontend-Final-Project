import { NavLink } from "react-router-dom";

// types
import { MenuHorizontalProps } from "../types/MenuHorizontalProtectTypes";

const MenuHorizontalProtect = ({ path, name }: MenuHorizontalProps) => {
  return (
    <NavLink
      to={`/page/${path.toLowerCase()}`}
      className={({ isActive }) =>
        isActive ? "activeclassName" : "notActiveclassName"
      }
    >
      {name}
    </NavLink>
  );
};

export default MenuHorizontalProtect;
