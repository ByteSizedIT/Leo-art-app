"use client";

import { useState } from "react";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  async function signUp(email: string, password: string, displayName: string) {
    console.log("signing up");
    console.log({ email, password, displayName });
    try {
      // create user with firebaseAuth
      // add displayName to user in firebaseAuth
      // dispatch login action to update local user authState
      // add user to firestore
      //redirect to homepage
    } catch (err) {}
  }

  return { isPending, error, signUp };
};

export default useSignUp;
