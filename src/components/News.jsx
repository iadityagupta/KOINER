import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Header from './Header';
import { Baseurl } from './Baseurl'; // Ensure Baseurl points to your proxy endpoint (/api)
import './news.css';
import Footer from './footer';

const News = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNewsdata = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/news`); // Using Baseurl as the proxy endpoint
        console.log(data);
        setNews(data.articles || data.data || []);
      } catch (error) {
        setError(error.message);
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

  if (loading) return <Loader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <main>
        <h1 className="news-heading">Latest News</h1>
        <div className="container">
          {news.map((article, index) => (
            // Check if photo is available
            article.thumb_2x && (
              <article
                key={index}
                className={`card ${index % 2 === 0 ? 'shadow' : 'border'} ${index % 3 === 0 ? 'curve' : ''}`}
                onClick={() => handleClick(article.url)}
              >
                <img src={article.thumb_2x} alt={article.title} />
                <div className="card-content">
                  <p className="card-title">{article.title}</p>
                </div>
              </article>
            )
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default News;
