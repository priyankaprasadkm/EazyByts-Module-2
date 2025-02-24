import React from 'react'
 import { useState,useEffect } from 'react'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import { getStockQuote, getStockHistoricalData,fetchStockNews} from "./stock-api";
 


 const STOCK_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "TSLA"]; // Stock symbols


function Home() {
  const [stockData, setStockData] = useState({});
  const [stockTrends, setStockTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockNews, setStockNews] = useState([]); // State to store news articles

  {/*Fetching Stock Price for different sock symbols */}
  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        let stockPrices = {};

        // Fetch data for each stock symbol
        for (const symbol of STOCK_SYMBOLS) {
          const data = await getStockQuote(symbol);
          if (data) {
            stockPrices[symbol] = data.c || "N/A"; // 'c' is the closing price
          } else {
            stockPrices[symbol] = "N/A";
          }
        }

        setStockData(stockPrices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data");
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, []);

  // Fetch Stock News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await fetchStockNews();
        setStockNews(news);
      } catch (error) {
        console.error("Error fetching stock news:", error);
      }
    };

    fetchNews();
  }, []);

  const stockTrendData = [
    { date: '2023-02-14', close: 4000, high: 2400, volume: 2400 },
    { date: '2023-02-15', close: 3000, high: 1398, volume: 2210 },
    { date: '2023-02-16', close: 2000, high: 9800, volume: 2290 },
    { date: '2023-02-17', close: 2780, high: 3908, volume: 2000 },
    { date: '2023-02-18', close: 1890, high: 4800, volume: 2181 },
    { date: '2023-02-19', close: 2390, high: 3800, volume: 2500 },
    { date: '2023-02-20', close: 3490, high: 4300, volume: 2100 }
];



  return (
    <main className='main-container'>
        <div className='main-title'>
            {/* <h3>DASHBOARD</h3> */}
        </div>
        
      <div className="main-cards">
        {loading ? (
          <p>Loading stock data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            STOCK_SYMBOLS.map((symbol, index) => (
              <div key={index} className="card">
                <h3>{symbol}</h3>
                <p>Latest Closing Price: ${stockData[symbol]}</p>
              </div>
            ))
          )}
        </div>

        <div className="charts">
        <div className="chart-container">
          {/* LineChart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="close" stroke="#8884d8" />
              <Line type="monotone" dataKey="high" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          {/* BarChart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="close" fill="#8884d8" />
              <Bar dataKey="high" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>



        {/* Stock News Section */}
      <div className="stock-news">
        <h2>Latest Stock Market News</h2>
        {stockNews.length === 0 ? (
          <p>No news available at the moment.</p>
        ) : (
          stockNews.map((newsItem, index) => (
            <div key={index} className="news-card">
              <h3 className="news-title">{newsItem.headline}</h3>
              <p className="news-description">{newsItem.summary}</p>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="news-link">
                Read more
              </a>
            </div>
          ))
        )}
      </div>

        
        
    </main>
  )
}

export default Home