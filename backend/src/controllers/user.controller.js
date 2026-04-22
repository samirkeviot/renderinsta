const { registerUser, loginUser } = require("../services/user.service");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed", 
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { finduser, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      data: finduser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid email or password",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, getMe };
