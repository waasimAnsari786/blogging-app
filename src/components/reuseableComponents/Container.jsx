import React from "react";

export default function Container({
  parentElemClass = "",
  childElemClass = "",
  children,
}) {
  return (
    <div className={parentElemClass}>
      <div className={`${childElemClass} container mx-auto`}>{children}</div>
    </div>
  );
}
