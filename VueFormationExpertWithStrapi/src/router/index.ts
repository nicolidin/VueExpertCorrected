import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import NotesIndex from '@/views/NotesIndex.vue';
import About from '@/views/About.vue';
import Note from '@/views/Note.vue';
import IlsOntEcrit from '@/views/IlsOntEcrit.vue';
import IlsOntEcritDetail from '@/views/IlsOntEcritDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/notes',
    name: 'NotesIndex',
    component: NotesIndex,
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: Note,
  },
  {
    path: '/ils-ont-ecrit',
    name: 'IlsOntEcrit',
    component: IlsOntEcrit,
  },
  {
    path: '/ils-ont-ecrit/:id',
    name: 'IlsOntEcritDetail',
    component: IlsOntEcritDetail,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
