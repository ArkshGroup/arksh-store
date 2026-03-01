const express = require("express");
const {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

const router = express.Router();

router.post("/", addContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
