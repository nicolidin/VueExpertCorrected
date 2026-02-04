import { z } from 'zod';
import { NoteCommonSchema } from 'vue-lib-exo-corrected';

/**
 * Schémas pour valider le payload Strapi (format { data: { ... } })
 * Basés sur NoteCommonSchema de la lib, adaptés au format Strapi :
 * - tagsId: string[] → tagIds: number[]
 * - Pas de id, createdAt (générés par Strapi)
 * - Wrapper { data: { ... } }
 */

export const StrapiNoteCreatePayloadSchema = z.object({
  data: NoteCommonSchema.omit({ id: true, createdAt: true, tagsId: true }).extend({
    tagIds: z.array(z.number()).nullable().optional(),
  }),
});

export const StrapiNoteUpdatePayloadSchema = z.object({
  data: NoteCommonSchema.omit({ id: true, createdAt: true, tagsId: true })
    .extend({
      tagIds: z.array(z.number()).nullable().optional(),
    })
    .partial(),
});
