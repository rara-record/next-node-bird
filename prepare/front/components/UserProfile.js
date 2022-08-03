import React, { useCallback } from "react";
import Link from "next/link";

import { Avatar, Button, Card } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href="/">
            <a>
              게시글
              <br />1
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />2
            </a>
          </Link>
        </div>,
        <div key="twit">
          <Link href="/profile">
            <a>
              팔로워
              <br />3
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href="/">
            <a>
              <Avatar></Avatar>
            </a>
          </Link>
        }
        title="보라"
      />
      <Button style={{ margin: 15 }} onClick={onLogout}>
        <LogoutOutlined /> 로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
