"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/productSlice";

export default function AddCardPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // optional: fake POST to dummyjson for logging
    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category }),
      });
      const data = await res.json();
      console.log("Dummy POST:", data);
    } catch (err) {
      console.error("POST failed", err);
    }

    // Add product to Redux (local)
    dispatch(addProduct({ title, category }));

    router.push("/products"); // go back home
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
