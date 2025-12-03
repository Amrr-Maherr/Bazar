import { create } from 'zustand';
import { BookDetails } from '@/Types/BookTypes';

type FavoritesStore = {
  favorites: BookDetails[];
  addToFavorites: (book: BookDetails) => void;
  removeFromFavorites: (bookId: number) => void;
  isFavorite: (bookId: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  addToFavorites: (book: BookDetails) => {
    const currentFavorites = get().favorites;
    if (!currentFavorites.find(fav => fav.id === book.id)) {
      set({ favorites: [...currentFavorites, book] });
    }
  },
  removeFromFavorites: (bookId: number) => {
    set({
      favorites: get().favorites.filter(book => book.id !== bookId)
    });
  },
  isFavorite: (bookId: number) => {
    return get().favorites.some(book => book.id === bookId);
  },
}));
