
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavoritesState = {
  favoritos: string[];
  toggleFavorito: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoritos: [],

      toggleFavorito: (id: string) =>
        set((state) => ({
          favoritos: state.favoritos.includes(id)
            ? state.favoritos.filter(
                (favorito) => favorito !== id
              )
            : [...state.favoritos, id]
        }))
    }),
    {
      name: 'pulso-favoritos-zustand',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoritos: state.favoritos
      })
    }
  )
);

