import React, { useRef, useState } from "react";
import styles from "./CreateFood.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const videoInputRef = useRef();
  const Navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("video", videoFile);
    formdata.append("name", name);
    formdata.append("description", description);

    const respone = await axios.post("http://localhost:3000/api/food", formdata, {
      withCredentials: true,
    })

    console.log(respone.data);
    Navigate("/");
  }

  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Food Video</h2>
      <form className={styles.form}>
        {/* Video Upload */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="video">
            Food Video
          </label>
          <div className={styles.videoUploadArea}>
            {!videoPreview && (
              <>
                <svg className={styles.uploadIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--color-input-bg)" />
                  <path d="M12 16v-8" />
                  <path d="M8 12l4-4 4 4" />
                </svg>
                <input
                  className={styles.videoInput}
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  ref={videoInputRef}
                  onChange={handleVideoChange}
                />
                <span className={styles.uploadText}>Click or drag to upload video</span>
              </>
            )}
            {videoPreview && (
              <div className={styles.videoPreviewWrapper}>
                <video className={styles.videoPreview} src={videoPreview} controls width="220" />
                <button type="button" className={styles.removeButton} onClick={handleRemoveVideo}>
                  Remove Video
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Food Name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Food Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="Enter food name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            className={styles.textarea}
            id="description"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} className={styles.button} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
