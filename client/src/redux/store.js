import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice.js";
import postsSlice from "./posts/postsSlice.js";
import themeSlice from "./theme/themeSlice.js";
import userSlice from "./user/userSlice.js";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLogged", "user"],
};

const persistThemeConfig = {
  key: "mode",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authSlice),
    theme: persistReducer(persistThemeConfig, themeSlice),
    user: userSlice,
    posts: postsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
