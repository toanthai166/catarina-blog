import React from "react";
import PropsTypes from "prop-types";
const Toggle = (props) => {
  const { on, onClick, ...rest } = props;
  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onChange={() => {}}
        onClick={onClick}
        className="h-[0px]"
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-green-500" : " bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[34px] h-[34px] rounded-full bg-white inline-block ${
            on ? " translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toggle.propsTypes = {
  on: PropsTypes.bool,
  onClick: PropsTypes.func,
};

export default Toggle;
