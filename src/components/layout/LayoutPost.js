import React, { Fragment } from "react";
import Information from "../../module/home/Information";

const LayoutPost = ({ children, className = "" }) => {
  return (
    <Fragment>
      <div className={`container flex gap-3 ${className} `}>
        <div className="w-[70%] p-10">{children}</div>
        <Information></Information>
      </div>
    </Fragment>
  );
};

export default LayoutPost;
