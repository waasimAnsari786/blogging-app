import React from "react";

export default function Button({
  children,
  bgColor = "bg-gray=500",
  textColor = "text-black",
  myClass = "",
  ...props
}) {
  return (
    <button
      className={`${bgColor} ${textColor} ${myClass} p-2 rounded-lg`}
      {...props}
    >
      {children}
    </button>
  );
}
