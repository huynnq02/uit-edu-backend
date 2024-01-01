import Review from "../models/review.js";

export const ReviewController = {
  createReview: async (req, res) => {
    try {
      const { user, rating, review } = req.body;

      const newReview = new Review({
        user,
        rating,
        review,
      });

      const savedReview = await newReview.save();

      return res.status(201).json({ success: true, message: savedReview });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });

      return res.status(200).json({ success: true, message: reviews });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  updateReview: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const { rating, review } = req.body;

      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { rating, review },
        { new: true }
      );

      if (!updatedReview) {
        return res
          .status(404)
          .json({ success: false, errors: ["Review not found"] });
      }

      return res.status(200).json({ success: true, message: updatedReview });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;

      const deletedReview = await Review.findByIdAndDelete(reviewId);

      if (!deletedReview) {
        return res
          .status(404)
          .json({ success: false, errors: ["Review not found"] });
      }

      return res
        .status(200)
        .json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};
