import React, { useState, useEffect } from "react";
import api from "../Api";
import styles from "./ProfilePage.module.css"; // Import CSS module

const ProfilePage = () => {
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // Toggle for current password
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle for new password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data); // Prefill profile data
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile. Please try again later.");
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        "/profile",
        { firstName: profile.firstName, lastName: profile.lastName, email: profile.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        "/profile/password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Profile</h1>

      {/* Profile Update Form */}
      <form onSubmit={handleUpdateProfile}>
        <div className={styles.formGroup}>
          <label className={styles.label}>First Name:</label>
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Last Name:</label>
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Update Profile
        </button>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handleChangePassword} className={styles.passwordForm}>
        <h2 className={styles.subHeading}>Change Password</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Current Password:</label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className={styles.showPasswordButton}
            >
              {showCurrentPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>New Password:</label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={styles.showPasswordButton}
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          Change Password
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default ProfilePage;