require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log, // optional: enable query logging
  }
);

sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch((err) => console.error('DB Error:', err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.contact = require('./contact.model')(sequelize, DataTypes);

// Use { alter: true } to update the table if model changes
db.sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Sync Error:', err));

module.exports = db;
