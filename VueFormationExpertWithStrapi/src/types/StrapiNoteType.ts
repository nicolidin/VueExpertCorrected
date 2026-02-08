import type { NoteType } from '@/types/NoteType';

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

/** Payload envoyé à Strapi pour create/update (body de POST/PUT) */
export type StrapiNotePayload = {
  data: {
    contentMd: string;
    tagIds: number[] | null;
  };
};

/** Données acceptées pour construire le payload Strapi (note complète ou champs create/update) */
export type NotePayloadInput =
  | NoteType
  | Pick<NoteType, 'contentMd' | 'tagIds'>;
