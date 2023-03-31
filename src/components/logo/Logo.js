import React from "react";
import { NavLink } from "react-router-dom";

const Logo = ({ className = "" }) => {
  return (
    <NavLink
      to={"/"}
      className={`  w-full max-w-[200px] flex justify-center  ${className}`}
    >
      <img
        src="../logo.png"
        alt="logo"
        className="w-full h-full object-cover"
      />
    </NavLink>
  );
};

export default Logo;
