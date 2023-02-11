import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import songSliceReducer from './features/songSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    song:songSliceReducer
  },
});
