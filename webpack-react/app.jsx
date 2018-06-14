import * as React from "react";
import * as ReactDOM from "react-dom";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.compact.css";

import Overview from "./tree-list-overview";

ReactDOM.render(
  <div>
    <Overview />
  </div>,
  document.getElementById("app")
);
