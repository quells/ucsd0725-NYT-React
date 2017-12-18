import React from "react";

export const Col = ({size, addclasses, children}) => {
  let cn = "col";
  if (size) cn += " " + size.split(" ").map(s => "col-" + s).join(" ");
  if (addclasses) cn += " " + addclasses;
  return (
    <div className={cn}>
      {children}
    </div>
  );
};
