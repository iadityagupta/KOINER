import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Baseurl } from './Baseurl';
import Loader from './Loader';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './Coins.css';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(15);
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
              <h1>Track Your Coins</h1>
              <p>Stay updated with the latest prices and charts of your favorite cryptocurrencies.</p>
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
                  </tr>
                </thead>
                <tbody>
                  {currentCoins.map((coindata, i) => (
                    <CoinRow
                      key={i}
                      coindata={coindata}
                      currencySymbol={currencySymbol}
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
        </>
      )}
    </>
  );
};

const CoinRow = ({ coindata, currencySymbol }) => {
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
