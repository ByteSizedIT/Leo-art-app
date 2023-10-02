interface ArtWork {
  id: string;
  name: string;
  description: string;
  collectionIds?: number[];
  featuredStarIDs?: number[];
  featuredTeamIDs?: number[];
  productTypeIDs?: number[];
  tag: string;
  imageURL: string;
}

export type { ArtWork };
