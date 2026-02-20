<template>
  <Layout>
    <template #sidebar>
      <SidebarTags
        :model-value="true"
        :tags="sidebarTagsData"
        :permanent="true"
        @tag-click="onTagClick"
        @tag-create="handleTagCreate"
      />
    </template>
    <div v-if="loading" class="notes-page">
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
  </Layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Layout, ListNote, NoteCreation, SidebarTags } from 'vue-lib-exo-corrected';
import { fetchNotesApi, postNoteApi } from '@/api/strapi/notes';
import { fetchTagsApi, postTagApi } from '@/api/strapi/tags';
import { useNotesStore } from '@/stores/notes';
import { useFetch } from '@/composables/useFetch';
import { useSearch } from '@/composables/useSearch';
import type { NoteType } from '@/types/Domain/NoteType';
import type { TagType } from '@/types/Domain/TagType';
import { getNotesWithTags } from '@/service/noteWithTags';

const router = useRouter();
const notesStore = useNotesStore();
const { filteredNotes: notesFilteredByTag } = storeToRefs(notesStore);
const searchQuery = ref('');
const { filteredNotes } = useSearch(notesFilteredByTag, searchQuery);

const { isLoading } = useFetch<[NoteType[], TagType[]]>(
  async () => {
    const [notes, tags] = await Promise.all([fetchNotesApi(), fetchTagsApi()]);
    notesStore.setNotes(notes);
    notesStore.mergeTags(tags);
    return [notes, tags];
  },
  { autoExecute: true },
);

const tagsData = computed(() =>
  notesStore.tags.map((tag) => ({
    id: tag.id,
    title: tag.title,
    color: tag.color,
  })),
);

const sidebarTagsData = computed(() =>
  notesStore.tags.map((tag) => ({
    libelleName: tag.title,
    isSelected: notesStore.selectedTagNames.includes(tag.title),
    color: tag.color,
  })),
);

const mappedNotes = computed(() =>
  getNotesWithTags(filteredNotes.value, notesStore.tags),
);

async function handleCreateNote(noteData: {
  title: string;
  contentMd: string;
  tagIds: string[];
}) {
  try {
    const newNote = await postNoteApi(noteData);
    notesStore.addNote(newNote);
  } catch (error) {
    console.error('Erreur lors de la création de la note:', error);
  }
}

function handleNoteClick(note: { id: string }) {
  router.push(`/notes/${note.id}`);
}

function handleTagClick(tag: { libelleName: string; isSelected: boolean }) {
  notesStore.setTagSelected(tag.libelleName, tag.isSelected);
}

async function handleTagCreate(payload: { title: string; color: string }) {
  try {
    const newTag = await postTagApi({
      title: payload.title,
      color: payload.color || '#9E9E9E',
    });
    notesStore.addTag(newTag);
  } catch (e) {
    console.error('Erreur lors de la création du tag:', e);
  }
}

function onTagClick(tag: { libelleName: string; isSelected: boolean }) {
  if (tag.libelleName === 'All Notes') {
    notesStore.clearSelectedTags();
  } else {
    handleTagClick(tag);
  }
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
