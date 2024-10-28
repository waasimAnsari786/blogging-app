import React, { forwardRef, useId } from "react";
import { AiOutlineMail } from "react-icons/ai";

const Input = forwardRef(
  ({ type = "text", inpClass = "", label, ...props }, ref) => {
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
          <AiOutlineMail />
        </div>
      </div>
    );
  }
);

export default Input;
