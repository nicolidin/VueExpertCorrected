import { axiosClient } from '@/api/axios';
import { fromStrapiNote, toStrapiNoteWrite } from '@/mapper/strapiMappers';
import type { StrapiNoteReadDTO } from '@/types/StrapiNoteType';
import type { NoteType } from '@/types/NoteType';

/**
 * Appels API Strapi - Notes (baseURL = Strapi, chemins /api/notes).
 */

export async function fetchNotesApi(): Promise<NoteType[]> {
  const { data: res } = await axiosClient.get<{ data?: StrapiNoteReadDTO[] }>(
    '/api/notes',
    { params: { 'pagination[pageSize]': 10000 } },
  );
  const list = res?.data ?? [];
  return Array.isArray(list) ? list.map(fromStrapiNote) : [];
}

/** id = documentId Strapi (pour GET une ressource) */
export async function fetchNoteApi(id: string): Promise<NoteType> {
  const { data: res } = await axiosClient.get<{ data: StrapiNoteReadDTO } | StrapiNoteReadDTO>(
    `/api/notes/${id}`,
  );
  const raw = (res as { data?: StrapiNoteReadDTO }).data ?? (res as StrapiNoteReadDTO);
  return fromStrapiNote(raw);
}

/**
 * API métier côté front : payload "front" (tagIds) → formatage titre + payload Strapi → POST.
 */
export async function postNoteApi(
  payload: { title: string; contentMd: string; tagIds: string[] },
): Promise<NoteType> {
  const formatedContentMd = `# ${payload.title}\n\n${payload.contentMd}`;

  const { data: res } = await axiosClient.post<{ data: StrapiNoteReadDTO }>(
    '/api/notes',
    toStrapiNoteWrite({
      contentMd: formatedContentMd,
      tagIds: payload.tagIds,
    }),
  );
  return fromStrapiNote(res.data);
}

/**
 * Mise à jour d'une note (PUT /api/notes/:documentId)
 * id = documentId Strapi
 */
export async function updateNoteApi(
  id: string,
  payload: { contentMd: string; tagIds: string[] },
): Promise<NoteType> {
  const { data: res } = await axiosClient.put<{ data: StrapiNoteReadDTO }>(
    `/api/notes/${id}`,
    toStrapiNoteWrite({
      contentMd: payload.contentMd,
      tagIds: payload.tagIds,
    }),
  );
  return fromStrapiNote(res.data);
}
