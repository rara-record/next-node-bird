import { createSlice } from "@reduxjs/toolkit";

const dummyUser = (data) => ({
  ...data,
  nickname: "Bora",
  id: 2,
  Posts: [],
  Followings: [{ test: 1 }],
  Followers: [{ test: 1 }],
});

export const initialState = {
  me: null, // 내 정보
  userInfo: null, // 유저 정보
  loadMyInfoLoading: false, // 로그인 정보 조회
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false, // 유저 정보 조회
  loadUserDone: false,
  loadUserError: null,
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false, // 팔로우
  followDone: false,
  followError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPostToMe(state, action) {
      state.me.Posts.unshift({ id: action.payload });
    },
    removePostToMe(state, action) {
      state.me.Posts = state.me.Posts.filter((v) => v.id !== action.payload);
    },
    login(state, action) {
      state.loginLoading = false;
      state.loginDone = true;
      state.me = dummyUser(action.payload);
    },
    logout(state) {
      state.logoutLoading = false;
      state.logoutDone = true;
      state.me = null;
    },
    signUp(state, action) {
      state.signupLoading = false;
      state.signupDone = true;
      state.signupError = action.payload;
    },
  },
  // extraReducers: (builder) =>
  //   builder
  //     // login
  //     .addCase(login.pending, (state) => {
  //       state.loginLoading = true;
  //       state.loginDone = false;
  //       state.loginError = null;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.loginLoading = false;
  //       state.me = action.payload
  //       state.loginDone = true;
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.loginLoading = false;
  //       state.loginError = action.payload
  //     })
  //     // logout
  //     .addCase(logout.pending, (state) => {
  //       state.logoutLoading = true;
  //       state.logoutDone = false;
  //       state.logoutError = null;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.logoutLoading = false;
  //       state.logoutDone = true;
  //       state.me = null;
  //     })
  //     .addCase(logout.rejected, (state, action) => {
  //       state.logoutLoading = false;
  //       state.logoutError = action.payload;
  //     })
  //     // signup
  //     .addCase(signUp.pending, (state) => {
  //       state.signupLoading = true;
  //       state.signupDone = false;
  //       state.signupError = null;
  //     })
  //     .addCase(signUp.fulfilled, (state) => {
  //       state.signupLoading = false;
  //       state.signupDone = true;
  //     })
  //     .addCase(signUp.rejected, (state, action) => {
  //       state.signupLoading = false;
  //       state.signupError = action.payload;
  //     })
  //     // addPostToMe
  //     .addCase(addPostToMe.pending, (state) => {
  //       state.addPostToMeLoading = true;
  //       state.addPostToMeDone = false;
  //       state.addPostToMeError = null;
  //     })
  //     .addCase(addPostToMe.fulfilled, (state,action) => {
  //       state.addPostToMeLoading = false;
  //       state.addPostToMeDone = true;
  //       state.me.Posts.unshift({ id: action.payload });
  //     })
  //     .addCase(addPostToMe.rejected, (state, action) => {
  //       state.signupLoading = false;
  //       state.signupError = action.payload;
  //     })
  //     // removePostToMe
  //     .addCase(removePostToMe.pending, (state) => {
  //       state.removePostToMeLoading = true;
  //       state.removePostToMeDone = false;
  //       state.removePostToMeError = null;
  //     })
  //     .addCase(removePostToMe.fulfilled, (state,action) => {
  //       state.removePostToMeLoading = false;
  //       state.removePostToMeDone = true;
  //       state.me.Posts = state.me.Posts.filter((v) => v.id !== action.payload);
  //     })
  //     .addCase(removePostToMe.rejected, (state, action) => {
  //       state.signupLoading = false;
  //       state.signupError = action.payload;
  //     }),
});

export const { login, logout, signUp, addPostToMe, removePostToMe } =
  userSlice.actions;
export default userSlice;
