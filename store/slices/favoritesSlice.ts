import { BookDetails } from '@/Types/BookTypes';
import Toast from 'react-native-toast-message';

export interface FavoritesState {
  favorites: BookDetails[];
}

const initialFavoritesState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = {
  name: 'favorites',
  initialState: initialFavoritesState,
  reducers: {
    addToFavorites: (state: FavoritesState, action: { payload: BookDetails }) => {
      const exists = state.favorites.find(fav => fav.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        // Show success toast
        Toast.show({
          type: 'success',
          text1: '✅ Added to Bookmarks',
          text2: `${action.payload.title} has been saved to your favorites`,
          position: 'bottom',
          visibilityTime: 3000,
        });
      } else {
        // Show info toast if already exists
        Toast.show({
          type: 'info',
          text1: 'ℹ️ Already in Bookmarks',
          text2: 'This book is already in your favorites',
          position: 'bottom',
          visibilityTime: 2500,
        });
      }
    },

    removeFromFavorites: (state: FavoritesState, action: { payload: number }) => {
      const bookToRemove = state.favorites.find(book => book.id === action.payload);
      state.favorites = state.favorites.filter(book => book.id !== action.payload);

      if (bookToRemove) {
        // Show success toast
        Toast.show({
          type: 'error', // Red color for removal
          text1: '❌ Removed from Bookmarks',
          text2: `${bookToRemove.title} has been removed`,
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    },
  },
};

export default favoritesSlice;
