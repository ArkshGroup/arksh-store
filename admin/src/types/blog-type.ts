export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author?: string;
  authorName?: string;
  status: "draft" | "published" | "archived";
  publishedAt: string | null;
  tags: string[];
  category: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogListResponse {
  success: boolean;
  data: IBlog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IAddBlog {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  author?: string;
  authorName?: string;
  status?: "draft" | "published" | "archived";
  publishedAt?: string | null;
  tags?: string[];
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
}
