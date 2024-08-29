import React, { useState, useEffect } from "react";
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

  const { user, setAlert, watchlist, coins, symbol, loading, error } = CryptoState();

  useEffect(() => {
    console.log("Watchlist in UserSidebar:", watchlist);
    console.log("Coins in UserSidebar:", coins);
  }, [watchlist, coins]);

  const toggleDrawer = (open) => () => {
    setState({ right: open, sidebarOpen: open });
    
    if (!open) {
      document.querySelector('#menu').style.display = 'block';
    } else {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const watchlistCoins = coins.filter(coin => watchlist.includes(coin.id));

  return (
    <div className="user-sidebar">
      <img
        onClick={toggleDrawer(true)}
        className="avatar"
        src={user?.photoURL || defaultUserImage}
        alt={user?.displayName || user?.email || "user"}
      />
      {state.right && (
        <>
          <div className="overlay" onClick={toggleDrawer(false)}></div>
          <div className="drawer open">
            <div className="profile">
              {/* ... (user profile info) */}
              <div className="watchlist">
                <span className="watchlist-title">Watchlist</span>
                {watchlist.length === 0 ? (
                  <div>No items in watchlist</div>
                ) : watchlistCoins.length === 0 ? (
                  <div>Loading watchlist items...</div>
                ) : (
                  watchlistCoins.map((coin) => (
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
                  ))
                )}
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