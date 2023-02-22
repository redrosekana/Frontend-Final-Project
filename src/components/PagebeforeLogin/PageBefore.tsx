// import library
import { Outlet } from "react-router"

// import layouts
import NavbarBefore from "./NavbarBefore"

function PageBefore() {
   return (
      <main>
         <NavbarBefore />
         <Outlet/>
      </main>
   )
}

export default PageBefore
