import React, { useState } from "react";
import { DropdownProvider } from "./dropdown-context";
import Select from "./Select";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
