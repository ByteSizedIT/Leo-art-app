import { ArtWorkDownload } from "../types";

export default function shuffle(artArray: ArtWorkDownload[]) {
  return artArray.sort(() => Math.random() - 0.5);
}
