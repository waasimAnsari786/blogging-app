import React, { forwardRef, useId } from "react";

const Select = ({ options = [], label, ...props }, ref) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="flex justify-between">
        <select id={id} ref={ref}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default forwardRef(Select);
