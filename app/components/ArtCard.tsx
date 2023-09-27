"use client";

import { MouseEventHandler } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { ArtWork } from "@/app/types";

const ArtCard = ({
  artWork,
  key,
}: {
  artWork: ArtWork;
  handleEdit?: MouseEventHandler<HTMLParagraphElement>;
  handleDelete?: MouseEventHandler<HTMLParagraphElement>;
  handleTagClick?: MouseEventHandler<HTMLParagraphElement>;
  key: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="cursor:pointer position: relative"
      key={key}
      onClick={() => router.push(`/artwork/${artWork.id}`)}
    >
      <Image
        className="hover:opacity-25"
        src={artWork.url || "/logo-green-72.png"}
        alt={`${artWork.name} artwork by Leo`}
        width={1000}
        height={1000}
      />
      <div className="absolute top-0 left-0 flex w-full h-full justify-center items-center text-center font-medium text-2xl -z-50 hover:z-50 p-12">
        <p>{artWork.name.toUpperCase()}</p>
      </div>
    </div>
  );
};
export default ArtCard;
