import User from "../models/user.js";
import bcrypt from "bcrypt";

const UserController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Username is already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        username,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      return res.status(201).json({ success: true, message: savedUser });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { name, username, password: hashedPassword },
        { new: true }
      );

      return res.status(200).json({ success: true, message: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, errors: ["Bad Request"] });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate(
        "enrolledCourses.course"
      );
      return res.status(200).json({ success: true, message: user });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ success: false, errors: ["User not found"] });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate("enrolledCourses.course");
      return res.status(200).json({ success: true, message: users });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};

export default UserController;
