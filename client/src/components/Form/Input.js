import React from "react";

export const Input = props => {
  let cn = "form-group";
  if (props.addclasses) cn += " " + props.addclasses;
  return (
    <div className={cn}>
      <input className="form-control" {...props} />
    </div>
  );
}
