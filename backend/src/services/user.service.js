const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  Createuser,
} = require("../repositories/user.repositories");
const { generateAccessToken, refreshtoken } = require("../utils/token");

const registerUser = async (data) => {
  const { name, email, password } = data;

  const checkexistingUser = await findUserByEmail(email);

  if (checkexistingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Createuser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (data) => {
  const { email, password } = data;


  const finduser = await findUserByEmail(email);

  if (!finduser) {
    throw new Error("invalid email or password");
  }


  const matchpassword = await bcrypt.compare(password, finduser.password);
  if (!matchpassword) {
    throw new Error("invalid email or password");
  }



  const accessToken = await generateAccessToken(finduser);


  const refreshToken = await refreshtoken(finduser);

  

  return { finduser, accessToken, refreshToken };
};

module.exports = { registerUser, loginUser };
