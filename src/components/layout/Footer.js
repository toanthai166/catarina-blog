import React from "react";
import { iconFollow } from "../follow";
import FollowItem from "../follow/FollowItem";

const Footer = () => {
  return (
    <footer className="flex bg-slate-200 text-center justify-center gap-5  p-5 mb-10 mt-20">
      {iconFollow.slice(0, 4).map((item) => (
        <div
          key={item.title}
          className=" flex w-full cursor-pointer justify-center max-w-[200px]  text-center border-none mb-0"
        >
          <FollowItem
            className=" hover:text-yellow-700 border-none  max-w-[120px]"
            data={item}
          ></FollowItem>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
