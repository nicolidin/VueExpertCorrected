import { computed } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { createTagFront } from '@/api/strapi/tags';

/**
 * Données et handlers pour la sidebar tags des pages notes.
 */
export function useNotesSidebar() {
  const notesStore = useNotesStore();

  const sidebarTagsData = computed(() =>
    notesStore.tags.map((tag) => ({
      libelleName: tag.title,
      isSelected: notesStore.selectedTagNames.includes(tag.title),
      color: tag.color,
    })),
  );

  function handleTagClick(tag: { libelleName: string; isSelected: boolean }) {
    notesStore.setTagSelected(tag.libelleName, tag.isSelected);
  }

  async function handleTagCreate(payload: { title: string; color: string }) {
    try {
      const newTag = await createTagFront({
        title: payload.title,
        color: payload.color || '#9E9E9E',
      });
      notesStore.addTag(newTag);
    } catch (e) {
      console.error('Erreur lors de la création du tag:', e);
    }
  }

  return {
    sidebarTagsData,
    handleTagClick,
    handleTagCreate,
  };
}
