const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");

const {port} = require('./config');

const users = require("./routes/users");
const names = require("./routes/names");
const emails = require("./routes/emails");
const address = require("./routes/address");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/users/names", names);
app.use("/users/emails", emails);
app.use("/users/address", address);


app.all('*', (req, res) => {
    res.status(404).send({ error: 'Page not found' });
  });
  
  
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));