// Forme brute renvoyée par Strapi pour une note
export type StrapiNoteReadDTO = {
  id: number;
  documentId?: string;
  contentMd?: string;
  tagIds?: number[] | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

/** Payload envoyé à Strapi pour create/update (body de POST/PUT) */
export type StrapiNoteWriteDTO = {
  data: {
    contentMd: string;
    tagIds: number[] | null;
  };
};
