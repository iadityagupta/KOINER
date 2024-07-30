import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { Baseurl } from '../variables/Baseurl'; // Ensure Baseurl points to your proxy endpoint (/api)
import './News.css';
import Footer from '../components/Footer';
import Sentiment from 'sentiment'; // Import sentiment package

const News = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNewsdata = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/news`); // Using Baseurl as the proxy endpoint
        const articles = data.articles || data.data || [];

        // Initialize sentiment analyzer
        const sentiment = new Sentiment();

        // Filter out articles without images
        const filteredArticles = articles.filter(article => article.thumb_2x && article.thumb_2x !== '');

        // Fetch sentiment analysis for each article title
        const analyzedArticles = filteredArticles.map((article) => ({
          ...article,
          sentiment: analyzeSentiment(article.title, sentiment)
        }));
        setNews(analyzedArticles);
      } catch (error) {
        setError('Error fetching news data. Please try again later.');
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    getNewsdata();
  }, []);

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const analyzeSentiment = (text, sentimentAnalyzer) => {
    const result = sentimentAnalyzer.analyze(text);
    if (result.score > 0) {
      return 'Positive';
    } else if (result.score < 0) {
      return 'Negative';
    } else {
      return 'Neutral';
    }
  };

  if (loading) return <Loader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <main>
      <h1 className="news-heading">Latest News</h1>
        <p className="news-description">
            Stay informed with the latest news that is likely to impact the market. <br></br>Explore our sentiment analysis to understand the potential effects on cryptocurrency prices.
        </p>

        <div className="container">
          {news.length > 0 ? (
            news.map((article, index) => (
              <article
                key={index}
                className={`card ${index % 2 === 0 ? 'shadow' : 'border'} ${index % 3 === 0 ? 'curve' : ''}`}
                onClick={() => handleClick(article.url)}
              >
                {article.thumb_2x && (
                  <img src={article.thumb_2x} alt={article.title} />
                )}
                <div className="card-content">
                  <p className="card-title">{article.title}</p>
                  <p className="sentiment">
                    Sentiment: <strong>{article.sentiment}</strong>
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div>No news articles available</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default News;
