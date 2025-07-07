import React from "react";
import ReactDOM from "react-dom";
import LuaSandboxApp from "./LuaSandboxApp"; // 👈 this matches if it's in src/

ReactDOM.render(
  <React.StrictMode>
    <LuaSandboxApp />
  </React.StrictMode>,
  document.getElementById("root")
);
