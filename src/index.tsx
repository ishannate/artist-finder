import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { APIContext } from "./context/APIContext";

const API_URL = "https://ws.audioscrobbler.com";
const API_KEY = "d732731be2f5f0ec4b10e5a3607d7090";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <APIContext.Provider value={{ apiUrl: API_URL, apiKey: API_KEY }}>
      <Provider store={configureStore}>
        <App />
      </Provider>
    </APIContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
