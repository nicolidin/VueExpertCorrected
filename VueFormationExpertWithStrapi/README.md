# VueFormationExoWithLibCorrectedSimpleWithJsonServer

Version simplifiée et pédagogique du projet Vue utilisant `vue-lib-exo-corrected` et `json-server`.

## 🎯 Objectif

Ce projet est une **version intermédiaire pédagogique** qui simplifie le projet complet en :
- ❌ Supprimant l'authentification et la gestion des users
- ❌ Supprimant le système de persistence avec queue
- ✅ Utilisant des appels API directs vers json-server
- ✅ Gardant la création offline-first (création immédiate dans le store)

## 🚀 Démarrage

### Prérequis

1. Démarrer le json-server :
```bash
cd ../note-mock-api-idiomatique
npm start
# ou
yarn start
```

Le serveur json-server doit tourner sur `http://localhost:3001`

### Installation

```bash
npm install
# ou
yarn install
```

### Développement

```bash
npm run dev
# ou
yarn dev
```

## 📦 Structure du projet

```
src/
├── api/              # Appels API vers json-server
│   ├── axios.ts      # Configuration axios (baseURL: localhost:3001)
│   ├── noteApi.ts    # API pour les notes
│   └── tagApi.ts     # API pour les tags
├── stores/           # Stores Pinia
│   └── notes.ts      # Store des notes et tags (sans persistence queue)
├── views/            # Pages Vue
│   ├── Home.vue      # Page principale
│   ├── Note.vue      # Détail d'une note
│   └── About.vue     # Page à propos
├── types/            # Types TypeScript
│   ├── NoteType.ts   # Type pour les notes
│   └── TagType.ts    # Type pour les tags
└── router/           # Routes Vue Router (sans guards d'auth)
```

## 🔄 Différences avec la version complète

| Aspect | Version complète | Version simplifiée |
|--------|------------------|-------------------|
| Authentification | ✅ JWT avec login/register | ❌ Supprimée |
| Users | ✅ Gestion des users | ❌ Supprimée |
| Persistence | ✅ Queue avec retry et orchestrator | ❌ Supprimée |
| Appels API | ✅ Via persistence queue | ✅ Appels directs après création |
| Backend | ✅ express-mongo-ts | ✅ json-server (note-mock-api-idiomatique) |
| Offline-first | ✅ Avec queue de persistence | ✅ Création immédiate, API après |

## 🎓 Fonctionnement

### Création d'une note

1. L'utilisateur crée une note dans l'interface
2. La note est **immédiatement ajoutée au store** (offline-first)
3. Un **appel API direct** est fait vers json-server pour persister
4. En cas d'erreur, la note reste dans le store (pas de rollback automatique)

### Modification/Suppression

- Même principe : modification immédiate dans le store + appel API direct
- Pas de queue, pas de retry automatique
- Gestion d'erreur basique (logs console)

## 🔌 Configuration

### Base URL de l'API

Par défaut, l'API pointe vers `http://localhost:3001`.

Pour changer, créer un fichier `.env` :

```env
VITE_API_BASE_URL=http://localhost:3001
```

## 📝 Notes importantes

- **Pas de gestion d'erreur avancée** : Les erreurs API sont loggées mais ne bloquent pas l'interface
- **Pas de retry automatique** : Si l'API est down, les données restent en local (localStorage)
- **Pas d'authentification** : Toutes les données sont partagées (pas de userId)
- **Structure idiomatique** : Les modèles sont alignés avec express-mongo-ts (frontId, tagsFrontId, etc.)

## 🎯 Cas d'usage pédagogique

Ce projet est idéal pour :
- Apprendre les appels API REST avec Vue
- Comprendre le pattern offline-first sans la complexité de la persistence queue
- Se familiariser avec Pinia et la gestion d'état
- Comprendre la structure de données avant de passer à la version complète

## 🚧 Prochaines étapes

Pour passer à la version complète :
1. Ajouter l'authentification (JWT)
2. Implémenter le système de persistence avec queue
3. Migrer vers express-mongo-ts
4. Ajouter la gestion des users
