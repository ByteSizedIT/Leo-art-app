"use client";

import { useState, useEffect } from "react";

const useLogIn = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  async function logIn(email: string, password: string) {
    console.log("logging in");
    console.log({ email, password });

    try {
    } catch (err) {}
  }

  return { isPending, error, logIn };
};

export default useLogIn;
