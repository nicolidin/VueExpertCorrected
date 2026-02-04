<template>
  <div v-if="isLoading && !note" class="notes-detail">
    <p>Chargement…</p>
  </div>
  <div v-else-if="!note" class="notes-detail">
    <p>Note non trouvée.</p>
  </div>
  <div v-else class="notes-detail notes-detail--editing">
    <NoteEditor
      :note="noteForEditor"
      :tags="tagsForEditor"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NoteEditor } from 'vue-lib-exo-corrected';
import { updateNoteFront } from '@/api/strapi/notes';
import { useNotesStore } from '@/stores/notes';
import { useNote } from '@/composables/useNote';
import { useTags } from '@/composables/useTags';
import type { TagType } from '@/types/TagType';

const route = useRoute();
const router = useRouter();
const noteId = () => route.params.id as string;
const notesStore = useNotesStore();

const { data: noteData, isLoading } = useNote(noteId);
const { data: tagsData } = useTags();

watch(tagsData, (val) => {
  if (val && notesStore.tags.length === 0) {
    notesStore.setTags(val as TagType[]);
  }
}, { immediate: true });

const note = computed(
  () => noteData.value ?? notesStore.notesById(noteId()) ?? null,
);

const noteForEditor = computed(() => {
  const n = note.value;
  if (!n) return { id: '', contentMd: '', tagsId: [] as string[] };
  return {
    id: n.id,
    contentMd: n.contentMd,
    tagsId: n.tagIds ?? [],
  };
});

const tagsForEditor = computed(() =>
  notesStore.tags.map((t) => ({ id: t.id, title: t.title, color: t.color })),
);

async function handleUpdate(payload: {
  id: string;
  title: string;
  contentMd: string;
  tagsId: string[];
}) {
  try {
    const updated = await updateNoteFront(
      payload.id,
      { contentMd: payload.contentMd, tagsId: payload.tagsId },
      notesStore.tags,
    );
    notesStore.updateNote(updated);
    router.push('/');
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
