import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// The Provider component is used to wrap the entire application and pass the Redux store as a prop, so that all components in the application can access the Redux state.
// browserrouter->iska kaam hai sabko routing funtionaliity provide karwana bcz aftre deploy the project is not working properly