const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch");

const { port, dbconfig } = require("./config");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const URL = "https://jsonplaceholder.typicode.com/users";

app.get('/', async (req, res) => {
    try {
        const getData = await fetch(URL);
        const data = await getData.json();
    const userName = data[0].name;
    const userEmail=data[0].email;
    const userAdress = data[0].address.street;
    const con = await mysql.createConnection(dbconfig);
    await con.execute(`INSERT INTO users (name, email, address) VALUES (${mysql.escape(userName)}, ${mysql.escape(userEmail)}, ${mysql.escape(userAdress)}) `);
    const [response] = await con.execute(`SELECT * FROM users`);
    await con.end();
    console.log(userName, userEmail);
    res.send(response);
    } catch (e) {
      res.status(400).send({ error: 'Error' });
    }
  });


app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));