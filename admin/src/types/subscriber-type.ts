export interface ISubscriber {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriberListResponse {
  success: boolean;
  data: ISubscriber[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ISubscriberCountResponse {
  success: boolean;
  count: number;
}
