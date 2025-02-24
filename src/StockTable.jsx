// import React, { useState } from 'react';

// // Sample Stock Data
// const stockData = [
//   { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 175.12, change: "+1.5%", marketCap: "2.7T" },
//   { id: 2, symbol: "TSLA", name: "Tesla Inc.", price: 189.99, change: "-2.3%", marketCap: "600B" },
//   { id: 3, symbol: "GOOGL", name: "Alphabet Inc.", price: 2850.25, change: "+0.8%", marketCap: "1.8T" },
//   { id: 4, symbol: "AMZN", name: "Amazon.com Inc.", price: 3450.40, change: "-1.2%", marketCap: "1.6T" },
//   { id: 5, symbol: "MSFT", name: "Microsoft Corp.", price: 330.80, change: "+0.9%", marketCap: "2.6T" },
//   { id: 6, symbol: "NVDA", name: "NVIDIA Corp.", price: 750.30, change: "+3.0%", marketCap: "1.2T" },
// ];

// function StockTable() {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [sortBy, setSortBy] = useState({ column: 'symbol', direction: 'asc' });

//   const pageSize = 3; // Number of rows per page

//   // Function to handle sorting
//   const handleSort = (column) => {
//     const newDirection = sortBy.column === column && sortBy.direction === 'asc' ? 'desc' : 'asc';
//     setSortBy({ column, direction: newDirection });
//   };

//   // Sort data
//   const sortedData = [...stockData].sort((a, b) => {
//     if (a[sortBy.column] < b[sortBy.column]) return sortBy.direction === 'asc' ? -1 : 1;
//     if (a[sortBy.column] > b[sortBy.column]) return sortBy.direction === 'asc' ? 1 : -1;
//     return 0;
//   });

//   // Get the current page data
//   const currentData = sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

//   // Pagination handlers
//   const nextPage = () => {
//     if ((currentPage + 1) * pageSize < stockData.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const previousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Stock Assets</h2>
//       <table className="w-full text-left border border-gray-700">
//         <thead className="bg-gray-800">
//           <tr className="border-b border-gray-700">
//             <th
//               onClick={() => handleSort('symbol')}
//               className="p-3 cursor-pointer hover:bg-gray-700"
//             >
//               Symbol
//             </th>
//             <th
//               onClick={() => handleSort('name')}
//               className="p-3 cursor-pointer hover:bg-gray-700"
//             >
//               Company Name
//             </th>
//             <th
//               onClick={() => handleSort('price')}
//               className="p-3 cursor-pointer hover:bg-gray-700"
//             >
//               Price ($)
//             </th>
//             <th
//               onClick={() => handleSort('change')}
//               className="p-3 cursor-pointer hover:bg-gray-700"
//             >
//               Change
//             </th>
//             <th
//               onClick={() => handleSort('marketCap')}
//               className="p-3 cursor-pointer hover:bg-gray-700"
//             >
//               Market Cap
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((row) => (
//             <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-800">
//               <td className="p-3">{row.symbol}</td>
//               <td className="p-3">{row.name}</td>
//               <td className="p-3">{row.price}</td>
//               <td className="p-3">{row.change}</td>
//               <td className="p-3">{row.marketCap}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={previousPage}
//           disabled={currentPage === 0}
//           className="bg-blue-600 px-4 py-2 rounded disabled:bg-gray-500"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={(currentPage + 1) * pageSize >= stockData.length}
//           className="bg-blue-600 px-4 py-2 rounded disabled:bg-gray-500"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StockTable;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StockTable = () => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/stocks")
//       .then(response => {
//         setStocks(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         setError("Failed to load stock data.");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Stock Assets</h2>

//       {/* Loading State */}
//       {loading && <p className="text-center text-gray-600">Loading stocks...</p>}

//       {/* Error Handling */}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Show table only if data exists */}
//       {!loading && !error && stocks.length === 0 && (
//         <p className="text-center text-gray-600">No stock data available.</p>
//       )}

//       {!loading && !error && stocks.length > 0 && (
//         <table className="w-full border-collapse border border-gray-300 shadow-md">
//           <thead>
//             <tr className="bg-gray-800 text-white">
//               <th className="p-3">Symbol</th>
//               <th className="p-3">Company Name</th>
//               <th className="p-3">Price ($)</th>
//               <th className="p-3">Change</th>
//               <th className="p-3">Market Cap</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock) => (
//               <tr key={stock.id} className="border-b border-gray-300 text-center hover:bg-gray-100">
//                 <td className="p-3 font-bold">{stock.symbol}</td>
//                 <td className="p-3">{stock.name}</td>
//                 <td className="p-3">${stock.price ? stock.price.toFixed(2) : "N/A"}</td>
//                 <td className={`p-3 font-bold ${stock.change.includes("+") ? "text-green-500" : "text-red-500"}`}>
//                   {stock.change}
//                 </td>
//                 <td className="p-3">{stock.marketCap}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StockTable;


import React, { useState } from 'react';

// Sample Stock Data
const stockData = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 175.12, change: "+1.5%", marketCap: "2.7T" },
  { id: 2, symbol: "TSLA", name: "Tesla Inc.", price: 189.99, change: "-2.3%", marketCap: "600B" },
  { id: 3, symbol: "GOOGL", name: "Alphabet Inc.", price: 2850.25, change: "+0.8%", marketCap: "1.8T" },
  { id: 4, symbol: "AMZN", name: "Amazon.com Inc.", price: 3450.40, change: "-1.2%", marketCap: "1.6T" },
  { id: 5, symbol: "MSFT", name: "Microsoft Corp.", price: 330.80, change: "+0.9%", marketCap: "2.6T" },
  { id: 6, symbol: "NVDA", name: "NVIDIA Corp.", price: 750.30, change: "+3.0%", marketCap: "1.2T" },
];

function StockTable() {
  const [sortBy, setSortBy] = useState({ column: 'symbol', direction: 'asc' });

  // Function to handle sorting
  const handleSort = (column) => {
    const newDirection = sortBy.column === column && sortBy.direction === 'asc' ? 'desc' : 'asc';
    setSortBy({ column, direction: newDirection });
  };

  // Sort data
  const sortedData = [...stockData].sort((a, b) => {
    if (a[sortBy.column] < b[sortBy.column]) return sortBy.direction === 'asc' ? -1 : 1;
    if (a[sortBy.column] > b[sortBy.column]) return sortBy.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Stock Assets</h2>
      <table className="min-w-full bg-gray-800 text-sm text-gray-300 rounded-lg">
        <thead>
          <tr className="border-b border-gray-700">
            <th
              onClick={() => handleSort('symbol')}
              className="py-3 px-4 cursor-pointer hover:bg-gray-700 text-left"
            >
              <span className="flex justify-between items-center">
                Symbol
                {sortBy.column === 'symbol' && (sortBy.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th
              onClick={() => handleSort('name')}
              className="py-3 px-4 cursor-pointer hover:bg-gray-700 text-left"
            >
              <span className="flex justify-between items-center">
                Company Name
                {sortBy.column === 'name' && (sortBy.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th
              onClick={() => handleSort('price')}
              className="py-3 px-4 cursor-pointer hover:bg-gray-700 text-left"
            >
              <span className="flex justify-between items-center">
                Price ($)
                {sortBy.column === 'price' && (sortBy.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th
              onClick={() => handleSort('change')}
              className="py-3 px-4 cursor-pointer hover:bg-gray-700 text-left"
            >
              <span className="flex justify-between items-center">
                Change
                {sortBy.column === 'change' && (sortBy.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th
              onClick={() => handleSort('marketCap')}
              className="py-3 px-4 cursor-pointer hover:bg-gray-700 text-left"
            >
              <span className="flex justify-between items-center">
                Market Cap
                {sortBy.column === 'marketCap' && (sortBy.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-gray-700 hover:bg-gray-700 ${index % 2 === 0 ? 'bg-gray-900' : ''}`}
            >
              <td className="py-3 px-4">{row.symbol}</td>
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">${row.price}</td>
              <td className={`py-3 px-4 ${row.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {row.change}
              </td>
              <td className="py-3 px-4">{row.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
