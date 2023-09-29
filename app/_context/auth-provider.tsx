"use client";

import { createContext, useReducer } from "react";

// https://vercel.com/guides/react-context-state-management-nextjs#using-context-in-client-components

export const AuthContext = createContext({});

interface AuthState {
  user: {} | null;
}

interface Action {
  type: string;
}

export function authReducer(prevState: AuthState, action: Action) {
  switch (action.type) {
    default:
      return prevState;
  }
}

const initialAuthState = { user: null };

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ ...authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
