export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  stock: number;
  reviews: { rating: number; comment: string }[];
  rating: number;
  thumbnail: string;
  price: number;
  image: string;
  tags: string[];
  brand: string;
  isFavorite?: boolean;
  isLocal?: boolean;
}

export interface ProductsState {
  items: Product[];
  searchQuery: string;
  loading: boolean;
  error?: string | null;
}

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";
