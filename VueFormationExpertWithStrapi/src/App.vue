<script setup lang="ts">
import { computed } from 'vue';
import { Layout } from 'vue-lib-exo-corrected';
import { useNotesStore } from '@/stores/notes';
import { postTagApi } from '@/api/strapi/tags';

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
    const newTag = await postTagApi({
      title: payload.title,
      color: payload.color || '#9E9E9E',
    });
    notesStore.addTag(newTag);
  } catch (e) {
    console.error('Erreur lors de la création du tag:', e);
  }
}

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
