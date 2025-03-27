import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import NavigationBar from "./components/Navbar";
import ParkingStatus from "./pages/ParkingStatus"; 

function App() {
  return (
    <>
    <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/status" element={<ParkingStatus />} />
      </Routes>
    </>
  );
}

export default App;
