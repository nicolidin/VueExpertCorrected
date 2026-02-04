import { ref, watch, onMounted } from 'vue';
import { fetchNote } from '@/api/strapi/notes';
import type { NoteType } from '@/types/NoteType';
import { useNotesStore } from '@/stores/notes';

export function useNote(id: () => string) {
  const data = ref<NoteType | null>(null);
  const isLoading = ref(true);
  const error = ref<unknown>(null);
  const notesStore = useNotesStore();

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
      const fromStore = notesStore.notesById(noteId);
      if (fromStore) {
        data.value = fromStore;
        isLoading.value = false;
        return;
      }
      data.value = await fetchNote(noteId);
      notesStore.addNote(data.value);
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
