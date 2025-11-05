"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectFilteredProducts,
  setFilterMode,
  setSearchQuery,
} from "@/redux/features/productSlice";
import AddCardButton from "./AddCardButton";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const filterMode = useAppSelector((state) => state.products.filterMode);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearchQuery(query));
    }, 300);

    return () => clearTimeout(delay);
  }, [query, dispatch]);

  return (
    <nav className="flex items-center justify-center gap-3 p-4 border-b border-gray-200 bg-background">
      <div className="flex items-center gap-2 w-full max-w-md">
        <InputGroup>
          <InputGroupInput
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {products.length} results
          </InputGroupAddon>
        </InputGroup>
      </div>
      <AddCardButton />
      <Label htmlFor="favorites-switch" className="ml-4">
        All
      </Label>
      <Switch
        id="favorites-switch"
        checked={filterMode === "favorites"}
        onCheckedChange={(checked) =>
          dispatch(setFilterMode(checked ? "favorites" : "all"))
        }
      />
      <Label htmlFor="favorites-switch">Favorite</Label>
    </nav>
  );
};

export default Navbar;
