<template>
  <Layout>
    <div v-if="isLoading && !note" class="notes-detail">
      <p>Chargement…</p>
    </div>
    <div v-else-if="!note" class="notes-detail">
      <p>Note non trouvée.</p>
    </div>
    <div v-else class="notes-detail notes-detail--editing">
      <NoteEditor
        :note="note"
        :tags="notesStore.tags"
        @update="handleUpdate"
      />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Layout, NoteEditor } from 'vue-lib-exo-corrected';
import { fetchNoteApi, updateNoteApi } from '@/api/strapi/notes';
import { fetchTagsApi } from '@/api/strapi/tags';
import { useNotesStore } from '@/stores/notes';
import { useFetch } from '@/composables/useFetch';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';

const route = useRoute();
const router = useRouter();
const noteId = route.params.id
const notesStore = useNotesStore();

async function loadNote(): Promise<NoteType | null> {
  const id = noteId;
  if (notesStore.tags.length === 0) {
    const tags = await fetchTagsApi();
    notesStore.setTags(tags as TagType[]);
  }
  const noteInStore = notesStore.notesById(id);
  if (noteInStore) return noteInStore;
  try {
    const note = await fetchNoteApi(id);
    notesStore.addNote(note);
    return note;
  } catch {
    return null;
  }
}

const { data: note, isLoading } = useFetch<NoteType | null>(loadNote);

async function handleUpdate(payload: {
  id: string;
  title: string;
  contentMd: string;
  tagIds: string[];
}) {
  try {
    const updated = await updateNoteApi(
      payload.id,
      { contentMd: payload.contentMd, tagIds: payload.tagIds },
    );
    notesStore.updateNote(updated);
    router.push('/notes');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la note:', error);
  }
}
</script>

<style scoped lang="scss">
.notes-detail {
  padding: $spacing-16;
  max-width: 560px;
  margin: 0 auto;

  &__card {
    margin-bottom: $spacing-16;
  }

  &__actions {
    display: flex;
    gap: $spacing-8;
    justify-content: flex-end;
  }

  &--editing {
    padding-top: $spacing-24;
  }
}
</style>
