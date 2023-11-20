import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice.interface";

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux(state, action: PayloadAction<UserState>) {
      state.displayName = action.payload.displayName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.urlAvatar = action.payload.urlAvatar;
      state.provider = action.payload.provider;
      state.memberParty = action.payload.memberParty;
      state.ownerParty = action.payload.ownerParty;
    },
    logoutRedux() {
      return initialState;
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
