import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";

const app = document.getElementById( "root" );
ReactDOM.hydrate( <App />, app );
