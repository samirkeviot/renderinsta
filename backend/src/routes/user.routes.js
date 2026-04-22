

const express = require("express");
const { register, login, getMe } = require("../controllers/user.controller");
const authmiddleware = require("../middleware/auth.middleware");

const uesrrouter = express.Router();

uesrrouter.post("/register", register)
uesrrouter.post("/login",login)
uesrrouter.get("/me",authmiddleware ,getMe)




module.exports = uesrrouter