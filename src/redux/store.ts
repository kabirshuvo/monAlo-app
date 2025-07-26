import { configureStore } from '@reduxjs/toolkit';

// Example: Empty reducer
export const store = configureStore({
  reducer: {
    // products: productsReducer, // add later
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
