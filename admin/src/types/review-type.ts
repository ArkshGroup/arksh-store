export interface IReview {
  _id: string;
  product: { _id: string; title: string; image?: string } | null;
  user?: string;
  name: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface IReviewListResponse {
  success: boolean;
  data: IReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IReviewCountResponse {
  success: boolean;
  count: number;
}
