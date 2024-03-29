import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ id, images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && (
          <ImagesZoom id={id} images={images} onClose={onClose} />
        )}
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div>
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />

        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <img
        src={images[0].src}
        alt={images[0].src}
        style={{ width: "50%", display: "inline-block" }}
        role="presentation"
        onClick={onZoom}
      />
      <div
        role="presentation"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 50%)",
          borderRadius: ".5em",
          padding: 10,
          textAlign: "center",
          color: "#fff",
          lineHeight: "30px",
          cursor: "pointer",
        }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostImages;
