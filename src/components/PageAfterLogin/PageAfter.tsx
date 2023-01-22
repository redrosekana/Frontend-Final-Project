//* import library
import { Outlet } from "react-router";

//* import layouts
import NavbarAfter from "./NavbarAfter";

export default function PageAfter() {
  return (
    <div className="relative">
      <NavbarAfter />
      <Outlet/>
    </div>
  );
}
