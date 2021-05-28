import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { storeRedux } from "./store/storeRedux";
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeRedux}>
      <Store>
        <Router>
          <App />
        </Router>
      </Store>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
