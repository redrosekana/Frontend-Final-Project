//* import library
import React from "react";
import { Route, Routes } from "react-router-dom";

//* import components
import Login from "./components/Login";
import Register from "./components/Register";
import Page from "./components/Page";
import Home from "./components/Home";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="page" element={<Page />}>
          <Route index />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
