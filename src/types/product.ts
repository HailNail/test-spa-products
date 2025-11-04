export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  thumbnail: string;
  price: number;
  image: string;
  tags: string[];
  brand: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";
