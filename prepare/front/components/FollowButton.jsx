import React from "react";
import PropTypes from "prop-types";

import { Button } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispath = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispath(unfollow({ userId: post?.User.id }));
    } else {
      dispath(follow({ userId: post?.User.id }));
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    Comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
      })
    ),
    Likers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};
