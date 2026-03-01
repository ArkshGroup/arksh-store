const ApiError = require("../errors/api-error");
const mongoose = require("mongoose");
const Review = require("../models/Review");
const Product = require("../models/Product");

// Add a review (client) – authenticated users only, one review per user per product
module.exports.addReview = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(401, "You must be logged in to submit a review");
    }
    const { productId, rating, comment } = req.body;
    if (!productId || comment === undefined) {
      throw new ApiError(400, "Product and comment are required");
    }
    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      throw new ApiError(400, "Rating must be between 1 and 5");
    }
    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) {
      throw new ApiError(400, "You have already reviewed this product");
    }

    const review = new Review({
      product: productId,
      user: userId,
      name: req.user.name || "User",
      rating: numRating,
      comment: comment.trim(),
      status: "approved",
    });
    await review.save();
    const populated = await Review.findById(review._id).populate("product", "title image");
    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// Get current user's review for a product (client – optional auth)
module.exports.getMyReviewForProduct = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({ success: true, hasReviewed: false, data: null });
    }
    const { productId } = req.params;
    const review = await Review.findOne({
      product: productId,
      user: userId,
      status: "approved",
    })
      .select("_id rating comment createdAt")
      .lean();
    res.status(200).json({
      success: true,
      hasReviewed: !!review,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews for a product (client – only approved)
module.exports.getReviewsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = { product: productId, status: "approved" };
    const [data, total] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("name rating comment createdAt")
        .lean(),
      Review.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get review count for a product (client)
module.exports.getReviewCountByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const count = await Review.countDocuments({ product: productObjectId, status: "approved" });
    const agg = await Review.aggregate([
      { $match: { product: productObjectId, status: "approved" } },
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    const averageRating = agg[0] ? Math.round(agg[0].avg * 10) / 10 : 0;
    res.status(200).json({
      success: true,
      count,
      averageRating,
    });
  } catch (error) {
    next(error);
  }
};

// Get all reviews (admin + client reviews page)
module.exports.getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, productId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (productId) filter.product = productId;
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("product", "title image")
        .lean(),
      Review.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get total review count (admin + client)
module.exports.getReviewCount = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const count = await Review.countDocuments(filter);
    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    next(error);
  }
};

// Get single review (admin)
module.exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("product", "title image")
      .lean();
    if (!review) throw new ApiError(404, "Review not found");
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Update review status (admin)
module.exports.updateReview = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("product", "title image")
      .lean();
    if (!review) throw new ApiError(404, "Review not found");
    res.status(200).json({
      success: true,
      message: "Review updated",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Delete review (admin)
module.exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) throw new ApiError(404, "Review not found");
    res.status(200).json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    next(error);
  }
};
