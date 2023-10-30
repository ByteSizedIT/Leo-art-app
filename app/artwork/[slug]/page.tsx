import Image from "next/image";

import { GrEdit } from "react-icons/gr";

import { ArtWorkDownload } from "@/app/types";

import { getAllArtWork } from "@/app/_utils/getAllArt";

import getSingleArtWork from "@/app/_utils/getSingleArt";

import { notFound } from "next/navigation";

// https://stackoverflow.com/questions/72829305/prop-classname-did-not-match-server-and-client
// import LikeIcon from "@/app/components/artwork-icons/LikeIcon";
import dynamic from "next/dynamic";
const LikeIcon = dynamic(
  () => import("@/app/components/artwork-icons/LikeIcon"),
  {
    ssr: false,
  }
);

import DeleteIcon from "@/app/components/artwork-icons/DeleteIcon";

// Return a list of `params` to populate the [slug] dynamic segment - https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const artworks = await getAllArtWork();

  return artworks.map((artwork: ArtWorkDownload) => ({
    slug: artwork.id,
  }));
}

const ArtWorkPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  // const response = await fetch(`http://localhost:4000/artworks/${slug}`, {
  //   next: { revalidate: 3600 },
  // });

  // if (!response.ok) notFound();

  // const artWork = await response.json();
  const artWork: ArtWorkDownload = (await getSingleArtWork(
    slug
  )) as ArtWorkDownload;

  console.log({ artWork });

  return (
    <div className="flex flex-col md:flex-row flex-grow items-center text-center max-w-5xl mx-auto p-5">
      <div className="w-full md:min-w-[55%] md:pr-16">
        <h1 className="font-medium text-2xl pb-6">
          {artWork?.name?.toUpperCase()}
        </h1>
        <p className="font-inter text-sm text-gray-500 pb-4 md:pb-0">
          {artWork?.description}
        </p>
        <div className="flex justify-evenly">
          <LikeIcon artWork={artWork} />

          <p className="cursor-pointer pt-6">
            <GrEdit className="inline-block " /> edit
          </p>
          <DeleteIcon
            artWorkName={artWork?.name}
            artWorkID={artWork?.id}
            artWorkURL={artWork?.imageURL}
          />
        </div>
      </div>
      <Image
        src={artWork.imageURL}
        alt={`${artWork?.name} artwork by Leo`}
        width={1000}
        height={1000}
        className="artImage w-full md:max-w-[45%]"
      />
    </div>
  );
};
export default ArtWorkPage;
