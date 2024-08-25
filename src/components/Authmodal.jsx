import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { CryptoState } from "./CryptoContext";
import { auth } from "./firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Authmodal.css";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const { setAlert } = CryptoState();
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <button className="auth-button" onClick={handleOpen}>
        Login
      </button>
      {open && (
        <div className="modal-backdrop" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button
                className={`tab-button ${value === 0 ? "active" : ""}`}
                onClick={(event) => handleChange(event, 0)}
              >
                Login
              </button>
              <button
                className={`tab-button ${value === 1 ? "active" : ""}`}
                onClick={(event) => handleChange(event, 1)}
              >
                Sign Up
              </button>
            </div>
            <div className="modal-body">
              {value === 0 && <Login handleClose={handleClose} />}
              {value === 1 && <Signup handleClose={handleClose} />}
              <div className="google-signin">
                <span>OR</span>
                <GoogleButton
                  style={{ width: "100%", outline: "none" }}
                  onClick={signInWithGoogle}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
