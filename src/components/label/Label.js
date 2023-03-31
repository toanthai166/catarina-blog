import React from "react";

const Label = ({ children, htmlFor = "", className = "", ...props }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`p-3 font-medium cursor-pointer text-xl ${className}`}
      >
        {children}
      </label>
    </>
  );
};

export default Label;
