import { configureStore, createStore } from "@reduxjs/toolkit";
import { charactersAPI } from "./reduxData/characters.api";

export const store = configureStore({
  reducer: { [charactersAPI.reducerPath]: charactersAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;