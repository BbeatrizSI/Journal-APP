import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal';
import { sidebarSlice } from './sidebar';
import { sentimentSlice } from './sentiments';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    sidebar: sidebarSlice.reducer,
    sentiments: sentimentSlice.reducer
  },
})