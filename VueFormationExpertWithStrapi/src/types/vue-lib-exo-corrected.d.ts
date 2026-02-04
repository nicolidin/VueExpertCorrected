declare module "vue-lib-exo-corrected" {
  import type { DefineComponent } from "vue";

  // Minimal named exports used by this app.
  // (Some published versions can miss their TS declarations.)
  export const ListNote: DefineComponent<any, any, any>;
  export const NoteCreation: DefineComponent<any, any, any>;
  export const TodoList: DefineComponent<any, any, any>;
  export const TodoListVModel: DefineComponent<any, any, any>;
}

