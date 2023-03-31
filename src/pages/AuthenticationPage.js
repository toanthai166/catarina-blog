import React from "react";
import { Button } from "../components/button";
import { Logo } from "../components/logo";

const AuthenticationPage = ({ children }) => {
  return (
    <div className="flex container items-center justify-center flex-col">
      <Logo className="mx-auto py-10"></Logo>
      {children}
      <div className=" border relative border-slate-300 h-0 w-full m-10 ">
        <span className="absolute left-[50%] top-[50%] -translate-y-[50%]  -translate-x-[50%] p-5 bg-white">
          or
        </span>
      </div>
      <div className="flex items-center justify-start mb-10 h-[40px] gap-x-10  w-[800px]">
        <Button className="w-[350px] text-sm   bg-[#4285f4] relative">
          <span className=" absolute h-5 w-5 left-[25%] -translate-x-[100%]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </span>
          <span className="text-black hover:text-yellow-500">
            Sign in with Google
          </span>
        </Button>
        <Button className="w-[350px] text-sm   bg-[#1e5ec5] relative">
          <span className="absolute h-5 w-5 left-[25%] -translate-x-[100%]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
            </svg>
          </span>
          <span className="text-black hover:text-yellow-500">
            Log in with Facebook
          </span>
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationPage;
