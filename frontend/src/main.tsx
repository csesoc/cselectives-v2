import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./logic/redux/store";
import "./index.css";
import { makeServer } from "./stubbing/server";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!import.meta.env.PROD) {
  console.log("running stub");
  makeServer({ environment: "dev" });
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
