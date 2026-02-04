<script setup lang="ts">
import { Layout } from 'vue-lib-exo-corrected';
import { useNotesSidebar } from '@/composables/useNotesSidebar';
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();
const { sidebarTagsData, handleTagClick, handleTagCreate } = useNotesSidebar();

function onTagClick(tag: { libelleName: string; isSelected: boolean }) {
  if (tag.libelleName === 'All Notes') {
    notesStore.clearSelectedTags();
  } else {
    handleTagClick(tag);
  }
}
</script>

<template>
  <Layout
    class="layout"
    :show-tags-sidebar="true"
    :tags="sidebarTagsData"
    @tag-click="onTagClick"
    @tag-create="handleTagCreate"
  >
    <router-view />
  </Layout>
</template>

<style scoped>
.layout {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
