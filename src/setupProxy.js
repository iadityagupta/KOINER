import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news'); // Request to the proxy endpoint
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      <ul>
        {newsData.map((newsItem) => (
          <li key={newsItem.id}>
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
