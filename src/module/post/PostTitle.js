import React from "react";
import { NavLink } from "react-router-dom";

const PostTitle = ({ small, popular, className, children, to }) => {
  if (!to)
    return (
      <span
        className={
          small
            ? "font-medium text-start mb-2 hover:text-yellow-500 hover:underline"
            : `text-xl font-bold mb-2 text-black hover:text-yellow-500 hover:underline`
        }
      >
        {children}
      </span>
    );
  return (
    <a href={to}>
      <span
        className={
          small
            ? `text-sm font-bold  mb-2 hover:text-yellow-500 hover:underline ${className} `
            : `text-xl font-bold mb-2 text-black hover:text-yellow-500 hover:underline`
        }
      >
        {children}
      </span>
    </a>
  );
};

export default PostTitle;
