<template>
  <div v-if="notesLoading || tagsLoading" class="notes-page">
    <p>Chargement…</p>
  </div>
  <div v-else class="notes-page">
    <NoteCreation
      :tags="tagsData"
      @create="handleCreateNote"
      class="notes-page__note-creation"
    />
    <v-text-field
      v-model="searchQuery"
      placeholder="Rechercher dans les notes…"
      density="comfortable"
      hide-details
      clearable
      class="notes-page__search"
    />
    <ListNote :notes="mappedNotes" @note-click="handleNoteClick" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ListNote, NoteCreation } from 'vue-lib-exo-corrected';
import { createNoteFront } from '@/api/strapi/notes';
import { useNotesStore } from '@/stores/notes';
import { useNotes } from '@/composables/useNotes';
import { useTags } from '@/composables/useTags';
import { useSearch } from '@/composables/useSearch';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';
import { getNotesWithTags } from '@/utils/noteWithTags';

const router = useRouter();
const notesStore = useNotesStore();
const { filteredNotes: notesFilteredByTag } = storeToRefs(notesStore);
const searchQuery = ref('');
const { filteredNotes } = useSearch(notesFilteredByTag, searchQuery);

const { data: notesResponse, isLoading: notesLoading } = useNotes();
const { data: tagsResponse, isLoading: tagsLoading } = useTags();

watch(
  [notesResponse, tagsResponse],
  () => {
    if (notesResponse.value) {
      notesStore.setNotes(notesResponse.value as NoteType[]);
    }
    if (tagsResponse.value) {
      notesStore.mergeTags(tagsResponse.value as TagType[]);
    }
  },
  { immediate: true },
);

const tagsData = computed(() =>
  notesStore.tags.map((tag) => ({
    id: tag.id,
    title: tag.title,
    color: tag.color,
  })),
);

const mappedNotes = computed(() =>
  getNotesWithTags(filteredNotes.value, notesStore.tags),
);

async function handleCreateNote(noteData: {
  title: string;
  contentMd: string;
  tagsId: string[];
}) {
  try {
    const newNote = await createNoteFront(noteData, notesStore.tags);
    notesStore.addNote(newNote);
  } catch (error) {
    console.error('Erreur lors de la création de la note:', error);
  }
}

function handleNoteClick(note: { id: string }) {
  router.push(`/notes/${note.id}`);
}
</script>

<style scoped lang="scss">
.notes-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__note-creation {
    margin-bottom: 0.5rem;
  }

  &__search {
    max-width: 20rem;
  }
}
</style>
