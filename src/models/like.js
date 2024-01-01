// like.js
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("likes", likeSchema);

export default Like;
