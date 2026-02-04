import { computed, type Ref, type ComputedRef } from 'vue'
import type { NoteType } from '@/types/NoteType'

/**
 * Composable pour filtrer une liste de notes selon un champ de recherche
 * @param notes - Liste réactive de notes à filtrer
 * @param searchQuery - Champ de recherche réactif
 * @returns Liste filtrée des notes (computed)
 */
export function useSearch(
  notes: Ref<NoteType[]> | ComputedRef<NoteType[]>,
  searchQuery: Ref<string>
): { filteredNotes: ComputedRef<NoteType[]> } {
  const filteredNotes = computed(() => {
    // Si le champ de recherche est vide, retourner toutes les notes
    if (!searchQuery.value.trim()) {
      return notes.value
    }

    // Filtrer les notes dont le contenu correspond à la recherche (insensible à la casse)
    const query = searchQuery.value.toLowerCase().trim()
    return notes.value.filter((note: NoteType) => {
      return note.contentMd.toLowerCase().includes(query)
    })
  })

  return {
    filteredNotes
  }
}



