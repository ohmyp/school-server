const mysql = require("mysql2/promise");

module.exports = async function fetchDB(query) {
  const connection = await mysql.createConnection({
      host: "localhost",
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD
  })
  const [rows, fields] = await connection.execute(query)
  return (rows);
}