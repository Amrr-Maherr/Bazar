import { BookDetails } from '@/Types/BookTypes';
import { Alert } from 'react-native';

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
        // Show success alert
        setTimeout(() => {
          Alert.alert(
            'Added to Bookmarks',
            `${action.payload.title} has been saved to your favorites`,
            [{ text: 'OK' }]
          );
        }, 100);
      } else {
        // Show info alert if already exists
        setTimeout(() => {
          Alert.alert(
            'Already in Bookmarks',
            'This book is already in your favorites',
            [{ text: 'OK' }]
          );
        }, 100);
      }
    },

    removeFromFavorites: (state: FavoritesState, action: { payload: number }) => {
      const bookToRemove = state.favorites.find(book => book.id === action.payload);
      state.favorites = state.favorites.filter(book => book.id !== action.payload);

      if (bookToRemove) {
        // Show success alert
        setTimeout(() => {
          Alert.alert(
            'Removed from Bookmarks',
            `${bookToRemove.title} has been removed from your favorites`,
            [{ text: 'OK' }]
          );
        }, 100);
      }
    },
  },
};

export default favoritesSlice;
