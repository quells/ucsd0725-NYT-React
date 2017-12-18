import React from "react";

export const FormButton = props => {
  let cn = "btn";
  if (props.addclasses) cn += " " + props.addclasses;
  return (
    <div className="form-group">
      <button className={cn} {...props} />
    </div>
  )
}
