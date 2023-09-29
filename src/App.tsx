// import library
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// import css
import "./App.css";

// import components after login
import HomeProtect from "./pages/protectRoutes/home";
import AboutProtect from "./pages/protectRoutes/about";
import RecommendProtect from "./pages/protectRoutes/recommend";
import MapAfter from "./pages/protectRoutes/map";
import PartyProtect from "./pages/protectRoutes/party";
import Profile from "./pages/protectRoutes/profile";

// import components general
import Login from "./pages/publicRoutes/login";
import Register from "./pages/publicRoutes/register";
import Email from "./pages/publicRoutes/email";
import ResetPassword from "./pages/publicRoutes/reset-password";

// import components before login
import HomePublic from "./pages/publicRoutes/home";
import RecommendPublic from "./pages/publicRoutes/recommend";
import MainPublic from "./pages/publicRoutes/Main";

import AlertMessage from "./pages/publicRoutes/AlertMessage";
import MainProtect from "./pages/protectRoutes/Main";

function App() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<MainPublic />}>
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

        {/* general */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="email" element={<Email />} />
        <Route path="resetPassword" element={<ResetPassword />} />

        {/* authentication that must protect */}
        <Route path="page" element={<MainProtect />}>
          <Route index element={<HomeProtect />} />
          <Route path="home" element={<HomeProtect />} />
          <Route path="about" element={<AboutProtect />} />
          <Route path="recommend" element={<RecommendProtect />} />
          <Route path="party" element={<PartyProtect />} />
          <Route path="map" element={<MapAfter />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
