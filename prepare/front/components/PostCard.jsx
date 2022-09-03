import PropTypes from "prop-types";

import React, { useState, useCallback } from "react";
import { Avatar, Button, Card, Popover, Divider, Popconfirm } from "antd";
import {
  AlertOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import FollowButton from "./FollowButton";
import PostCardContent from "./PostCardContent";
import { removePost } from "../reducers/post";
import { removePostToMe } from "../reducers/user";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const [liked, setliked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onRetweet = useCallback(() => {}, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePost(post.id));
    dispatch(removePostToMe(post.id));
  }, []);

  const onToggleLike = useCallback(() => {
    setliked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={
          post?.Images[0] && (
            <PostImages id={post.User.id} images={post.Images} />
          )
        }
        actions={[
          <RetweetOutlined key="retweet" title="리트윗" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              title="좋아요"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" title="좋아요" onClick={onToggleLike} />
          ),
          <MessageOutlined
            key="message"
            title="댓글"
            onClick={onToggleComment}
          />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>
                      <EditOutlined /> 수정
                    </Button>
                    <Popconfirm
                      title="Are you sure delete this task?"
                      okText="Yes"
                      onConfirm={onRemovePost}
                      cancelText="No"
                    >
                      <Button type="danger" loading={removePostLoading}>
                        <DeleteOutlined /> 삭제
                      </Button>
                    </Popconfirm>
                  </>
                ) : (
                  <Button>
                    <AlertOutlined /> 신고
                  </Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postContent={post.content} />}
        ></Card.Meta>
      </Card>

      {commentFormOpened && (
        <div>
          <Divider plain>{`${post.Comments.length}개의 댓글`}</Divider>
          <CommentList post={post} />
          {id && <CommentForm post={post} />}
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
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
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
