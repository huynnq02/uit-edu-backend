import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
        {
          username: req.body.username,
          email: user.email,
          userId: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          username: req.body.username,
          email: user.email,
          userId: user.id,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      // res.setHeader("Access-Token", accessToken);
      // res.setHeader("Refresh-Token", refreshToken);

      user.save();
      return res.status(200).json({
        success: true,
        message: "Login success",
        data: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region

  lockUser: async (req, res) => {
    try {
      const { userId } = req.params;

      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Permission denied" });
      }

      const userToLock = await User.findById(userId);

      if (!userToLock) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      userToLock.isLocked = true;
      await userToLock.save();

      return res.status(200).json({
        success: true,
        message: "User locked successfully",
        data: userToLock,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
