import { createSlice } from "@reduxjs/toolkit";
import shortId from "shortid";

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

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 2,
    nickname: "Bora",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 2,
    nickname: "Bora",
  },
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action) {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts = [dummyPost(action.payload), ...state.mainPosts];
      state.imagePaths = [];
    },
    addComment(state, action) {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = state.mainPosts[postIndex];
      post.Comments = [dummyComment(action.payload.content), ...post.Comments];
      state.addCommentLoading = false;
      state.addCommentDone = true;
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
