import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBaseState {
  chatOrUserId: string | null;
}

const initialState: IBaseState = {
  chatOrUserId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatOrUserId: (state, action: PayloadAction<string>) => {
      state.chatOrUserId = action.payload;
    },
  },
});

export const { setChatOrUserId } = chatSlice.actions;

export default chatSlice.reducer;
