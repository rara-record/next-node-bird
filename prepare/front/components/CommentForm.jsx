import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";

import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch(
      addComment({
        data: { content: commentText, postId: post.id, userId: id },
      })
    );
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item name="content">
        <Input.TextArea
          name="content"
          maxLength={50}
          value={commentText}
          onChange={onChangeCommentText}
          autoSize={{ minRows: 4, maxRows: 4 }}
          placeholder="어떤 신기한 일이 있었나요?"
        />
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type="primary" htmlType="submit">
          댓글달기
        </Button>
      </div>
    </Form>
  );
};

CommentForm.propTypes = {
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

export default CommentForm;
