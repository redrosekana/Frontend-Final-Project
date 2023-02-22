// import library
import { Outlet } from "react-router";

// import layouts
import NavbarAfter from "./NavbarAfter";

function PageAfter() {
	return (
		<div>
			<NavbarAfter />
			<Outlet/>
		</div>
	);
}

export default PageAfter
