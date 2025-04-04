import React from "react";
import styles from "./XmlDisplay.module.css"; // Import CSS module

const XmlDisplay = ({ xmlData }) => {
  if (!xmlData) {
    return <p>No XML data to display.</p>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlData);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlData], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.xml";
    link.click();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Converted XML</h2>
      <pre className={styles.xmlContent}>{xmlData}</pre>
      <div className={styles.buttonGroup}>
        <button onClick={handleCopy} className={styles.button}>
          Copy XML
        </button>
        <button onClick={handleDownload} className={styles.button}>
          Download XML
        </button>
      </div>
    </div>
  );
};

export default XmlDisplay;