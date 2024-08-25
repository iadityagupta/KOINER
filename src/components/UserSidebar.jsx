import React, { useState } from "react";
import { CryptoState } from "./CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { numberWithCommas } from "../Pages/Coins";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

import "./UserSidebar.css";
import defaultUserImage from '../Images/User.png';

const UserSidebar = () => {
  const [state, setState] = useState({
    right: false,
    sidebarOpen: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (open) => () => {
    setState({ right: open, sidebarOpen: open });
    
    if (!open) {
      // Reset to show hamburger menu if sidebar is closed
      document.querySelector('#menu').style.display = 'block';
    } else {
      // Hide hamburger menu when sidebar is open
      document.querySelector('#menu').style.display = 'none';
    }
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful!",
    });
    toggleDrawer(false)();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className="user-sidebar">
      <img
        onClick={toggleDrawer(true)}
        className="avatar"
        src={user.photoURL || defaultUserImage}
        alt={user.displayName || user.email || "user"}
      />
      {state.right && (
        <>
          <div className="overlay" onClick={toggleDrawer(false)}></div>
          <div className="drawer open">
            
              <div className="profile">
                <img
                  className="picture"
                  src={user.photoURL || defaultUserImage}
                  alt={user.displayName || user.email}
                />
                <span className="user-name">
                  {user.displayName || user.email}
                </span>
                <div className="watchlist">
                  <span className="watchlist-title">Watchlist</span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className="coin" key={coin.id}>
                          <span>{coin.name}</span>
                          <span className="coin-details">
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              className="delete-icon"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    return null;
                  })}
                </div>
              
              <button className="logout-button" onClick={logOut}>
                Log Out
              </button>
              </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default UserSidebar;
