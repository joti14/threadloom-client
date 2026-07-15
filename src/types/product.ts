export type ProductCategory = "men" | "women" | "kids" | "footwear" | "accessories";

export interface Product {
  _id: string;
  title: string;
  slug: string;
  brand: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  stock: number;
  sizes: string[];
  colors: string[];
  images: string[];
  rating: number;
  ratingCount: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  items: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
