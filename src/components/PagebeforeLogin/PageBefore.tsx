//* import layouts
import NavbarBefore from "./NavbarBefore";
import { Outlet } from "react-router";

export default function PageBefore() {
  return (
    <div className="relative">
      <NavbarBefore />
      <Outlet/>
    </div>
  );
}
