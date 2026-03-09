

export interface IProduct {
  _id: string;
  sku: string;
  title: string;
  parent: string;
  children: string;
  tags: string[];
  image: string;
  originalPrice: number;
  price: number;
  discount?: number;
  relatedImages: string[];
  description: string;
  orderQuantity:number;
  brand: {
    name:string;
    id:string;
  };
  category: {
    name:string;
    id:string;
  };
  unit: string;
  quantity: number;
  colors: string[];
  sizes?: string[];
  selectedColor?: string;
  selectedSize?: string;
  type?: string;
  itemInfo?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  slug?: string;
  status: string;
}

export interface ProductResponse {
  success: boolean;
  data: IProduct[];
}

// IAddProduct
export interface IAddProduct {
  sku: string;
  title: string;
  parent: string;
  children: string;
  tags: string[];
  image: string;
  originalPrice: number;
  price: number;
  discount?: number;
  relatedImages: string[];
  description: string;
  brand: {
    name:string;
    id:string;
  };
  category: {
    name:string;
    id:string;
  };
  unit: string;
  quantity: number;
  colors: string[];
  sizes?: string[];
  type?: string;
  itemInfo?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  slug?: string;
  status?: string;
}
