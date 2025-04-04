// filepath: [HistoryPage.jsx](http://_vscodecontentref_/7)
import React, { useEffect, useState } from "react";
import api from "../Api"; // Use centralized API configuration
import HistoryList from "../components/HistoryList";
import styles from "./HistoryPage.module.css"; // Import CSS module

const HistoryPage = () => {
  const [history, setHistory] = useState([]); // Initialize history as an empty array
  const [error, setError] = useState(""); // Add error state for better debugging

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await api.get("/history", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        setHistory(response.data); // Set the fetched history
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to fetch history. Please try again later.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Conversion History</h1>
      {error && <p className={styles.error}>{error}</p>}
      <HistoryList history={history} />
    </div>
  );
};

export default HistoryPage;