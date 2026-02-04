import { ref, onMounted } from 'vue';
import { fetchTags } from '@/api/strapi/tags';
import type { TagType } from '@/types/TagType';

export function useTags() {
  const data = ref<TagType[] | null>(null);
  const isLoading = ref(true);
  const error = ref<unknown>(null);

  async function load() {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await fetchTags();
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
