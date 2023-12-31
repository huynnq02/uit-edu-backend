import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    },
  ],
  uploadedTime: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("videos", videoSchema);

export default Video;
