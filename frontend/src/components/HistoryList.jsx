import React from "react";
import styles from "./HistoryList.module.css"; // Import CSS module

const HistoryList = ({ history }) => {
  if (!history || history.length === 0) {
    return <p className={styles.noHistory}>No conversion history available.</p>;
  }

  const handleDownload = (xmlData, filename) => {
    const blob = new Blob([xmlData], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Previous Conversions</h2>
      <ul className={styles.list}>
        {history.map((item) => (
          <li key={item._id} className={styles.listItem}>
            <div>
              <h4>Conversion ID: {item._id}</h4>
              <pre className={styles.xmlContent}>{item.xmlData}</pre>
              <button
                onClick={() =>
                  handleDownload(item.xmlData, `conversion_${item._id}.xml`)
                }
                className={styles.button}
              >
                Download XML
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;