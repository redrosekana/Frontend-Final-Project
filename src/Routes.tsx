import { Routes, Route } from "react-router-dom";

import PublicRoute from "./pages/PublicRoutes/PublicRoutes";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

import RecommendPublic from "./pages/PublicRoutes/Recommend/Recommend";
import AlertMessage from "./pages/PublicRoutes/components/AlertMessage";
import ProtectRoute from "./pages/ProtectRoutes/ProtectRoute";

import RecommendProtect from "./pages/ProtectRoutes/Recommend/Recommend";
import RecommendStepOne from "./pages/ProtectRoutes/Recommend/RecommendStepOne";
import RecommendStepTwo from "./pages/ProtectRoutes/Recommend/RecommendStepTwo";
import RecommendStepThree from "./pages/ProtectRoutes/Recommend/RecommendStepThree";
import PartyProtect from "./pages/ProtectRoutes/Party/Party";
import MapProtect from "./pages/ProtectRoutes/Map/Map";
import Profile from "./pages/ProtectRoutes/Profile/Profile";
import BoardgameRatingOnly from "./pages/ProtectRoutes/BoardgameRatingOnly/BoardgameRatingOnly";

import Login from "./pages/PublicRoutes/Login/Login";
import Register from "./pages/PublicRoutes/Register/Register";
import Email from "./pages/PublicRoutes/Email/Email";
import ResetPassword from "./pages/PublicRoutes/ResetPassword/ResetPassword";

function Router() {
  return (
    <Routes>
      {/* unauthentication routes */}
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
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
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="recommend" element={<RecommendProtect />}>
          <Route index element={<RecommendStepOne />} />
          <Route path="1" element={<RecommendStepOne />} />
          <Route path="2" element={<RecommendStepTwo />} />
          <Route path="3" element={<RecommendStepThree />} />
        </Route>

        <Route path="party" element={<PartyProtect />} />
        <Route path="map" element={<MapProtect />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rating-game-only" element={<BoardgameRatingOnly />} />
      </Route>
    </Routes>
  );
}

export default Router;
