const express = require("express");
const {
  addBlog,
  getAllBlogs,
  getShowingBlogs,
  getSingleBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

const router = express.Router();

// Public: published only list (for site)
router.get("/show", getShowingBlogs);
// Public: get by slug (SEO URL)
router.get("/slug/:slug", getBlogBySlug);

// Admin/API: list all (with optional status filter & pagination)
router.get("/all", getAllBlogs);
// Admin/API: get by id
router.get("/:id", getSingleBlog);

// Create
router.post("/add", addBlog);
// Update
router.patch("/edit/:id", updateBlog);
// Delete
router.delete("/delete/:id", deleteBlog);

module.exports = router;
