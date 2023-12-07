const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Koneksi ke database MySQL
async function connectToDatabase() {
  try {
    console.log('Attempting to connect to the database...');
    // Ganti dbConnection menjadi dbConfig di bawah ini
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error.message);
    throw error;
  }
}


module.exports = {
  connectToDatabase,
};
