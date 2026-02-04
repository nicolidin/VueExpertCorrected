import { ref, onMounted } from 'vue';
import { fetchCommunityPinnedNotes } from '@/api/strapi/community-pinned-notes';
import type { NoteType } from '@/types/NoteType';

export function useCommunityPinnedNotes() {
  const data = ref<NoteType[] | null>(null);
  const isLoading = ref(true);
  const error = ref<unknown>(null);

  async function load() {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await fetchCommunityPinnedNotes();
    } catch (e) {
      error.value = e;
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(load);

  return { data, isLoading, error, refresh: load };
}
