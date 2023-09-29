"use client";

import { useContext } from "react";
import { AuthContext } from "../_context/auth-provider";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

export default useAuthContext;
