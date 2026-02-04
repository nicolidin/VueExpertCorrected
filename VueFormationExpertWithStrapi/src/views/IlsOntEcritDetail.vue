<template>
  <div v-if="isLoading && !mappedNote" class="ils-ont-ecrit-detail">
    <p>Chargement…</p>
  </div>
  <div v-else-if="mappedNote" class="ils-ont-ecrit-detail">
    <router-link to="/ils-ont-ecrit" class="d-inline-block mb-4">
      ← Retour à Ils ont écrit
    </router-link>
    <NoteCard :note="mappedNote" />
  </div>
  <div v-else class="ils-ont-ecrit-detail">
    <p>Note non trouvée.</p>
    <router-link to="/ils-ont-ecrit">Retour à Ils ont écrit</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NoteCard } from 'vue-lib-exo-corrected';
import { useCommunityPinnedNote } from '@/composables/useCommunityPinnedNote';
import { useTags } from '@/composables/useTags';
import type { TagType } from '@/types/TagType';
import { getNoteWithTags } from '@/utils/noteWithTags';

const route = useRoute();
const noteId = () => route.params.id as string;

const { data: noteRes, isLoading } = useCommunityPinnedNote(noteId);
const { data: tagsRes } = useTags();

const tags = computed(() => (tagsRes.value ?? []) as TagType[]);
const note = computed(() => noteRes.value);

const mappedNote = computed(() => {
  const n = note.value;
  if (!n) return null;
  return getNoteWithTags(n, tags.value);
});
</script>

<style scoped lang="scss">
.ils-ont-ecrit-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
