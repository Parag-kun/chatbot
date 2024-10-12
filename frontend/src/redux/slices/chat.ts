import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPromptResponse } from "./prompt-response";

export interface IChat {
  _id: string;
  responses: IPromptResponse[];
}

interface IChatState {
  chats: IChat[];
}

const initialState: IChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
    },
  },
});

export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;
