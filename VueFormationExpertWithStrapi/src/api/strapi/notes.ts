import { axiosClient } from '@/api/axios';
import { fromStrapiNote, toStrapiNotePayload } from '@/utils/strapiMappers';
import type { StrapiNoteType } from '@/types/StrapiNoteType';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';

/**
 * Appels API Strapi - Notes (via proxy /api/strapi/notes)
 * Exposés en modèle front (NoteType).
 */

export async function fetchNotes(): Promise<NoteType[]> {
  const { data: res } = await axiosClient.get<{ data: StrapiNoteType[] }>(
    '/api/strapi/notes',
    { params: { 'pagination[pageSize]': 10000 } },
  );
  return res.data.map(fromStrapiNote);
}

/** id = documentId Strapi (pour GET une ressource) */
export async function fetchNote(id: string): Promise<NoteType> {
  const { data: res } = await axiosClient.get<{ data: StrapiNoteType } | StrapiNoteType>(
    `/api/strapi/notes/${id}`,
  );
  const raw = (res as { data?: StrapiNoteType }).data ?? (res as StrapiNoteType);
  return fromStrapiNote(raw);
}

export async function createNoteFront(
  payload: { title: string; contentMd: string; tagsId: string[] },
  allTags: TagType[],
): Promise<NoteType> {
  const formatedContentMd = `# ${payload.title}\n\n${payload.contentMd}`;

  const { data: res } = await axiosClient.post<{ data: StrapiNoteType }>(
    '/api/strapi/notes',
    toStrapiNotePayload(
      { contentMd: formatedContentMd, tagIds: payload.tagsId },
      allTags,
    ),
  );
  return fromStrapiNote(res.data);
}

export async function updateNoteFront(
  id: string,
  payload: { contentMd: string; tagsId: string[] },
  allTags: TagType[],
): Promise<NoteType> {
  const { data: res } = await axiosClient.put<{ data: StrapiNoteType }>(
    `/api/strapi/notes/${id}`,
    toStrapiNotePayload(
      { contentMd: payload.contentMd, tagIds: payload.tagsId },
      allTags,
    ),
  );
  return fromStrapiNote(res.data);
}
