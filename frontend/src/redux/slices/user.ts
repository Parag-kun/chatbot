import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICurrentUser {
  currentUser: {
    _id: string;
    email: string;
    role: string;
  } | null;
}

const initialState: ICurrentUser = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<ICurrentUser["currentUser"]>
    ) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
