import React from "react";

export default function Button({
  children,
  bgColor = "bg-customPurple",
  textColor = "text-white",
  padding = "",
  myClass = "",
  ...props
}) {
  return (
    <button
      className={`${bgColor} ${textColor} ${myClass} px-2 py-1 rounded-lg ${padding}`}
      {...props}
    >
      {children}
    </button>
  );
}
