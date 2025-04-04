import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import XmlDisplay from "../components/XmlDisplay";
import api from "../Api";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [userName, setUserName] = useState(""); // State to hold the user's full name
  const [xmlData, setXmlData] = useState(""); // State to hold the converted XML data
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      if (token) {
        try {
          const response = await api.get("/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { firstName, lastName } = response.data;
          setUserName(`${firstName} ${lastName}`); // Combine first and last name
        } catch (err) {
          console.error("Error fetching user name:", err);
        }
      }
    };

    fetchUserName();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>PDF to XML Converter</h1>
        <div className={styles.navLinks}>
          {token && (
            <>
              <span className={styles.userName}>Welcome, {userName}!</span>
              <Link to="/history" className={styles.navLink}>
                History
              </Link>
              <Link to="/profile" className={styles.navLink}>
                Profile
              </Link>
              <button onClick={handleLogout} className={styles.navButton}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {!token ? (
          // Show Login and Register options if the user is not logged in
          <div className={styles.authOptions}>
            <h2 className={styles.welcomeMessage}>Welcome to PDF to XML Converter</h2>
            <p className={styles.description}>
              Easily convert your PDF files to XML format. Log in or register to get started.
            </p>
            <div className={styles.authButtons}>
              <Link to="/login">
                <button className={styles.authButton}>Login</button>
              </Link>
              <Link to="/register">
                <button className={styles.authButton}>Register</button>
              </Link>
            </div>
          </div>
        ) : (
          // Show the file upload and XML display functionality if the user is logged in
          <div className={styles.uploadSection}>
            <FileUpload setXmlData={setXmlData} />
            <XmlDisplay xmlData={xmlData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;