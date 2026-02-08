# API Strapi

Ce dossier contient les services API pour communiquer avec Strapi (via le proxy Vite en dev).

## Structure

- **`strapi/notes.ts`** : Notes (fetchNotesApi, fetchNoteApi, postNoteApi, updateNoteApi)
- **`strapi/tags.ts`** : Tags (fetchTagsApi, postTagApi)
- **`strapi/community-pinned-notes.ts`** : Notes épinglées (fetchCommunityPinnedNotesApi, fetchCommunityPinnedNoteApi)
- **`index.ts`** : Export centralisé

## Configuration

En développement, le proxy Vite redirige `/api/strapi/*` vers Strapi. Variables dans `.env` :

- `STRAPI_BASE_URL` : URL de base Strapi (ex. http://localhost:1337)
- `STRAPI_BEARER_TOKEN` : Token Bearer (optionnel)

## Utilisation

```typescript
import {
  fetchNotesApi,
  fetchNoteApi,
  postNoteApi,
  updateNoteApi,
  fetchTagsApi,
  postTagApi,
  fetchCommunityPinnedNotesApi,
  fetchCommunityPinnedNoteApi,
} from '@/api';
```

Les réponses sont mappées en modèles front (NoteType, TagType) via les mappers dans `@/mapper/strapiMappers`.
