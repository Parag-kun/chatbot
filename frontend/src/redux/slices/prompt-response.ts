import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPromptResponse {
  prompt: string;
  response: string;
}

interface IPromptResponseState {
  promptResponses: IPromptResponse[];
}

const initialState: IPromptResponseState = {
  promptResponses: [],
};

const promptResponseSlice = createSlice({
  name: "prompt-response",
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<string>) => {
      const arrayLength = state.promptResponses.length;

      if (arrayLength === 0) {
        throw new Error("No prompt available for response");
      }

      const lastPromptResponse = state.promptResponses[arrayLength - 1];

      lastPromptResponse.response = action.payload;
    },
    addPrompt: (state, action: PayloadAction<string>) => {
      state.promptResponses.push({ prompt: action.payload, response: "" });
    },
    setPromptResponses: (state, action: PayloadAction<IPromptResponse[]>) => {
      state.promptResponses = action.payload;
    },
  },
});

export const { addPrompt, addResponse, setPromptResponses } =
  promptResponseSlice.actions;

export default promptResponseSlice.reducer;
