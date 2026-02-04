import axios from 'axios';

/**
 * Client axios pour les appels /api/strapi/* (proxy Vite en dev vers Strapi).
 * baseURL vide = même origine, le proxy gère la redirection.
 */
export const axiosClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});
