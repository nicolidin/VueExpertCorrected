// Forme brute renvoyée par Strapi pour une note
export type StrapiNoteType = {
  id: number;
  documentId?: string;
  contentMd?: string;
  tagIds?: number[] | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};
