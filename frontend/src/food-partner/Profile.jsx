import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

// Removed invalid top-level profile object

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data.foodpartner);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Use real videos from backend foods array, fallback to dummy if none
  const videos = profile && profile.foods && profile.foods.length > 0
    ? profile.foods.map(food => food.video)
    : Array.from({ length: 6 }, (_, i) => `https://www.w3schools.com/html/mov_bbb.mp4`);

  if (loading) {
    return <div className={styles.profileContainer}>Loading...</div>;
  }
  if (!profile) {
    return <div className={styles.profileContainer}>Profile not found.</div>;
  }

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileLogo}>{profile.name ? profile.name[0] : "?"}</div>
        <div className={styles.profileInfo}>
          <div className={styles.businessName}>{profile.name}</div>
          <div className={styles.address}>{profile.address}</div>
          <div className={styles.profileStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{profile.totalMeals || 0}</span>
              <span className={styles.statLabel}>Meals</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{profile.customersServed || 0}</span>
              <span className={styles.statLabel}>Customers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{videos.length}</span>
              <span className={styles.statLabel}>Videos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className={styles.videoGrid}>
        {videos.map((video, idx) => (
          <div className={styles.videoBox} key={idx}>
            <video
              src={video}
              muted
              loop
              playsInline
              className={styles.video}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
