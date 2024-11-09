import React from "react";

export default function Button({
  children,
  bgColor = "bg-gray-500",
  textColor = "text-black",
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
