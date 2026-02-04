<template>
  <div v-if="notesLoading || tagsLoading" class="ils-ont-ecrit">
    <p>Chargement…</p>
  </div>
  <div v-else class="ils-ont-ecrit">
    <h1 class="text-h4 mb-2">Ils ont écrit</h1>
    <p class="text-body-2 text-medium-emphasis mb-4">
      Les notes épinglées de la communauté
    </p>
    <ListNote :notes="mappedNotes" @note-click="goToNote" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ListNote } from 'vue-lib-exo-corrected';
import { useCommunityPinnedNotes } from '@/composables/useCommunityPinnedNotes';
import { useTags } from '@/composables/useTags';
import type { TagType } from '@/types/TagType';
import { getNotesWithTags } from '@/utils/noteWithTags';

const router = useRouter();
const { data: pinnedNotes, isLoading: notesLoading } =
  useCommunityPinnedNotes();
const { data: tagsResponse, isLoading: tagsLoading } = useTags();

const tags = computed(() => (tagsResponse.value ?? []) as TagType[]);

const mappedNotes = computed(() => {
  const list = Array.isArray(pinnedNotes.value) ? pinnedNotes.value : [];
  return getNotesWithTags(list, tags.value);
});

function goToNote(note: { id: string }) {
  router.push(`/ils-ont-ecrit/${note.id}`);
}
</script>

<style scoped lang="scss">
.ils-ont-ecrit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
