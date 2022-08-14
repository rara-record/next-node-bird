import React, { useCallback } from "react";
import Link from "next/link";

import { Avatar, Button, Card } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);
  console.log(me.Followers.length);

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
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉 <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="twit">
          <Link href="/profile">
            <a>
              팔로워 <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title="보라" />
      <Button style={{ margin: 15 }} onClick={onLogout} loading={logoutLoading}>
        <LogoutOutlined /> 로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
