import Link from "next/link";
import styled from "styled-components";

import { Form, Input, Button } from "antd";
import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

import useInput from "../hooks/useInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    dispatch(login(email, password));
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="e-mail"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>

      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>

      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default LoginForm;
