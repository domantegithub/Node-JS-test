require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  dbconfig: {
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE,
    port: process.env.MY_SQL_PORT,
  },
};
