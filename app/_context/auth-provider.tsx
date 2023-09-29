"use client";

import { createContext, useReducer } from "react";

// https://vercel.com/guides/react-context-state-management-nextjs#using-context-in-client-components

const initialAuthState = { user: null };

export const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: React.Dispatch<Action>;
}>({
  authState: initialAuthState,
  authDispatch: () => {},
});

interface AuthState {
  user: {} | null;
}

interface Action {
  type: string;
  payload: {};
}

export function authReducer(prevState: AuthState, action: Action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...prevState, user: action.payload };
    default:
      return prevState;
  }
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  console.log("AuthContext state: ", authState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
