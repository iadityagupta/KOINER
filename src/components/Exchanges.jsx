import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { Baseurl } from './Baseurl';
import Loader from './Loader';
import coin from '../coin.png'; // Ensure these imports are used or remove them if unnecessary
import eth from '../eth.png';
import './Exchanges.css';
// import OurModel from './OurModel';

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [error, setError] = useState(null); // State to hold error information

  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/exchanges`);
        console.log(data);
        setExchanges(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching exchange data:', error);
      } finally {
        setLoading(false);
      }
    };
    getExchangesData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
          <div>
        {exchanges.map((item, i) => (
          <div key={i} className='ex-cards'>
            <div className="image">
              <img height={"80px"} src={item.image} alt={item.name} />
            </div>
            <div className="name">
              {item.name}
            </div>
            <div className="price">
              {item.trade_volume_24h_btc.toFixed(0)}
            </div>
            <div className="rank">
              {item.trust_score_rank}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Exchanges;
