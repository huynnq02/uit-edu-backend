import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
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
    ref: "Categories", 
  },
});

const Course = mongoose.model("Courses", courseSchema);

export default Course;
