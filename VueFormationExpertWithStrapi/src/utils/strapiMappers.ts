import type { StrapiNoteType } from '@/types/StrapiNoteType';
import type { StrapiTagType } from '@/types/StrapiTagType';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';

/** Strapi -> front */
export function fromStrapiTag(raw: StrapiTagType): TagType {
  const nowIso = new Date().toISOString();

  return {
    id: String(raw.id),
    title: raw.title ?? '',
    color: raw.color ?? '#9E9E9E',
    createdAt: raw.createdAt ?? nowIso,
    updatedAt: raw.updatedAt ?? nowIso,
    publishedAt: raw.publishedAt ?? nowIso,
  };
}

/** Strapi v4 : on expose documentId comme id front (pour GET/PUT une ressource) */
export function fromStrapiNote(raw: StrapiNoteType): NoteType {
  return {
    id: raw.documentId ?? String(raw.id),
    contentMd: raw.contentMd ?? '',
    tagIds: (raw.tagIds ?? []).map(String),
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? '',
    publishedAt: raw.publishedAt ?? '',
  };
}

/** front -> Strapi (payload) */
export function toStrapiNotePayload(
  note: { contentMd: string; tagIds: string[] },
  allTags: TagType[],
) {
  const numericTagIds = note.tagIds
    .map((id) => {
      const t = allTags.find((tag) => tag.id === id);
      return t ? Number(id) : null;
    })
    .filter((x): x is number => x !== null);

  return {
    data: {
      contentMd: note.contentMd,
      tagIds: numericTagIds.length > 0 ? numericTagIds : null,
    },
  };
}
