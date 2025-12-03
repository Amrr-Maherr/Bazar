import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import types and slices
import { BookDetails } from '@/Types/BookTypes';
import favoritesSlice from './slices/favoritesSlice';



// REDUX STORE CONFIGURATION - SIMPLIFIED TO ONLY FAVORITES
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'], // Only persist favorites
};

// Create reducer manually from slice (since we're using old pattern)
const rootReducer = combineReducers({
  favorites: (state = favoritesSlice.initialState, action: any) => {
    switch (action.type) {
      case 'favorites/addToFavorites':
        return favoritesSlice.reducers.addToFavorites(state, action);

      case 'favorites/removeFromFavorites':
        return favoritesSlice.reducers.removeFromFavorites(state, action);

      default:
        return state;
    }
  },
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Export action creators for slices
export const favoritesActions = {
  addToFavorites: (book: BookDetails) => ({ type: 'favorites/addToFavorites', payload: book }),
  removeFromFavorites: (bookId: number) => ({ type: 'favorites/removeFromFavorites', payload: bookId }),
};
