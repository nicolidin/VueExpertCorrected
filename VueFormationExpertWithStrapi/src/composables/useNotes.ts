import { ref, onMounted } from 'vue';
import { fetchNotes } from '@/api/strapi/notes';
import type { NoteType } from '@/types/NoteType';

export function useNotes() {
  const data = ref<NoteType[] | null>(null);
  const isLoading = ref(true);
  const error = ref<unknown>(null);

  async function load() {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await fetchNotes();
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
