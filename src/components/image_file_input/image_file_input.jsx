import React, { memo, useRef, useState } from "react";
import styles from "./image_file_input.module.css";

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (event) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);
    // upload 함수가 실행될 때까지 기다렸다가 업로드되면 변수에 할당
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || "No File"}
        </button>
      )}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
