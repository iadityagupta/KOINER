import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import axios from "axios";
import { CoinList } from "../variables/CoinList";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const coinRef = doc(db, "watchlist", user.uid);
        const watchlistUnsubscribe = onSnapshot(coinRef, 
          (coin) => {
            if (coin.exists()) {
              console.log("Watchlist data:", coin.data().coins);
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
              setWatchlist([]);
            }
          },
          (error) => {
            console.error("Error fetching watchlist:", error);
            setError(error.message);
          }
        );

        return () => watchlistUnsubscribe();
      } else {
        setUser(null);
        setWatchlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(CoinList(currency));
      console.log("Fetched coin data:", data);
      setCoins(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
      setError("Failed to fetch coin data. Please try again later.");
      setCoins([]);
    } finally {
      setLoading(false);
    }
  }, [currency]);  // fetchCoins now depends on `currency`

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
  }, [currency, fetchCoins]);  // include fetchCoins in the dependency array

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
        error,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export const CryptoState = () => {
  return useContext(Crypto);
};

export default CryptoContext;
