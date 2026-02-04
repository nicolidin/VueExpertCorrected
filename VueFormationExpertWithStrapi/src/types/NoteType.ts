// Modèle front utilisé par le store + lib
// id = documentId Strapi v4 (pour GET/PUT une ressource), mappé dans strapiMappers
export type NoteType = {
  id: string;
  contentMd: string;
  tagIds: string[]; // ids de TagType côté front (string)
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
