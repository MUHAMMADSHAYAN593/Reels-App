
import React, { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
  const [foodVideos, setFoodVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => {
        // API returns { messege, foodItems: [...] }
        setFoodVideos(res.data.foodItems || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  // Refs for all video elements
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!foodVideos.length) return;
    videoRefs.current = videoRefs.current.slice(0, foodVideos.length);
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };
    const handleIntersect = (entries) => {
      entries.forEach((entry, idx) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersect, observerOptions);
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
      observer.disconnect();
    };
  }, [foodVideos]);

  return (
    <div className={styles["reels-container"]}>
      {loading ? (
        <div style={{ color: "#fff", textAlign: "center", marginTop: "40vh" }}>Loading...</div>
      ) : foodVideos.length === 0 ? (
        <div style={{ color: "#fff", textAlign: "center", marginTop: "40vh" }}>No videos found.</div>
      ) : (
        foodVideos.map((food, idx) => (
          <div className={styles.reel} key={food._id || idx}>
            <video
              className={styles["reel-video"]}
              src={food.video}
              loop
              muted
              playsInline
              ref={el => videoRefs.current[idx] = el}
            />
            <div className={styles["reel-overlay"]}>
              <div className={styles["reel-description"]}>{food.description}</div>
              {food.foodPartner && food.foodPartner._id ? (
                <Link className={styles["reel-btn"]} to={`/food-partner/${food.foodPartner._id}`}>Visit Store</Link>
              ) : (
                <button className={styles["reel-btn"]} disabled>Visit Store</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
