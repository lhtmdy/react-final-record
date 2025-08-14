import React from "react";
import ReactDOM from "react-dom/client";
// import 'bootstrap/scss/bootstrap.scss';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import "./stylesheets/all.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { HashRouter } from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = token;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
      <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
