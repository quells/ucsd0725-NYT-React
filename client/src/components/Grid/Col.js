import React from "react";

export const Col = ({size, children}) => {
  let cn = "col";
  if (size) cn += " " + size.split(" ").map(s => "col-" + s).join(" ");
  return (
    <div className={cn}>
      {children}
    </div>
  );
};
