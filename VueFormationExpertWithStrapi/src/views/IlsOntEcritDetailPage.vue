<template>
  <Layout>
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
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Layout, NoteCard } from 'vue-lib-exo-corrected';
import { fetchCommunityPinnedNoteApi } from '@/api/strapi/community-pinned-notes';
import { fetchTagsApi } from '@/api/strapi/tags';
import { useFetch } from '@/composables/useFetch';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';
import { getNoteWithTags } from '@/service/noteWithTags';

const route = useRoute();

const { data, isLoading } = useFetch<[NoteType, TagType[]]>(() => {
  const id = route.params.id as string;
  return Promise.all([fetchCommunityPinnedNoteApi(id), fetchTagsApi()]);
});

const note = computed(() => data.value?.[0] ?? null);
const tags = computed(() => data.value?.[1] ?? []);

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
