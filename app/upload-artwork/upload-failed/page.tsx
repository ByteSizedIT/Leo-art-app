"use client";

import HomeBtn from "@/app/components/HomeBtn";

import { useSearchParams, useRouter } from "next/navigation";

const UploadFailed = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const artWorkName = searchParams.get("artWorkName");

  return (
    <div className="w-full max-w-7xl flex flex-col flex-grow justify-center items-center mx-auto p-10">
      <h1>{`Upload Failed...`}</h1>
      <div className="flex">
        <button onClick={() => router.push("/upload-artwork")}>
          Try again
        </button>
        <HomeBtn message={"Visit the Gallery"} />
      </div>
    </div>
  );
};
export default UploadFailed;
