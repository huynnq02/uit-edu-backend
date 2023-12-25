import Comment from "../models/comment.js";

export const CommentController = {
  createComment: async (req, res) => {
    try {
      const { user, content, course } = req.body;

      const newComment = new Comment({
        user,
        content,
        course,
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

  getCommentsByCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;

      const comments = await Comment.find({ course: courseId })
        .populate("Users", "Courses")
        .sort({ createdAt: -1 });

      return res.status(200).json({ success: true, message: comments });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};
