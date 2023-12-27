import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  video: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videos",
    },
  ],
  uploadedTime: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});

const Course = mongoose.model("courses", courseSchema);

export default Course;
