interface ArtWork {
  id: string;
  name: string;
  description: string;
  collectionIds?: number[];
  featuredStarIDs?: number[];
  featuredTeamIDs?: number[];
  productTypeIDs?: number[];
  tag: string;
  url: string;
}

export type { ArtWork };
