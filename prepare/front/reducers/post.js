import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import shortId from "shortid";

export const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.internet.userName(),
      },
      content: faker.lorem.paragraph(),
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.internet.userName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
      Images: [
        {
          src: faker.image.imageUrl(),
        },
      ],
    }))
);

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 2,
    nickname: "Bora",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: data.id,
  content: data.content,
  postId: data.postId,
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
    removePost(state, action) {
      state.removePostLoading = false;
      state.removePostDone = true;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== action.payload);
    },
    addComment(state, action) {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = state.mainPosts[postIndex];
      post.Comments = [dummyComment(action.payload), ...post.Comments];
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },
  },
  extraReducers: (builder) => builder,
  // addPost
  // .addCase(addPost.pending, (state) => {
  //   state.addPostLoading = true;
  //   state.addPostDone = false;
  //   state.addPostError = null;
  // })
  // .addCase(addPost.fulfilled, (state, action) => {
  //   state.addPostLoading = false;
  //   state.addPostDone = true;
  //   state.mainPosts.unshift(action.payload);
  //   state.imagePaths = [];
  // })
  // .addCase(addPost.rejected, (state, action) => {
  //   state.addPostLoading = false;
  //   state.addPostError = action.error.message;
  // })
  // // addCommnet
  // .addCase(addComment.pending, (state) => {
  //   state.addCommentLoading = true;
  //   state.addCommentDone = false;
  //   state.addCommentError = null;
  // })
  // .addCase(addComment.fulfilled, (state, action) => {
  //   const post = find(state.mainPosts, { id: action.payload.PostId });
  //   state.addCommentLoading = false;
  //   state.addCommentDone = true;
  //   post.Comments.unshift(action.payload);
  // })
  // .addCase(addComment.rejected, (state, action) => {
  //   state.addCommentLoading = false;
  //   state.addCommentError = action.error.message;
  // })
  // // removePost
  // .addCase(removePost.pending, (state) => {
  //   state.removePostLoading = true;
  //   state.removePostDone = false;
  //   state.removePostError = null;
  // })
  // .addCase(removePost.fulfilled, (state, action) => {
  //   state.removePostLoading = false;
  //   state.removePostDone = true;
  //   state.mainPosts = state.mainPosts.filter((v) => v.id !== action.payload);
  // })
  // .addCase(removePost.rejected, (state, action) => {
  //   state.removePostLoading = false;
  //   state.removePostError = action.error.message;
  // })
});

export const { addPost, removePost, addComment } = postSlice.actions;
export default postSlice;
