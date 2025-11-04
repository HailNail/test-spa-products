"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchQuery } from "@/redux/features/productSlice";
import AddCardButton from "./AddCardButton";

const Navbar = () => {
  const dispatch = useAppDispatch();
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
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <AddCardButton />
    </nav>
  );
};

export default Navbar;
