import axios from 'axios';

const FINNHUB_API_KEY = 'cuqvlghr01qifa4silb0cuqvlghr01qifa4silbg';
const BASE_URL = 'https://finnhub.io/api/v1';

/**
 * Fetch stock quote data (current price, high, low, etc.)
 */
export const getStockQuote = async (symbol) => {
    try {
        const response = await axios.get(`${BASE_URL}/quote`, {
            params: { symbol, token: FINNHUB_API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
};


export const fetchStockData = async (symbol) => {
    try {
        const response = await axios.get(`${BASE_URL}/quote`, {
            params: { symbol, token: FINNHUB_API_KEY }
        });

        console.log("API Response for", symbol, response.data); // Debugging

        if (!response.data || Object.keys(response.data).length === 0) {
            console.error("Invalid response:", response.data);
            return [];
        }

        return [
            {
                date: new Date().toLocaleDateString(),
                close: response.data.c,  // Closing price
            },
        ];
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return [];
    }
};

/**
 * Fetch historical stock market data (for charts)
 */
export const getStockHistoricalData = async (symbol) => {
    try {
        // Calculate the 'from' time (6 weeks ago) and 'to' time (current time)
        const from = Math.floor(Date.now() / 1000) - 6 * 7 * 24 * 60 * 60; // 6 weeks ago
        const to = Math.floor(Date.now() / 1000); // Current time

        const response = await axios.get(`${BASE_URL}/stock/candle`, {
            params: {
                symbol,
                resolution: 'W', // Weekly resolution (data for each week)
                from,
                to,
                token: FINNHUB_API_KEY,
            },
        });

        // Handle invalid response
        if (!response.data || response.data.s !== "ok") {
            console.error("Invalid response for", symbol, response.data);
            return [];
        }

        // Format data for line and bar charts
        const chartData = response.data.t.map((time, index) => ({
            date: new Date(time * 1000).toLocaleDateString(),
            close: response.data.c[index], // Closing price for line chart
            open: response.data.o[index],  // Opening price for bar chart
            high: response.data.h[index],  // High price for bar chart
            low: response.data.l[index],   // Low price for bar chart
        }));

        return chartData;
    } catch (error) {
        console.error(`Error fetching historical data for ${symbol}:`, error);
        return [];
    }
};


/**
 * Fetch stock market news
 */
export const fetchStockNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/news`, {
            params: { category: 'general', token: FINNHUB_API_KEY },
        });

        // Return the news articles
        return response.data.slice(0, 5);
    } catch (error) {
        console.error('Error fetching stock news:', error);
        return [];
    }
};

