import React, { useId } from "react";

export default function Select({ options = [], label, ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="flex justify-between">
        <select id={id}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
