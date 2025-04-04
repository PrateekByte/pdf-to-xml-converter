import React, { useState } from "react";
import api from "../Api";
import styles from "./FileUpload.module.css"; // Import CSS module

const FileUpload = ({ setXmlData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file); // Ensure the key matches the multer configuration

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await api.post("/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      setXmlData(response.data.xmlData); // Update XML data in HomePage
      setError("");
    } catch (err) {
      console.error("Error uploading file:", err); // Log the error
      setError(err.response?.data?.message || "Error uploading file. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload PDF File</h2>
      <div className={styles.inputContainer}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className={styles.input}
        />
        <button onClick={handleUpload} className={styles.button}>
          Upload
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FileUpload;