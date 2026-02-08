declare module "vue-lib-exo-corrected" {
  import type { DefineComponent } from "vue";

  // Minimal named exports used by this app.
  // (Some published versions can miss their TS declarations.)
  export const Layout: DefineComponent<any, any, any>;
  export const ListNote: DefineComponent<any, any, any>;
  export const NoteCard: DefineComponent<any, any, any>;
  export const NewNoteCard: DefineComponent<any, any, any>;
  export const NoteCreation: DefineComponent<any, any, any>;
  export const NoteEditor: DefineComponent<any, any, any>;
  export const TodoList: DefineComponent<any, any, any>;
  export const TodoListVModel: DefineComponent<any, any, any>;
  export const DEFAULT_VUETIFY_CONFIG: unknown;
  export function createLidinAppKit(options?: unknown): any;
}

