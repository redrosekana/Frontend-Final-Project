import { Routes, Route } from "react-router-dom";

import PublicRoute from "./pages/PublicRoutes/PublicRoutes";
import HomePublic from "./pages/PublicRoutes/Home/Home";
import RecommendPublic from "./pages/PublicRoutes/Recommend/Recommend";
import AlertMessage from "./pages/PublicRoutes/components/AlertMessage";

import ProtectRoute from "./pages/ProtectRoutes/ProtectRoute";
import HomeProtect from "./pages/ProtectRoutes/Home/Home";
import AboutProtect from "./pages/ProtectRoutes/About/About";
import RecommendProtect from "./pages/ProtectRoutes/Recommend/Recommend";
import Recommend1 from "./pages/ProtectRoutes/Recommend/RecommendOne";
import Recommend2 from "./pages/ProtectRoutes/Recommend/RecommendTwo";
import Recommend3 from "./pages/ProtectRoutes/Recommend/RecommendThree";
import PartyProtect from "./pages/ProtectRoutes/Party/Party";
import MapProtect from "./pages/ProtectRoutes/Map/Map";
import Profile from "./pages/ProtectRoutes/Profile/Profile";

import Login from "./pages/PublicRoutes/Login/Login";
import Register from "./pages/PublicRoutes/Register/Register";
import Email from "./pages/PublicRoutes/Email/Email";
import ResetPassword from "./pages/PublicRoutes/ResetPassword/ResetPassword";

function Router() {
  return (
    <Routes>
      {/* unauthentication routes */}
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<HomePublic />} />
        <Route path="home" element={<HomePublic />} />
        <Route path="about" element={<AboutProtect />} />
        <Route path="recommend" element={<RecommendPublic />} />
        <Route
          path="party"
          element={
            <AlertMessage
              title="แจ้งให้ทราบ"
              text="ต้องการทำการสมัครสมาชิกและเข้าสู่ระบบก่อน"
              icon="warning"
              color="#ec9e18"
            />
          }
        />
        <Route
          path="map"
          element={
            <AlertMessage
              title="แจ้งให้ทราบ"
              text="ต้องการทำการสมัครสมาชิกและเข้าสู่ระบบก่อน"
              icon="warning"
              color="#ec9e18"
            />
          }
        />
      </Route>

      {/* general public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="email" element={<Email />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* authentication routes */}
      <Route path="page" element={<ProtectRoute />}>
        <Route index element={<HomeProtect />} />
        <Route path="home" element={<HomeProtect />} />
        <Route path="about" element={<AboutProtect />} />

        <Route path="recommend" element={<RecommendProtect />}>
          <Route index element={<Recommend1 />} />
          <Route path="1" element={<Recommend1 />} />
          <Route path="2" element={<Recommend2 />} />
          <Route path="3" element={<Recommend3 />} />
        </Route>

        <Route path="party" element={<PartyProtect />} />
        <Route path="map" element={<MapProtect />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default Router;
