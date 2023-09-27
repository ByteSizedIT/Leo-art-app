import getAllArtWork from "./_utils/getArt";
import shuffle from "./_utils/shuffle";
import Gallery from "./components/Gallery";

import { ArtWork } from "./types";

async function Home() {
  let allArtWork: ArtWork[] = await getAllArtWork();
  shuffle(allArtWork);

  return (
    <main className="">
      <div className="">
        <Gallery allArtWork={allArtWork} />
      </div>
    </main>
  );
}
export default Home;
