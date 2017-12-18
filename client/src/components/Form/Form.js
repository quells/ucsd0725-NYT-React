import React from "react";

export const Form = ({inline, children}) => {
  return (
    <form className={inline ? "form-inline" : ""}>
      {children}
    </form>
  )
};
