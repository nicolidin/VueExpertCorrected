import { axiosClient } from '@/api/axios';
import { fromStrapiNote, toStrapiNotePayload } from '@/mapper/strapiMappers';
import type { StrapiNoteType } from '@/types/StrapiNoteType';
import type { NoteType } from '@/types/NoteType';

/**
 * Appels API Strapi - Notes (via proxy /api/strapi/notes)
 * Exposés en modèle front (NoteType).
 */

export async function fetchNotesApi(): Promise<NoteType[]> {
  const { data: res } = await axiosClient.get<{ data: StrapiNoteType[] }>(
    '/api/strapi/notes',
    { params: { 'pagination[pageSize]': 10000 } },
  );
  return res.data.map(fromStrapiNote);
}

/** id = documentId Strapi (pour GET une ressource) */
export async function fetchNoteApi(id: string): Promise<NoteType> {
  const { data: res } = await axiosClient.get<{ data: StrapiNoteType } | StrapiNoteType>(
    `/api/strapi/notes/${id}`,
  );
  const raw = (res as { data?: StrapiNoteType }).data ?? (res as StrapiNoteType);
  return fromStrapiNote(raw);
}

/**
 * API métier côté front : payload "front" (tagIds) → formatage titre + payload Strapi → POST.
 */
export async function postNoteApi(
  payload: { title: string; contentMd: string; tagIds: string[] },
): Promise<NoteType> {
  const formatedContentMd = `# ${payload.title}\n\n${payload.contentMd}`;

  const { data: res } = await axiosClient.post<{ data: StrapiNoteType }>(
    '/api/strapi/notes',
    toStrapiNotePayload({
      contentMd: formatedContentMd,
      tagIds: payload.tagIds,
    }),
  );
  return fromStrapiNote(res.data);
}

/**
 * Mise à jour d'une note (PUT /api/strapi/notes/:documentId)
 * id = documentId Strapi
 */
export async function updateNoteApi(
  id: string,
  payload: { contentMd: string; tagIds: string[] },
): Promise<NoteType> {
  const { data: res } = await axiosClient.put<{ data: StrapiNoteType }>(
    `/api/strapi/notes/${id}`,
    toStrapiNotePayload({
      contentMd: payload.contentMd,
      tagIds: payload.tagIds,
    }),
  );
  return fromStrapiNote(res.data);
}
