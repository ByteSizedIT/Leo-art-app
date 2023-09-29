"use client";

import { useState } from "react";

import { firebaseAuth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  async function signUp(email: string, password: string, displayName: string) {
    console.log("signing up");
    console.log({ email, password, displayName });

    setIsPending(true);
    setError(null);

    try {
      // create user with firebaseAuth
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!response) throw new Error("Could not complete sign up!");

      console.log("User signed up as ", response.user);

      router.push("/");

      // add displayName to user in firebaseAuth
      // dispatch login action to update local user authState
      // add user to firestore
      //redirect to homepage
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(error);
      console.log(message);
      // send error to logging service such as Sentry

      setError(message);
      setIsPending(false);
    }
  }

  return { isPending, error, signUp };
};

export default useSignUp;
