import { ref, watch, onMounted } from 'vue';
import { fetchCommunityPinnedNote } from '@/api/strapi/community-pinned-notes';
import type { NoteType } from '@/types/NoteType';

export function useCommunityPinnedNote(id: () => string) {
  const data = ref<NoteType | null>(null);
  const isLoading = ref(true);
  const error = ref<unknown>(null);

  async function load() {
    const noteId = id();
    if (!noteId) {
      data.value = null;
      isLoading.value = false;
      return;
    }
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await fetchCommunityPinnedNote(noteId);
    } catch (e) {
      error.value = e;
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(load);
  watch(id, load, { immediate: false });

  return { data, isLoading, error, refresh: load };
}
