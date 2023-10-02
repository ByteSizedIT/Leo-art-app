"use client";

import { useState } from "react";

import { firebaseAuth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import useAuthContext from "./useAuthContext";

const useLogIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { authDispatch } = useAuthContext();

  const router = useRouter();

  async function logIn(email: string, password: string) {
    console.log("logging in");
    console.log({ email, password });

    setError(null);
    setIsPending(true);

    try {
      // sign in user with firebaseAuth
      const response = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!response) throw new Error("Could not log in!");

      console.log("User signed up as ", response.user);

      // dispatch login action to update local user authState
      authDispatch({ type: "LOG_IN", payload: response.user });

      //redirect to homepage
      router.push("/");
    } catch (err) {
      let message;
      if (err instanceof Error) {
        message = err.message;
        console.log("here1", message);
      } else message = String(error);
      console.log("here2", message);
      // send error to logging service such as Sentry

      setError(message);
      setIsPending(false);
    }
  }

  return { isPending, error, logIn };
};

export default useLogIn;
