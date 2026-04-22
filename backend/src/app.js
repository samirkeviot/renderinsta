const express = require("express");
const app = express();
const cors = require("cors");
const cookieparse = require("cookie-parser");
const uesrrouter = require("./routes/user.routes");
const postrouter = require("./routes/post.router");
const likerouter = require("./routes/like.router");

app.use(cors());
app.use(cookieparse());
app.use(express.json());


app.use("/api/users", uesrrouter);
app.use("/api/posts", postrouter);
app.use("/api/likes", likerouter);




module.exports = app;
