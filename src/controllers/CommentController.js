import Comment from "../models/comment.js";

export const CommentController = {
  createComment: async (req, res) => {
    try {
      const { user, content, video } = req.body;

      const newComment = new Comment({
        user,
        content,
        video,
      });

      const savedComment = await newComment.save();

      return res.status(201).json({ success: true, message: savedComment });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  getCommentsByVideo: async (req, res) => {
    try {
      const videoId = req.params.videoId;

      const comments = await Comment.find({ video: videoId })
        .populate("users", "videos")
        .sort({ createdAt: -1 });

      return res.status(200).json({ success: true, message: comments });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
  updateComment: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { content } = req.body;

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return res
          .status(404)
          .json({ success: false, errors: ["Comment not found"] });
      }

      return res.status(200).json({ success: true, message: updatedComment });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const commentId = req.params.commentId;

      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res
          .status(404)
          .json({ success: false, errors: ["Comment not found"] });
      }

      return res
        .status(200)
        .json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};
