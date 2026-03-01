const mongoose = require("mongoose");
const validator = require("validator");

const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },
  },
  { timestamps: true }
);

subscriberSchema.index({ createdAt: -1 });

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
