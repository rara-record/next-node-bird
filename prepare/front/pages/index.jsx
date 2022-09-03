import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useInView } from "react-intersection-observer";

import { useDispatch, useSelector } from "react-redux";
import { generateDummyPost, loadPosts } from "../reducers/post";

function Home() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPosts(generateDummyPost(10)));
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <div>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div
          ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
          style={{ height: 10 }}
        />
      </AppLayout>
    </div>
  );
}

export default Home;
