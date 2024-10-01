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
      }, 3000); // Auto-hide after 3 seconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [alert, setAlert]);

  const handleCloseAlert = () => {
    setVisible(false);
    setAlert({ ...alert, open: false });
  };

  return (
    <div className={`alert-container ${alert.type} ${visible ? "show" : "hide"}`}>
      <div className="alert-content">
        {alert.message}
        <button 
          className="close-btn" 
          onClick={handleCloseAlert} 
          aria-label="Close Alert"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
