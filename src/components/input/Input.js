import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  placeholder = "",
  type = "text",
  className = "",
  name = "",
  children,
  control,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        type={type}
        {...field}
        id={name}
        className={`p-5 rounded-xl h-14 border w-[450px] text-lg bg-slate-100 text-black  border-transparent transition-all border-gray-400 ${className} focus:border-yellow-500`}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

export default Input;
