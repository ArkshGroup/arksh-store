const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Products",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Name must be at least 2 characters"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, "Comment must be at least 10 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ product: 1, user: 1 }, { unique: true, sparse: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
