import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modal";
import userReducer from "./slices/user";
import promptResponseReducer from "./slices/prompt-response";
import chatReducer from "./slices/chat";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    promptResponse: promptResponseReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
