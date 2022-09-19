const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch");

const { port, dbconfig } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    try {
        const randomUsers = await fetch("https://jsonplaceholder.typicode.com/users", {
          method:"GET"
        });
        console.log(randomUsers);
    const randomUsersResponse = await randomUsers.json();
    const userName = randomUsersResponse.name;
    console.log(userName);
      const con = await mysql.createConnection(dbconfig);
      const [response] = await con.execute(`INSERT INTO users (name) VALUES (${mysql.escape(userName)}) `);
    //   const [response] = await con.execute(`SELECT * FROM users`);
      await con.end();
      res.send(response);
    } catch (e) {
      res.status(400).send({ error: 'Error' });
    }
  });


app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));