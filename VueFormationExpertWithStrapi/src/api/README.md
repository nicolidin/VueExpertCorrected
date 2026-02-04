# API Strapi

Ce dossier contient les services API pour communiquer avec Strapi (via le proxy Vite en dev).

## Structure

- **`strapi/notes.ts`** : Notes (fetchNotes, fetchNote, createNoteFront, updateNoteFront)
- **`strapi/tags.ts`** : Tags (fetchTags, createTagFront)
- **`strapi/community-pinned-notes.ts`** : Notes épinglées (fetchCommunityPinnedNotes, fetchCommunityPinnedNote)
- **`index.ts`** : Export centralisé

## Configuration

En développement, le proxy Vite redirige `/api/strapi/*` vers Strapi. Variables dans `.env` :

- `STRAPI_BASE_URL` : URL de base Strapi (ex. http://localhost:1337)
- `STRAPI_BEARER_TOKEN` : Token Bearer (optionnel)

## Utilisation

```typescript
import {
  fetchNotes,
  fetchNote,
  createNoteFront,
  updateNoteFront,
  fetchTags,
  createTagFront,
  fetchCommunityPinnedNotes,
  fetchCommunityPinnedNote,
} from '@/api';
```

Les réponses sont mappées en modèles front (NoteType, TagType) via les mappers dans `@/utils/strapiMappers`.
