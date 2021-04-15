import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Store } from "./store/store";
import  { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <Router> 
        <App />
      </Router>
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
