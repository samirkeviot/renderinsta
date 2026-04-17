const express = require("express");
const app = express();
const cors = require("cors");

const cors = require("cors");
const cookieparse = require("cookie-parser");

app.use(cors());
app.use(cookieparse());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;
