import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { List, Comment, Avatar } from "antd";

const CommentList = ({ post }) => {
  return (
    <List
      dataSource={post.Comments}
      itemLayout="horizontal"
      renderItem={(item) => (
        <li>
          <Comment
            author={item.User.nickname}
            avatar={
              <Link href={`/user/${item.User.id}`}>
                <a>
                  <Avatar>{item.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            content={item.content}
          />
        </li>
      )}
    />
  );
};

CommentList.propTypes = {
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
        User: PropTypes.shape({
          id: PropTypes.number.isRequired,
          nickname: PropTypes.string.isRequired,
        }),
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

export default CommentList;
