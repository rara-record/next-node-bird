import Link from "next/link";
import PropTypes from "prop-types";

import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  message,
  Popconfirm,
  Popover,
  Tooltip,
} from "antd";
import {
  AlertOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

function PostCard({ post }) {
  const onZoomPost = useCallback(() => {}, []);

  const onRetweet = useCallback(() => {}, []);

  const onUnlikePost = useCallback(() => {}, []);

  const onToggleComment = useCallback(() => {}, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        actions={[
          <ZoomInOutlined key="zoom" title="자세히" onClick={onZoomPost} />,
          <RetweetOutlined key="retweet" title="리트윗" onClick={onRetweet} />,
          <HeartTwoTone
            twoToneColor="#eb2f96"
            title="좋아요"
            key="heart"
            onClick={onUnlikePost}
          />,
          <MessageOutlined
            key="message"
            title="댓글"
            onClick={onToggleComment}
          />,
        ]}
      >
        {/* <Content />
        <Buttons></Buttons> */}
      </Card>
      {/* 
      <CommentForm />
      <Comments /> */}
    </div>
  );
}

export default PostCard;
