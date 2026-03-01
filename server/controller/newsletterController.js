const ApiError = require("../errors/api-error");
const Subscriber = require("../models/Subscriber");

// Subscribe (client – public)
module.exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      throw new ApiError(400, "Email is required");
    }
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new ApiError(400, "Please provide a valid email");
    }
    const existing = await Subscriber.findOne({ email: normalized });
    if (existing) {
      if (existing.status === "active") {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed.",
        });
      }
      existing.status = "active";
      await existing.save();
      return res.status(200).json({
        success: true,
        message: "You have been resubscribed.",
      });
    }
    const subscriber = new Subscriber({ email: normalized });
    await subscriber.save();
    res.status(201).json({
      success: true,
      message: "Thank you for subscribing!",
    });
  } catch (error) {
    next(error);
  }
};

// Get all subscribers (admin)
module.exports.getSubscribers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Subscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Subscriber.countDocuments(filter),
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

// Get subscriber count (admin)
module.exports.getSubscriberCount = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const count = await Subscriber.countDocuments(filter);
    res.status(200).json({ success: true, count });
  } catch (error) {
    next(error);
  }
};

// Delete subscriber (admin)
module.exports.deleteSubscriber = async (req, res, next) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) throw new ApiError(404, "Subscriber not found");
    res.status(200).json({
      success: true,
      message: "Subscriber removed",
    });
  } catch (error) {
    next(error);
  }
};
