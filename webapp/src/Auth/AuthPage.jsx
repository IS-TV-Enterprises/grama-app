import React from "react";
import { AuthProvider } from "@asgardeo/auth-react";
import { useAuthContext } from "@asgardeo/auth-react";
import configdata from "../config.json";

const config = {
  baseUrl: configdata.baseUrl,
  clientID: configdata.clientID,
  scope: configdata.scope,
  signInRedirectURL: configdata.signInRedirectURL,
  signOutRedirectURL: configdata.signOutRedirectURL,
};

const Appcontent = () => {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <div>
      {state.isAuthenticated ? (
        <div>
          <ul>
            <li>{state.username}</li>
          </ul>

          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
};

export const AuthPage = () => {
  return (
    <AuthProvider config={config}>
      <Appcontent />
    </AuthProvider>
  );
};
