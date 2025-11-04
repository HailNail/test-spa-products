import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, ProductsState } from "../../types/product";

const initialState: ProductsState = {
  items: [],
  searchQuery: "",
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products as Product[];
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addProduct(state, action: PayloadAction<Omit<Product, "id">>) {
      // assign sequential id for local products
      const localProducts = state.items.filter((p) => p.isLocal);
      const maxId = localProducts.length
        ? Math.max(...localProducts.map((p) => p.id))
        : 0;

      const newProduct: Product = {
        id: maxId + 1,
        ...action.payload,
        isLocal: true,
        isFavorite: false,
      };
      state.items.push(newProduct);
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) product.isFavorite = !product.isFavorite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(
        fetchProducts.rejected,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload || "Error fetching products";
        }
      );
  },
});

export const { setSearchQuery, addProduct, toggleFavorite } =
  productSlice.actions;
export const selectAllProducts = (state: { products: ProductsState }) =>
  state.products.items;
export const selectProductsLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

export default productSlice.reducer;
