import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Modals = "auth" | "history";

interface IModalState {
  currentModal: Modals | null;
}

const initialState: IModalState = {
  currentModal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<Modals | null>) => {
      state.currentModal = action.payload;
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
