import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  stock: number;
  reviews: { rating: number; comment: string }[];
  rating: number;
  thumbnail: string | StaticImageData | null;
  price: number;
  images?: string[];
  tags: string[];
  brand: string;
  isFavorite?: boolean;
  isLocal?: boolean;
}

export interface ProductsState {
  localProducts: Product[];
  apiProducts: Product[];
  selectedProduct?: Product | null;
  filterMode: "all" | "favorites";
  searchQuery: string;
  loading: boolean;
  error?: string | null;
}

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";
