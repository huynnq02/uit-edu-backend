import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Import dotenv for dynamic environment variables

dotenv.config(); // Load environment variables from .env file

export const AuthController = {
  //Region login
  loginUser: async (req, res) => {
    try {
      let user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Username does not exist" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
      const accessToken = jwt.sign(
        { username: req.body.username, email: user.email, userId: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      const refreshToken = jwt.sign(
        {
          username: req.body.username,
          email: user.email,
          userId: user.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      res.setHeader("Access-Token", accessToken);
      res.setHeader("Refresh-Token", refreshToken);

      user.save();
      return res.status(200).json({ success: true, message: "Login success", data: user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region

  checkToken: async (req, res) => {
    return res.status(200).json({ success: true, message: "Token pass" });
  },
};
