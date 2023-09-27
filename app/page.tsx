import getAllArtWork from "./_utils/getArt";
import shuffle from "./_utils/shuffle";
import Gallery from "./components/Gallery";

import { ArtWork } from "./types";

async function Home() {
  let allArtWork: ArtWork[] = await getAllArtWork();
  shuffle(allArtWork);

  return (
    <main className="w-full max-w-7xl flex flex-col justify-center items-center mx-auto p-10">
      <Gallery allArtWork={allArtWork} />
    </main>
  );
}
export default Home;
