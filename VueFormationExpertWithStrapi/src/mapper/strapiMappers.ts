import type {
  StrapiNoteReadDTO,
  StrapiNoteWriteDTO,
} from '@/types/StrapiNoteType';
import type { StrapiTagType } from '@/types/StrapiTagType';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';

/** Strapi → front */
export function fromStrapiTag(raw: StrapiTagType): TagType {
  const nowIso = new Date().toISOString();

  return {
    id: raw.documentId,
    title: raw.title ?? '',
    color: raw.color ?? '#9E9E9E',
    createdAt: raw.createdAt ?? nowIso,
    updatedAt: raw.updatedAt ?? nowIso,
    publishedAt: raw.publishedAt ?? nowIso,
  };
}

/** Strapi → front (StrapiNoteType → NoteType) */
export function fromStrapiNote(raw: StrapiNoteReadDTO): NoteType {
  return {
    id: raw.documentId ,
    contentMd: raw.contentMd ?? '',
    tagIds: raw.tagIds ?? [],
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? '',
    publishedAt: raw.publishedAt ?? '',
  };
}

/** front → Strapi (NoteType ou { contentMd, tagIds } → payload body pour POST/PUT) */
export function toStrapiNote(note: NoteType): StrapiNoteWriteDTO {
  const tagIds = (note.tagIds ?? []).filter((id) => id.trim().length > 0);

  return {
    data: {
      contentMd: note.contentMd,
      tagIds: tagIds.length > 0 ? tagIds : null,
    },
  };
}
