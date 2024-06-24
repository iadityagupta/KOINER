import React, { useEffect, useState } from 'react';
import { Baseurl } from './Baseurl';
import Loader from './Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CoinDetail.css'; // Import the CSS file
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoPulseOutline } from 'react-icons/io5';
import CoinChart from './CoinChart';
import Footer from './Footer';
import Header from './Header';

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);

  const renderCoinDetails = () => {
    if (loading) {
      return <Loader />;
    }

    return (
      <div className="main-content">
        <Header />
        <div className="coin-buttons">
                <button className={`currency-button ${currency === 'inr' ? 'active' : ''}`} onClick={() => setCurrency('inr')}>INR</button>
                <button className={`currency-button ${currency === 'usd' ? 'active' : ''}`} onClick={() => setCurrency('usd')}>USD</button>
              </div>
        <div className="coin-detail">
          <div className="coin-info">
            <div className="coin-header">
              <div className="coin-image">
                {coin.image && coin.image.large && (
                  <img src={coin.image.large} alt={coin.name} />
                )}
              </div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-symbol">{coin.symbol}</div>
            </div>
            <div className="coin-body">
              <div className="coin-price">
                <span className="price-label">Current Price:</span>
                <span className="price-value">{currencySymbol} {coin.market_data.current_price[currency]}</span>
              </div>
              <div className="coin-market">
                <span className="market-label">Market Rank:</span>
                <span className="market-value">#{coin.market_cap_rank}</span>
              </div>
              <div className="coin-change">
                <span className="change-label">24h Change:</span>
                <span className={`change-value ${coin.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)} %
                  {coin.market_data.price_change_percentage_24h > 0 ? (
                    <BiSolidUpArrow className="change-icon up" />
                  ) : (
                    <BiSolidDownArrow className="change-icon down" />
                  )}
                </span>
              </div>
              <div className="coin-description">
                <p>{coin.description && coin.description['en'] && coin.description['en'].split('.')[0]}</p>
              </div>
              
            </div>
          </div>
          <div className="chart-container">
            <CoinChart currency={currency} />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return renderCoinDetails();
};

export default CoinDetails;
