import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GramaNilHome from "./pages/GramaNilHome";
import { AuthPage } from "./Auth/AuthPage";
import HelpForm from "./components/HelpForm";
import { AuthProvider } from "@asgardeo/auth-react";
import configdata from "./config.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
const config = {
  baseUrl: configdata.baseUrl,
  clientID: configdata.clientID,
  scope: configdata.scope,
  signInRedirectURL: configdata.signInRedirectURL,
  signOutRedirectURL: configdata.signOutRedirectURL,
};

root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      {/* <App /> */}
      <GramaNilHome />
      {/* <AuthPage /> */}
      {/* <HelpForm /> */}
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
