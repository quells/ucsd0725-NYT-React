import React from "react";

export const TextArea = props => {
  let cn = "form-group";
  if (props.addclasses) cn += " " + props.addclasses;
  return (
    <div className={cn}>
      <textarea className={"form-control" + (props.angry === "true" ? " is-invalid" : "")} {...props} />
    </div>
  );
}
