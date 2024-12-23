import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <div>
        <header className="w-full px-2 py-2 flex justify-between items-center bg-black text-white border-b border-gray-700">
          <div className="flex items-center gap-2">
            <img
              src={logo} // Replace with your logo URL
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-xl font-bold">TechBytesGaming</h1>
          </div>
          <div className="  p-2 flex   gap-6">
            <NavLink className=" hover:underline" to="/">Home</NavLink>
            <NavLink className=" hover:underline" to="/Pastes">Pastes</NavLink>
          </div>
          
        </header>
      </div>
    </>
  );
};

export default Navbar;



