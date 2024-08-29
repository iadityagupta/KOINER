import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Baseurl } from '../variables/Baseurl';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Heart from '../Images/love.png';
import './Coins.css';
import { CryptoState } from "../components/CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/firebase";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(15);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const { user, watchlist } = CryptoState();
  const currencySymbol = currency === 'inr' ? '₹' : '$';

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setAlert({
          open: true,
          message: "Failed to fetch coin data",
          type: "error",
        });
      }
    };

    getCoinsData();
  }, [currency]);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins
    .filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="mains-content">
            <div className="headings-container">
              <h1>Track your favourite Koins</h1>
              <p>
                Stay informed and up-to-date with the latest prices, trends, and comprehensive historical charts of your favorite cryptocurrencies.
                <br />
                Monitor real-time market movements, analyze price trends over different timeframes, and gain valuable insights into the performance of your investments.
              </p>
            </div>
            <div className="searchs-bar">
              <input
                type="text"
                placeholder="Search Your Coins"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="btnss">
                <button onClick={() => setCurrency('inr')}>INR</button>
                <button onClick={() => setCurrency('usd')}>USD</button>
              </div>
            </div>
            <div className="tables-container">
              <table className="coins-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Wishlist</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCoins.map((coindata, i) => (
                    <CoinRow
                      key={i}
                      coindata={coindata}
                      currencySymbol={currencySymbol}
                      setAlert={setAlert}
                      user={user}
                      watchlist={watchlist}
                    />
                  ))}
                </tbody>
              </table>
              <Pagination
                coinsPerPage={coinsPerPage}
                totalCoins={coins.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
          <Footer />
          {alert.open && (
            <div className={`alert ${alert.type}`}>
              {alert.message}
            </div>
          )}
        </>
      )}
    </>
  );
};

const CoinRow = ({ coindata, currencySymbol, setAlert, user, watchlist }) => {
  const [clicked, setClicked] = useState(false);

  const inWatchlist = watchlist.includes(coindata?.id);

  const toggleWishlist = async () => {
    if (!user) {
      setAlert({
        open: true,
        message: "Please log in to add or remove coins from your watchlist.",
        type: "warning",
      });
      return;
    }

    setClicked(!clicked);

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      if (inWatchlist) {
        await setDoc(
          coinRef,
          { coins: watchlist.filter((wish) => wish !== coindata?.id) },
          { merge: true }
        );
        setAlert({
          open: true,
          message: `${coindata.name} Removed from the Watchlist!`,
          type: "success",
        });
      } else {
        await setDoc(
          coinRef,
          { coins: watchlist ? [...watchlist, coindata?.id] : [coindata?.id] },
          { merge: true }
        );
        setAlert({
          open: true,
          message: `${coindata.name} Added to the Watchlist!`,
          type: "success",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const profit = coindata.price_change_percentage_24h > 0;

  return (
    <tr>
      <td><img src={coindata.image} alt={coindata.name} height="40px" /></td>
      <td>
        <Link to={`/coins/${coindata.id}`}>{coindata.name}</Link>
      </td>
      <td>{currencySymbol} {coindata.current_price.toFixed(2)}</td>
      <td style={{ color: profit ? 'green' : 'red' }}>
        {profit ? '+' : ''}{coindata.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>
        <img
          src={Heart}
          alt="wishlist"
          style={{ filter: clicked || inWatchlist ? 'invert(31%) sepia(98%) saturate(3288%) hue-rotate(348deg) brightness(101%) contrast(110%)' : 'invert(100%) sepia(0%) saturate(7481%) hue-rotate(284deg) brightness(117%) contrast(101%)' }}
          onClick={toggleWishlist}
        />
      </td>
    </tr>
  );
};

const Pagination = ({ coinsPerPage, totalCoins, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Coins;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
