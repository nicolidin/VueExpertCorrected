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
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Layout, NoteCard } from 'vue-lib-exo-corrected';
import { fetchCommunityPinnedNoteApi } from '@/api/strapi/community-pinned-notes';
import { fetchTagsApi } from '@/api/strapi/tags';
import type { NoteType } from '@/types/NoteType';
import type { TagType } from '@/types/TagType';
import { getNoteWithTags } from '@/service/noteWithTags';

const route = useRoute();
const noteId = () => route.params.id as string;

const noteRes = ref<NoteType | null>(null);
const tagsRes = ref<TagType[] | null>(null);
const isLoading = ref(true);

async function load() {
  const id = noteId();
  isLoading.value = true;
  try {
    const [note, tags] = await Promise.all([
      fetchCommunityPinnedNoteApi(id),
      fetchTagsApi(),
    ]);
    noteRes.value = note;
    tagsRes.value = tags;
  } catch {
    noteRes.value = null;
    tagsRes.value = null;
  } finally {
    isLoading.value = false;
  }
}

onMounted(load);
watch(() => route.params.id, load);

const tags = computed(() => tagsRes.value ?? []);
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
