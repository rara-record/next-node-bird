import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form, Input, Button } from "antd";
import React, { useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    dispatch(login(id, password));
  }, [id, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          name="user-id"
          type="e-mail"
          value={id}
          onChange={onChangeId}
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
        <Button type="primary" htmlType="submit" loading={false}>
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

LoginForm.ReactPropTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
