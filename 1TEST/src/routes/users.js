const express = require("express");
const mysql = require("mysql2/promise");

const { dbconfig } = require("../config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`SELECT id, name, email, address FROM users`);
    await con.end();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: "error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `INSERT INTO users (name, email, address) values (${con.escape(
        user.name
      )}, ${con.escape(user.email)}, ${con.escape(user.address)})`
    );
    await con.end();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: "error" });
  }
});


module.exports = router;
