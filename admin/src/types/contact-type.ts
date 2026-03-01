export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IContactListResponse {
  success: boolean;
  data: IContact[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
