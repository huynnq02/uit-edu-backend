import User from "../models/user.js";
import bcrypt from "bcrypt";

const UserController = {
  addBookmark: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { courseId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: ["User not found"] });
      }
      if (
        user.bookmarkedCourses.some((course) => course.course.equals(courseId))
      ) {
        return res
          .status(400)
          .json({ success: false, errors: ["Course already bookmarked"] });
      }

      user.bookmarkedCourses.push({ course: courseId });
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Bookmark added successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
  deleteBookmark: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { courseId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: ["User not found"] });
      }

      user.bookmarkedCourses = user.bookmarkedCourses.filter(
        (course) => !course.course.equals(courseId)
      );

      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Bookmark deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Your email is already taken" });
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
  createAdminUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "This username is already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdminUser = new User({
        name,
        username,
        password: hashedPassword,
        role: "admin",
      });

      const savedAdminUser = await newAdminUser.save();

      return res.status(201).json({ success: true, message: savedAdminUser });
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
