const ApiError = require("../errors/api-error");
const Blog = require("../models/Blog");

/** Create URL-safe slug from string */
function slugify(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Ensure unique slug: if exists, append number */
async function ensureUniqueSlug(slug, excludeId = null) {
  let base = slug || "post";
  let candidate = base;
  let n = 0;
  while (true) {
    const query = excludeId
      ? { slug: candidate, _id: { $ne: excludeId } }
      : { slug: candidate };
    const found = await Blog.findOne(query);
    if (!found) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

// ----- Create -----
module.exports.addBlog = async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (!body.slug && body.title) body.slug = slugify(body.title);
    if (!body.slug) body.slug = "post";
    body.slug = await ensureUniqueSlug(body.slug);
    if (body.status === "published" && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    const blog = new Blog(body);
    await blog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ----- Read all (admin: all statuses) -----
module.exports.getAllBlogs = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, sort = "-createdAt" } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Blog.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate("author", "name email")
        .lean(),
      Blog.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ----- Read public (published only, for site listing) -----
module.exports.getShowingBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, tag } = req.query;
    const filter = { status: "published" };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Blog.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("author", "name email")
        .select("-content")
        .lean(),
      Blog.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ----- Read single by ID -----
module.exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!blog) throw new ApiError(404, "Blog not found");
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ----- Read single by slug (SEO-friendly, public: only published) -----
module.exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("author", "name email");
    if (!blog) throw new ApiError(404, "Blog not found");
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ----- Update -----
module.exports.updateBlog = async (req, res, next) => {
  try {
    const existing = await Blog.findById(req.params.id);
    if (!existing) throw new ApiError(404, "Blog not found");

    const body = { ...req.body };
    if (body.title && !body.slug) body.slug = slugify(body.title);
    if (body.slug) {
      body.slug = await ensureUniqueSlug(body.slug, req.params.id);
    }
    if (body.status === "published" && !body.publishedAt && !existing.publishedAt) {
      body.publishedAt = new Date();
    }

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    ).populate("author", "name email");

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ----- Delete -----
module.exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
