const express = require("express");
const {
  subscribe,
  getSubscribers,
  getSubscriberCount,
  deleteSubscriber,
} = require("../controller/newsletterController");

const router = express.Router();

// Client – public
router.post("/", subscribe);

// Admin
router.get("/count", getSubscriberCount);
router.get("/", getSubscribers);
router.delete("/:id", deleteSubscriber);

module.exports = router;
