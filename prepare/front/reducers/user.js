import { createSlice } from "@reduxjs/toolkit";

const dummyUser = {
  id: 1,
  nickname: "제로초",
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.me = dummyUser;
      state.loginData = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    signUp(state, action) {
      state.signUpData = action.payload;
    },
  },
});

export const { login, logout, signUp } = userSlice.actions;
export default userSlice;
