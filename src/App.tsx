//* import library
import React from "react"
import { Route, Routes } from "react-router-dom"

//* import css
import "./App.css"

//* import components
import PageAfter from "./components/PageAfterLogin/PageAfter"
import HomeAfter from "./components/PageAfterLogin/HomeAfter"

//* import components before login
import Login from "./components/Login"
import Register from "./components/Register"
import SendEmail from "./components/SendEmail"
import UpdatePassword from "./components/UpdatePassword"
import PageBefore from "./components/PagebeforeLogin/PageBefore"
import HomeBefore from "./components/PagebeforeLogin/HomeBefore"

type Temp = {
  name:string
}
const Tmp = ({name}:Temp) => {
  return (
    <div>
      {name}
    </div>
  )
}


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<PageBefore/>}>
          <Route index element={<HomeBefore/>}/>
          <Route path="home" element={<HomeBefore/>}/>
          <Route path="about" element={<Tmp name={"about"}/>}/>
          <Route path="recommend" element={<Tmp name={"recommend"}/>}/>
          <Route path="party" element={<Tmp name={"party"}/>}/>
          <Route path="map" element={<Tmp name={"map"}/>}/>
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="email" element={<SendEmail/>} />
        <Route path="update" element={<UpdatePassword/>} />
        
        <Route path="page" element={<PageAfter />}>
          <Route index element={<HomeAfter/>}/>
          <Route index path="home" element={<HomeAfter/>}/>
        </Route>
        
      </Routes>
    </React.Fragment>
  );
}

export default App;
