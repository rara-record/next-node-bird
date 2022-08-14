import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #헤시태그 #익스프레스",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state) {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts = [dummyPost, ...state.mainPosts];
      state.imagePaths = [];
    },
    addComment(state, action) {
      const post = find(state.mainPosts, { id: action.payload.PostId });
      state.addCommentLoading = false;
      state.addCommentDone = true;
      post.Comments.unshift(action.payload);
    },
  },
  // extraReducers: (builder) =>
  //   builder
  //   // addPost
  //     .addCase(addPost.pending, (state) => {
  //       state.addPostLoading = true;
  //       state.addPostDone = false;
  //       state.addPostError = null;
  //     })
  //     .addCase(addPost.fulfilled, (state, action) => {
  //       state.addPostLoading = false;
  //       state.addPostDone = true;
  //       state.mainPosts.unshift(action.payload);
  //       state.imagePaths = [];
  //     })
  //     .addCase(addPost.rejected, (state, action) => {
  //       state.addPostLoading = false;
  //       state.addPostError = action.error.message;
  //     })
  //     // addCommnet
  //     .addCase(addComment.pending, (state) => {
  //       state.addCommentLoading = true;
  //       state.addCommentDone = false;
  //       state.addCommentError = null;
  //     })
  //     .addCase(addComment.fulfilled, (state, action) => {
  //       const post = find(state.mainPosts, { id: action.payload.PostId });
  //       state.addCommentLoading = false;
  //       state.addCommentDone = true;
  //       post.Comments.unshift(action.payload);
  //     })
  //     .addCase(addComment.rejected, (state, action) => {
  //       state.addCommentLoading = false;
  //       state.addCommentError = action.error.message;
  //     })
});

export const { addPost, addComment } = postSlice.actions;
export default postSlice;
