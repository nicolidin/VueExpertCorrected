import { axiosClient } from '@/api/axios';
import { fromStrapiNote } from '@/mapper/strapiMappers';
import type { StrapiNoteReadDTO } from '@/types/StrapiNoteType';
import type { NoteType } from '@/types/NoteType';

/**
 * Appels API Strapi - Community Pinned Notes (baseURL = Strapi, /api/community-pinned-notes).
 */

export async function fetchCommunityPinnedNotesApi(): Promise<NoteType[]> {
  const { data: res } = await axiosClient.get<{ data?: StrapiNoteReadDTO[] }>(
    '/api/community-pinned-notes',
  );
  const list = res?.data ?? [];
  return Array.isArray(list) ? list.map(fromStrapiNote) : [];
}

export async function fetchCommunityPinnedNoteApi(id: string): Promise<NoteType> {
  const { data: res } = await axiosClient.get<
    { data: StrapiNoteReadDTO } | StrapiNoteReadDTO
  >(`/api/community-pinned-notes/${id}`);
  const raw = (res as { data?: StrapiNoteReadDTO }).data ?? (res as StrapiNoteReadDTO);
  return fromStrapiNote(raw);
}
