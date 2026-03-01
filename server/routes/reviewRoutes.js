const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  addReview,
  getMyReviewForProduct,
  getReviewsByProduct,
  getReviewCountByProduct,
  getAllReviews,
  getReviewCount,
  getReview,
  updateReview,
  deleteReview,
} = require("../controller/reviewController");

const router = express.Router();

// Client – add review (authenticated only)
router.post("/", verifyToken, addReview);
router.get("/count", getReviewCount);
router.get("/all", getAllReviews);
router.get("/product/:productId/my-review", verifyToken, getMyReviewForProduct);
router.get("/product/:productId", getReviewsByProduct);
router.get("/product/:productId/count", getReviewCountByProduct);

// Admin (single + update + delete) – must be after fixed paths
router.get("/:id", getReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
