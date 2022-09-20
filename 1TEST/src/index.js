const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch");

const { port, dbconfig } = require("./config");
const { response } = require("express");
const {users, names, emails, address} = require("./routes")

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/users/names", names);
app.use("/users/emails", emails);
app.use("/users/address", address);


const URL = "https://jsonplaceholder.typicode.com/users";

app.post("/fill", async (req, res) => {
  try {
    const getData = await fetch(URL);
    const data = await getData.json();
    const con = await mysql.createConnection(dbconfig);
    data.forEach(async (element) => {
      const userName = element.name;
      const userEmail = element.email;
      const userAddress = `Street: ${element.address.street}, ${element.address.suite}, City: ${element.address.city}, Zipcode: ${element.address.zipcode}`;
      await con.execute(
        `INSERT INTO users (name, email, address) VALUES (${mysql.escape(
          userName
        )}, ${mysql.escape(userEmail)}, ${mysql.escape(userAddress)}) `
      );
    });
    const [response] = await con.execute(`SELECT * FROM users`);
    await con.end();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Error" });
  }
});


app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
