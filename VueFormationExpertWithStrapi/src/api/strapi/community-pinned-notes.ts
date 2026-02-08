import { axiosClient } from '@/api/axios';
import { fromStrapiNote } from '@/mapper/strapiMappers';
import type { StrapiNoteType } from '@/types/StrapiNoteType';
import type { NoteType } from '@/types/NoteType';

/**
 * Appels API Strapi - Community Pinned Notes (via proxy /api/strapi/community-pinned-notes)
 * Exposés en modèle front (NoteType).
 */

export async function fetchCommunityPinnedNotesApi(): Promise<NoteType[]> {
  const { data: res } = await axiosClient.get<{ data: StrapiNoteType[] }>(
    '/api/strapi/community-pinned-notes',
  );
  return res.data.map(fromStrapiNote);
}

export async function fetchCommunityPinnedNoteApi(id: string): Promise<NoteType> {
  const { data: res } = await axiosClient.get<
    { data: StrapiNoteType } | StrapiNoteType
  >(`/api/strapi/community-pinned-notes/${id}`);
  const raw = (res as { data?: StrapiNoteType }).data ?? (res as StrapiNoteType);
  return fromStrapiNote(raw);
}
