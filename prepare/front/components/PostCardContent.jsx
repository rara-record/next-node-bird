import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postContent }) => {
  return (
    <div>
      {postContent &&
        postContent.split(/(#[^\s#]+)/g).map((tag, i) => {
          if (tag.match(/(#[^\s#]+)/g)) {
            return (
              <Link key={i} href={`/hashtag/${tag.slice(1)}`}>
                <a>{tag}</a>
              </Link>
            );
          }
          return tag;
        })}
    </div>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
