import React from "react";

const PostCategory = ({ children }) => {
  return (
    <span
      className={`bg-yellow-200 p-1 rounded-lg max-w-[100px] text-slate-900 text-sm font-medium  w-full text-center mb-2     `}
    >
      {children}
    </span>
  );
};

export default PostCategory;
