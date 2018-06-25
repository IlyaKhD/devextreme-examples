import * as React from "react";
import * as ReactDOM from "react-dom";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.compact.css";

import Overview from "./maps-overview";

ReactDOM.render(
  <div>
    <Overview />
  </div>,
  document.getElementById("app")
);
