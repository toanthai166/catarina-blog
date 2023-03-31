import React from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../loading";

const Button = ({
  className = "",
  type = "button",
  children,
  onClick = () => {},
  to,
  disabled = false,
  isLoading = false,
  ...props
}) => {
  // const {} = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <>
        <Link to={to}>
          <button
            type={type}
            {...props}
            className={`px-6 py-3 rounded-xl border border-yellow-500 font-medium text-lg  block mx-auto  w-full text-yellow-700 ${className}`}
          >
            {child}
          </button>
        </Link>
      </>
    );
  }
  return (
    <>
      <button
        type={type}
        {...props}
        onClick={onClick}
        className={`px-6 py-3 rounded-xl  border-yellow-500 font-medium text-lg border   block mx-auto  w-full text-yellow-700 ${className}`}
      >
        {child}
      </button>
    </>
  );
};

export default Button;
