import mongoose from "mongoose";
import bcrypt from "bcrypt";

let user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  enrolledCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    },
  ],
  numberOfEnrolledCourses: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

const User = mongoose.model("users", user, "users");
export default User;
