import React from "react";

function Button({ label }) {
  return (
    <div
      data-testid="button"
      style={{
        width: "30%",
        height: "20px",
        backgroundColor: "red",
      }}
    >
      {" "}
      {label}
      {" "}
    </div>
  );
}

export default Button;
