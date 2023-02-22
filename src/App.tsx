// import library
import { useState } from "react"
import { Route, Routes } from "react-router-dom"

// import css
import "./App.css"

// import components after login
import PageAfter from "./components/PageAfterLogin/PageAfter"
import HomeAfter from "./components/PageAfterLogin/HomeAfter"
import AboutAfter from "./components/PageAfterLogin/AboutAfter"
import RecommendAfter from "./components/PageAfterLogin/RecommendAfter"
import MapAfter from "./components/PageAfterLogin/MapAfter"
import PartyAfter from "./components/PageAfterLogin/PartyAfter"

import Profile from "./components/Profile"

// import components general
import Login from "./components/Login"
import Register from "./components/Register"
import Email from "./components/Email"
import ResetPassword from "./components/ResetPassword"

// import components before login
import PageBefore from "./components/PagebeforeLogin/PageBefore"
import HomeBefore from "./components/PagebeforeLogin/HomeBefore"
import AboutBefore from "./components/PagebeforeLogin/AboutBefore"
import RecommendBefore from "./components/PagebeforeLogin/RecommendBefore"
import MapBefore from "./components/PagebeforeLogin/MapBefore"
import PartyBefore from "./components/PagebeforeLogin/PartyBefore"

// import context store
import { Store } from "./context/store"

function App() {
	// ตัวแปรแสดงชื่อเล่นบน navbar
	const [displayName , setDisplayName] = useState<string>("")

	return (
		<Store.Provider value={{displayName,setDisplayName}}>
			<Routes>
				{/* ส่วนหน้าที่ยังไม่ได้ login */}
				<Route path="/" element={<PageBefore/>}>
					<Route index element={<HomeBefore/>}/>
					<Route path="home" element={<HomeBefore/>}/>
					<Route path="about" element={<AboutBefore/>}/>
					<Route path="recommend" element={<RecommendBefore/>}/>
					<Route path="party" element={<MapBefore/>}/>
					<Route path="map" element={<PartyBefore/>}/>
				</Route>
				
				{/* general */}
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="email" element={<Email/>} />
				<Route path="resetPassword" element={<ResetPassword/>} />
				<Route path="profile" element={<Profile/>}/>
				
				{/* ส่วนหน้าที่ login แล้ว */}
				<Route path="page" element={<PageAfter />}>
					<Route index element={<HomeAfter/>}/>
					<Route path="home" element={<HomeAfter/>}/>
					<Route path="about" element={<AboutAfter/>}/>
					<Route path="recommend" element={<RecommendAfter/>}/>
					<Route path="party" element={<PartyAfter/>}/>
					<Route path="map" element={<MapAfter/>} />
				</Route>
			</Routes>
		</Store.Provider>
	)
}

export default App;
