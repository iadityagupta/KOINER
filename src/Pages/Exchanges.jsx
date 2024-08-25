import React, { useState, useEffect } from 'react';
import './Exchanges.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cryptoImage from '../Images/hero-crypto.png'
import watchlist from '../Images/watchlist.png';
import library from '../Images/library.png';
import news from '../Images/news.png';
import { useNavigate } from 'react-router-dom';

function Exchanges() {
    const [selectedFeature, setSelectedFeature] = useState('watchlist'); // Set default to 'watchlist'
    const navigate = useNavigate();

    // Use useEffect to set selectedFeature to 'watchlist' on initial render
    useEffect(() => {
        setSelectedFeature('watchlist');
    }, []);

    const handleFeatureClick = (feature) => {
        setSelectedFeature(feature);
    };

    const handleTrackButtonClick = () => {
        navigate('/coins');
    };

    return (
        <>
            <Header />
            <div className="eapp">
                <main className="emain-content">
                    <div className="etext-section">
                    <h1 className='upper'>
                         <span className='highlight'>Empower Your Crypto Journey</span> with the Ultimate Portfolio Tracker
                    </h1>

                    <p>Welcome to Koinly, the leading crypto tracker designed to keep you ahead in the fast-paced world of cryptocurrency. Monitor real-time prices and 24-hour changes of Bitcoin, Ethereum, Litecoin, and over 10,000 altcoins effortlessly. Our comprehensive charts and detailed market analysis provide a clear overview of your portfolio, whether across wallets or exchanges, in your preferred currency.</p>
                   

                        <div className="ebuttons">
                            <button className="etrack-button" onClick={handleTrackButtonClick}>Track the Koins</button>
                            

                        </div>
                    </div>
                    <div className="eimage-section">
                        <img src={cryptoImage} alt="Krypto Tracker" />
                    </div>
                </main>
                <div className='excont'>

                <div className='eswipe'>Read the features below. <br></br>( Hover over it ! )<br></br></div><br></br>

                <section className="efeatures" >
                    <div className="efeature">
                   
                    <div className="eicon">🪙</div>
                    <h2>Your Crypto Portfolio Tracker</h2><br></br>
                    <p> Visualize coin trends through an intuitive portfolio graph, customizable in BTC, ETH, or any fiat or cryptocurrency.</p>
                </div>
                                    <div className="efeature">
                    <div className="eicon">🔗</div>
                    <h2> Market Analysis</h2>
                    <br></br>
                    <p>Get detailed insights into market trends and cryptocurrency performance. Stay updated with real-time data and charts to make informed investment decisions.</p>
                </div>

                <div className="efeature">
                    <div className="eicon">🔔</div>
                    <h2>Latest News and its Analysis </h2><br></br>
                    <p>Stay ahead with top crypto news and sentiment analysis. Understand how news impacts prices with our curated articles and sentiment indicators (positive, negative, neutral).</p>
                </div>

                </section>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br><br></br>
                <br></br>
                

                </div>
<br></br>
<br></br>
                <section className="emarket-overview">
                    <div className="eoverview-image">
                        {selectedFeature === 'watchlist' && <img src={watchlist} alt="Watchlist" />}
                        {selectedFeature === 'library' && <img src={library} alt="Library" />}
                        {selectedFeature === 'news' && <img src={news} alt="News" />}
                    </div>
                    <div className="emarket-features">
                    <div className={`emarket-feature ${selectedFeature === 'watchlist' ? 'open' : ''}`} onClick={() => handleFeatureClick('watchlist')}>
                                <h2>Comprehensive Market Overview & Watchlist</h2>
                                {selectedFeature === 'watchlist' && (
                                    <p>Monitor real-time prices, team information, communications, latest trend charts, track your holdings, and analyze profit/loss for all your coins. Easily manage and add coins to your watchlist for detailed monitoring.</p>
                                )}
                            </div>

                            <div className={`emarket-feature ${selectedFeature === 'library' ? 'open' : ''}`} onClick={() => handleFeatureClick('library')}>
                                <h2>Extensive Crypto Coin Library</h2>
                                {selectedFeature === 'library' && (
                                    <p>Explore an extensive library of cryptocurrencies available within the app. Access detailed information and histories of various coins to make informed investment decisions.</p>
                                )}
                            </div>

                            <div className={`emarket-feature ${selectedFeature === 'news' ? 'open' : ''}`} onClick={() => handleFeatureClick('news')}>
                                <h2>Crypto News & Analysis</h2>
                                {selectedFeature === 'news' && (
                                    <p>Stay informed with curated analysis of the latest crypto news and trends. Understand how news events influence cryptocurrency markets and refine your trading strategies accordingly.</p>
                                )}
                            </div>
                            </div>

                </section>
            </div>
            <Footer />
        </>
    );
}

export default Exchanges;
