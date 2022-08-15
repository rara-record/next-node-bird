import React, { useCallback, useRef, useEffect } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const dispatch = useDispatch();

  const { addPostDone } = useSelector((state) => state.post);
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(() => {}, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Form.Item name="content">
        <Input.TextArea
          id="content"
          value={text}
          onChange={onChangeText}
          name="content"
          maxLength={140}
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="어떤 신기한 일이 있었나요?"
        />
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
        <Button onClick={onClickImageUpload}>
          <UploadOutlined /> 이미지 업로드
        </Button>
        <Button type="primary" htmlType="submit">
          올리기
        </Button>
      </div>

      <Space size={8}></Space>
    </Form>
  );
};

export default PostForm;
