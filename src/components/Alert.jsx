import React, { useState, useEffect } from "react";
import { CryptoState } from "../components/CryptoContext";
import "./Alert.css";

const Alert = () => {
  const { alert, setAlert } = CryptoState();
  const [visible, setVisible] = useState(alert.open);

  useEffect(() => {
    if (alert.open) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setAlert({ ...alert, open: false });
      }, 3000); // Auto-hide duration
      
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  const handleCloseAlert = (event) => {
    if (event && event.type === "clickaway") {
      return;
    }
    setVisible(false);
    setAlert({ ...alert, open: false });
  };

  return (
    visible && (
      <div className={`alert-container ${alert.type}`} onClick={handleCloseAlert}>
        <div className="alert-content">
          {alert.message}
          <button className="close-btn" onClick={handleCloseAlert}>×</button>
        </div>
      </div>
    )
  );
};

export default Alert;
