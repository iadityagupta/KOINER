import React, { useState, useEffect } from 'react';
import './Exchanges.css';
import Header from './Header';
import Footer from './Footer';
import cryptoImage from '../hero-crypto.png';
import watchlist from '../watchlist.png';
import library from '../library.png';
import news from '../news.png';
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
                        <h1>The best crypto portfolio tracker for Bitcoin & altcoins</h1>
                        <p>Delta is the ultimate Crypto tracker. Keep track of all your coins, including Bitcoin, Ethereum, Litecoin, and over 10,000 altcoins. Use our free app to keep an overview of your portfolio across wallets and exchanges, and get the latest prices and market charts in your local currency. Then add some alerts to ensure you don’t miss out on the next big cycle.</p>
                        <div className="ebuttons">
                            <button className="etrack-button" onClick={handleTrackButtonClick}>Track my Coins</button>
                            <button className="elearn-button">Learn more</button>
                        </div>
                    </div>
                    <div className="eimage-section">
                        <img src={cryptoImage} alt="Crypto Tracker" />
                    </div>
                </main>

                <section className="efeatures">
                    <div className="efeature">
                        <div className="eicon">🪙</div>
                        <h2>Your crypto portfolio manager</h2>
                        <p>A crypto tracker with a clear overview of your total portfolio balance and profit/loss since your very first venture into the cryptoverse or in the last 24 hours. See the trend of your coins through an intuitive portfolio graph, displayed in BTC, ETH, or any fiat or crypto of your choice.</p>
                    </div>
                    <div className="efeature">
                        <div className="eicon">🔗</div>
                        <h2>Connect with crypto wallets and exchanges</h2>
                        <p>Connect your portfolio with your favorite wallets and exchanges. We automatically track transactions and gas fees so you get a fast, easy, and straightforward overview of your portfolio.</p>
                    </div>
                    <div className="efeature">
                        <div className="eicon">🔔</div>
                        <h2>Personalize your notifications</h2>
                        <p>Never miss out on the next bull run or stablecoin collapse. Delta also comes with pre-personalized notifications based on your app behavior.</p>
                    </div>
                </section>

                <section className="emarket-overview">
                    <div className="eoverview-image">
                        {selectedFeature === 'watchlist' && <img src={watchlist} alt="Watchlist" />}
                        {selectedFeature === 'library' && <img src={library} alt="Library" />}
                        {selectedFeature === 'news' && <img src={news} alt="News" />}
                    </div>
                    <div className="emarket-features">
                        <div className={`emarket-feature ${selectedFeature === 'watchlist' ? 'open' : ''}`} onClick={() => handleFeatureClick('watchlist')}>
                            <h2>Market overview & watchlist</h2>
                            {selectedFeature === 'watchlist' && (
                                <p>Check current prices, team info, communications, the latest trend charts, your holdings, and profit/loss for all of your coins. Or add coins to your watchlist to keep track of specific cryptocurrencies.</p>
                            )}
                        </div>
                        <div className={`emarket-feature ${selectedFeature === 'library' ? 'open' : ''}`} onClick={() => handleFeatureClick('library')}>
                            <h2>Huge library of crypto coins</h2>
                            {selectedFeature === 'library' && (
                                <p>Display detailed information about the huge library of crypto coins available in the app.</p>
                            )}
                        </div>
                        <div className={`emarket-feature ${selectedFeature === 'news' ? 'open' : ''}`} onClick={() => handleFeatureClick('news')}>
                            <h2>Detailed crypto trading analysis</h2>
                            {selectedFeature === 'news' && (
                                <p>Provide in-depth analysis tools and insights for crypto trading strategies.</p>
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
