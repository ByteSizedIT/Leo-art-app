export interface ArtWork {
  name: string;
  description: string;
  featuredStars?: Array<string>;
  featuredTeams?: string[];
  collections?: string[];
  tags?: string[];
  productTypes?: string[];
  imageURL: string;
}

export interface ArtworkUpload extends ArtWork {
  image: File | null;
}

export interface ArtWorkDownload extends ArtWork {
  id: string;
}

// export interface ArtWorkDispatchAction {
//   type: string;
//   payload: string | string[] | File;
// }

export type ArtWorkDispatchAction =
  | { type: "name"; payload: string }
  | { type: "description"; payload: string }
  | { type: "featuredStars"; payload: string[] }
  | { type: "featuredTeams"; payload: string[] }
  | { type: "collections"; payload: string[] }
  | { type: "tags"; payload: string[] }
  | { type: "productTypes"; payload: string[] }
  | { type: "imageURL"; payload: string }
  | { type: "image"; payload: File };

export interface ReactSelectOption {
  value: string;
  label: string;
}
