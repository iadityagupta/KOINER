import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Baseurl } from './Baseurl';
import Loader from './Loader';
import Header from './Header';
import Footer from './footer';
import { Link } from 'react-router-dom';
import './coins.css';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [coinsPerPage] = useState(15); // Number of coins per page
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

  // Logic to paginate coins
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins
    .filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirstCoin, indexOfLastCoin);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="maincontent">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Your Coins"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
          <div className="coin-list">
            {currentCoins.map((coindata, i) => (
              <CoinCard
                key={i}
                coindata={coindata}
                id={coindata.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
          <Pagination
            coinsPerPage={coinsPerPage}
            totalCoins={coins.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;

  return (
    <Link to={`/coins/${id}`} style={{ color: 'white', textDecoration: 'none' }}>
      <div className="ex-cards">
        <div className="image">
          <img height={'80px'} src={coindata.image} alt="" />
        </div>
        <div className="name">{coindata.name}</div>
        <div className="price">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div style={profit ? { color: 'green' } : { color: 'red' }} className="rank">
          {profit ? '+' + coindata.price_change_percentage_24h.toFixed(2) : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
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
