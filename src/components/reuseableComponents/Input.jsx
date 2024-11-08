import React, { forwardRef, useId } from "react";
import { toast } from "react-toastify";

const Input = forwardRef(
  (
    { type = "text", inpClass = "", label, icon = "", error, ...props },
    ref
  ) => {
    const id = useId();
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <div className="flex justify-between">
          <input
            type={type}
            className={`w-2/3 text-black ${inpClass}`}
            {...props}
            id={id}
            ref={ref}
          />
          {icon}
        </div>
        {error && toast.error(error)}
      </div>
    );
  }
);

export default Input;
