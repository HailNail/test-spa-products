export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}
