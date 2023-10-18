import Image from "next/image";

import { ArtWorkDownload } from "@/app/types";

import { getAllArtWork } from "@/app/_utils/getAllArt";

import getSingleArtWork from "@/app/_utils/getSingleArt";

import { notFound } from "next/navigation";

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
