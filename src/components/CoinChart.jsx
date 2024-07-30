import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Baseurl } from '../variables/Baseurl';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from './Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);

  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setChartData(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CoinChartData();
  }, [currency, id, days]);

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days in ${currency}`,
        data: chartData.map((value) => value[1]),
        borderColor: 'orange',
        borderWidth: 1.7,
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        tension: 0.2, // Smooth the line
        pointRadius: 0, // Remove the points
        pointHoverRadius: 0, // Remove the points on hover
      },
    ],
  };

  return (
    <>
      {chartData.length === 0 ? (
        <Loader />
      ) : (
        <div className="main-content">
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 0, // Remove the points
                },
              },
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: '#fff', // White text for the legend
                    font: {
                      size: 14,
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: 'orange',
                  borderWidth: 1,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: '#fff', // White text for x-axis labels
                  },
                },
                y: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
                  },
                  ticks: {
                    color: '#fff', // White text for y-axis labels
                  },
                },
              },
            }}
            style={{ marginTop: '5rem', width: '100%', maxWidth: '60rem' }}
          />

          <div className="ccbtn" style={{ marginTop: '30px' }}>
            <button onClick={() => setDays(1)}>24 Hours</button>
            <button onClick={() => setDays(30)}>1 Month</button>
            <button onClick={() => setDays(365)}>1 Year</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinChart;
