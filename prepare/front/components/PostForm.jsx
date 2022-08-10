import React, { useState, useCallback, useRef } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space } from "antd";

import { useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState("");

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(() => {}, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost());
    setText("");
  }, []);

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

      <Space size={8}>
        {/* {imagePaths.map((v) => <div key={v} style={{ display: 'inline-block '}}>
          <img src={v} style={{width: "200px"}} alt={v} />
          <div>
            <Button>제거</Button>
          </div>
        </div>)} */}
      </Space>
    </Form>
  );
};

export default PostForm;
