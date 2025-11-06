import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, ProductsState } from "../../types/product";
const initialState: ProductsState = {
  localProducts: [
    {
      id: Date.now(),
      title: "Demo Product",
      category: "Electronics",
      price: 99.99,
      description:
        "This is a demo product to show employers how the app works.",
      stock: 10,
      rating: 4,
      reviews: [],
      brand: "DemoBrand",
      thumbnail: "/test-spa-products/default.jpg",
      tags: ["demo", "sample"],
      isFavorite: false,
    },
  ],
  apiProducts: [],
  selectedProduct: null,
  filterMode: "all",
  searchQuery: "",
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products as Product[];
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data as Product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addProduct(state, action: PayloadAction<Omit<Product, "id">>) {
      const newProduct: Product = {
        id: Date.now(),
        ...action.payload,
        isFavorite: false,
      };
      state.localProducts.unshift(newProduct);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.localProducts = state.localProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      // Check both local and API products
      const local = state.localProducts.find((p) => p.id === action.payload);
      if (local) {
        local.isFavorite = !local.isFavorite;
        return;
      }

      const api = state.apiProducts.find((p) => p.id === action.payload);
      if (api) api.isFavorite = !api.isFavorite;
    },
    setFilterMode(state, action: PayloadAction<"all" | "favorites">) {
      state.filterMode = action.payload;
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
          state.apiProducts = action.payload.map((newProduct) => {
            const existing = state.apiProducts.find(
              (p) => p.id === newProduct.id
            );
            return existing
              ? { ...newProduct, isFavorite: existing.isFavorite }
              : newProduct;
          });
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.selectedProduct = action.payload;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching product";
      });
  },
});

const selectProductsState = (state: { products: ProductsState }) =>
  state.products;

export const {
  setSearchQuery,
  addProduct,
  deleteProduct,
  toggleFavorite,
  setFilterMode,
} = productSlice.actions;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState) => [
    ...productsState.localProducts,
    ...productsState.apiProducts,
  ]
);

export const selectLocalProducts = (state: { products: ProductsState }) =>
  state.products.localProducts;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectProductsState],
  (allProducts, productsState) => {
    const query = productsState.searchQuery.toLowerCase().trim();
    const filterMode = productsState.filterMode;

    let filtered = allProducts;
    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    if (filterMode === "favorites") {
      filtered = filtered.filter((product) => product.isFavorite);
    }

    return filtered;
  }
);

export const selectProductById = (
  state: { products: ProductsState },
  id: number
) => {
  const all = selectAllProducts(state);
  return all.find((p) => p.id === id);
};

export const selectProductsLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

export default productSlice.reducer;
