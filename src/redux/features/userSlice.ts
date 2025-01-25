import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  email: string | null;
  userId: string | null;
  userRole: string | null;
}

interface IBaseState {
  token: string | null;

  user: IUserState | null;
}

const initialState: IBaseState = {
  token: null,

  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
    // setIsLoading: (state, action: PayloadAction<boolean>) => {
    //   state.isLoading = action.payload;
    // },
    // Action to remove the token (log out)
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
