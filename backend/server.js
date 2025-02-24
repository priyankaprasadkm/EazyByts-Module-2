// backend/server.js (Node.js + Express)
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQL Server
const sequelize = new Sequelize('tempdb', null, null, {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        trustedConnection: true,
        encrypt: false, // Disable encryption if needed
      },
    },
  });

  const Stock = sequelize.define("Stock", {
    symbol: { type: DataTypes.STRING, allowNull: false, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    change: { type: DataTypes.STRING, allowNull: false },
    marketCap: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: "Stock", timestamps: false });

app.get('/stocks', async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});