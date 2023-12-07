//mengimporr module dari package installet (npm install mysql3)
const mysql = require("mysql2/promise");

//membuat connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

//menjadikan function agar bisa di exports
async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error.message);
    throw error;
  }
}

//mengexports function
module.exports = {
  connectToDatabase, // ini nama function nya yang di export
};
