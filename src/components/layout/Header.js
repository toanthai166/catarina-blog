import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import React, { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { auth } from "../../firebase/firebase-config";
import { Button } from "../button";
import { Logo } from "../logo";
const headerList = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleSearchPost = () => {
    const inputSearch = inputRef.current.value;
    if (inputSearch === "") return null;
    navigate(`/search/${inputSearch}`);
  };
  const { userInfo } = useAuth();
  const handleSignout = async () => {
    try {
      await signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          toast.success("Signout successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    await signOut(userInfo);
  };
  return (
    <>
      <div className="flex w-full flex-col items-center  mt-5">
        <div className="flex justify-between w-full p-3 max-w-[1280px] border-b-2">
          <div className="header-menu flex gap-10  text-xl font-semibold">
            {headerList.map((item) => (
              <div key={item.title}>
                <Link to={item.url}> {item.title}</Link>
              </div>
            ))}
          </div>
          <div className="header-right flex justify-end gap-5 ">
            <div className=" relative w-full  max-w-[350px] h-full  ">
              <input
                type="text"
                ref={inputRef}
                className={`p-5 rounded-xl h-14 pr-10 border w-[350px] text-lg bg-slate-100 text-black  border-transparent transition-all border-gray-400  focus:border-yellow-500`}
                placeholder="Search post..."
              />
              <span className=" cursor-pointer p-3 z-10 absolute top-[50%] -translate-y-[50%] right-0">
                <button onClick={handleSearchPost} className="translate-y-1">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="7.66669"
                      cy="7.05161"
                      rx="6.66669"
                      ry="6.05161"
                      stroke="#999999"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            </div>
            {userInfo?.displayName ? (
              <div className="text-center flex gap-2 translate-y-3">
                <span>hi,</span>
                <span className=" text-yellow-600">{userInfo.displayName}</span>
                <a href="/" onClick={handleSignout} className="ml-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            ) : (
              <Button type="button" className=" bg-yellow-100" to={"/sign-in"}>
                Login
              </Button>
            )}
          </div>
        </div>
        <Logo className="py-10 "></Logo>
      </div>
    </>
  );
};

export default Header;
