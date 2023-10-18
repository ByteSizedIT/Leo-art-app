"use client";

// https://vercel.com/guides/react-context-state-management-nextjs#using-context-in-client-components

import { createContext, useEffect, useReducer } from "react";

import { Dispatch } from "react";

import { firebaseAuth } from "@/firebase/firebase-config";

import { User } from "firebase/auth";

// Define a custom interface that extends the Firebase User interface to include addition of isAdmin made in useLogin
interface CustomUser extends User {
  isAdmin?: boolean;
}

interface AuthState {
  user: CustomUser | null;
  authIsReady: boolean;
}

interface Action {
  type: string;
  payload: CustomUser | null;
}

const initialAuthState: AuthState = { user: null, authIsReady: false };

export const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: Dispatch<Action>;
}>({
  authState: initialAuthState,
  authDispatch: () => {},
});

export function authReducer(prevState: AuthState, action: Action) {
  switch (action.type) {
    case "AUTH_IS_READY":
      return { ...prevState, user: action.payload, authIsReady: true };
    case "LOG_IN":
      return { ...prevState, user: action.payload };
    case "LOG_OUT":
      return { ...prevState, user: action.payload };
    default:
      return prevState;
  }
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  console.log("AuthContext state: ", authState);

  // Use Effect to overcome all components & AuthContext being recreated on browser refresh, and therefore user still logged on firebase not being reflected in local state as authState only gets otherwise updated by signUp, loginIn and logOut methods
  useEffect(() => {
    // onAuthStateChange observer - Effectively sets listener that fires cback function to dispatch every time there is a user state change on firebase. H/e it returns an unsubscribe function that can be invoked immediately after the first time it fires so that it only happens once on mount
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (userSessionCookie) => {
        console.log({ userSessionCookie });
        // parent callback made async to await token check and add isAdmin to payload/authState
        const tokenResult = await userSessionCookie?.getIdTokenResult();
        let isAdmin = false;
        if (tokenResult) isAdmin = !!tokenResult.claims.admin;

        authDispatch({
          type: "AUTH_IS_READY",
          payload: userSessionCookie ? { ...userSessionCookie, isAdmin } : null,
        });
        unsubscribe();
      }
    );
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
