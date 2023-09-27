"use client";

import { useRouter } from "next/navigation";

const HomeBtn = ({ message }: { message: string }) => {
  const router = useRouter();

  function handleClick() {
    router.push("/");
    // redirect("/");
  }

  return <button onClick={handleClick}>{message}</button>;
};

export default HomeBtn;
