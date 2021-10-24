import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./global-styles";
import { BrowserRouter } from "react-router-dom";
import FirebaseProvider from "./context/firebase";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
