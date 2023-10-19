"use client";

import HomeBtn from "@/app/components/HomeBtn";

import { useSearchParams, useRouter } from "next/navigation";

const UploadSucceeded = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const artWorkName = searchParams.get("artWorkName");
  const artWorkID = searchParams.get("artWorkID");

  return (
    <div className="w-full max-w-7xl flex flex-col flex-grow justify-center items-center mx-auto p-10">
      <h1>{`Successfully uploaded '${artWorkName}'`}</h1>
      <div className="flex">
        <button onClick={() => router.push("/upload-artwork")}>
          Upload more art!
        </button>
        <button onClick={() => router.push(`/artwork/${artWorkID}`)}>
          {`Visit '${artWorkName}' page`}
        </button>
        <HomeBtn message={"Visit the Gallery"} />
      </div>
    </div>
  );
};
export default UploadSucceeded;
