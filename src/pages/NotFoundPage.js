import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/button";
import { Logo } from "../components/logo";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <NavLink to={"/"}>
        <Logo className=""></Logo>
      </NavLink>
      <span className=" text-5xl text-yellow-500 font-bold my-20">
        Oops! Page not found
      </span>
      <NavLink
        to={"/"}
        className="border text-lg font-medium bg-slate-100 border-yellow-500 rounded-lg py-3 px-6"
      >
        Back to home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
