const mongoose = require("mongoose");
const valid = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = mongoose.Schema(
  {
    // ----- Content -----
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      default: "",
    },
    /** Rich text body (HTML from editor: TipTap, Quill, etc.) */
    content: {
      type: String,
      default: "",
    },
    featuredImage: {
      type: String,
      default: "",
      validate: {
        validator: (v) => !v || valid.isURL(v),
        message: "Featured image must be a valid URL",
      },
    },
    /** Author reference or display name */
    author: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
    authorName: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      trim: true,
      default: "",
    },

    // ----- SEO: Meta -----
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    metaKeywords: [
      {
        type: String,
        trim: true,
      },
    ],
    canonicalUrl: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => !v || valid.isURL(v),
        message: "Canonical URL must be valid",
      },
    },
  },
  { timestamps: true }
);

blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ status: 1, publishedAt: -1 });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
