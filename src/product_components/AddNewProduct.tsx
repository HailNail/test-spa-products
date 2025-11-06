"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/productSlice";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
export default function AddCardPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(1);
  const [brand, setBrand] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>(
    []
  );
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validateImage = (url: string) =>
    new Promise<string>((resolve) => {
      if (!url) return resolve("/images/default.jpg"); // empty URL → default

      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => {
        alert("Thumbnail URL is invalid, try another URL or just leave empty.");
      };
      img.src = url;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a product title");
      return;
    }
    if (!category.trim()) return alert("Please enter a product category");
    if (price < 0) return alert("Price must be 0 or higher");
    if (stock < 0) return alert("Stock must be 0 or higher");
    if (rating < 1 || rating > 5)
      return alert("Rating must be between 1 and 5");
    const finalThumbnail = await validateImage(thumbnail.trim());
    if (!finalThumbnail) return;
    dispatch(
      addProduct({
        title: title.trim(),
        category: category.trim(),
        price,
        description,
        stock,
        rating,
        brand,
        thumbnail: finalThumbnail,
        reviews,
        tags,
      })
    );
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

    router.push("/products"); // go back home
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      <Button className="w-[20%] mt-4 border-2 mb-4" onClick={router.back}>
        Back to Products
      </Button>
      <Field className="w-[600px] bg-card/30 p-6 rounded-lg shadow-md">
        <FieldLegend>Add New Product</FieldLegend>
        <FieldContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldLabel htmlFor="title">Product Title</FieldLabel>
            <Input
              placeholder="Super Cool Product"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Input
              placeholder="Groceries..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input
              type="number"
              placeholder="100..."
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              step={0.01}
              min={0.01}
              required
            />
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              placeholder="This product is great because..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <FieldLabel htmlFor="stock">Stock</FieldLabel>
            <Input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              step={1}
              min={0}
              required
            />
            <FieldLabel htmlFor="rating">Rating</FieldLabel>
            <Input
              type="number"
              defaultValue={1}
              placeholder="4.5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              max={5}
              min={1}
              step={0.5}
              required
            />
            <FieldLabel htmlFor="brand">Brand</FieldLabel>
            <Input
              placeholder="Gucci..."
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <FieldLabel htmlFor="thumbnail">Thumbnail URL</FieldLabel>
            <Input
              placeholder="/images/example.jpg/png/webp from your public folder"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
            <FieldLabel htmlFor="reviews">Reviews</FieldLabel>
            <Input
              type="number"
              value={reviews.length}
              placeholder="60"
              onChange={(e) =>
                setReviews(Array.from({ length: Number(e.target.value) }))
              }
            />
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <Input
              required
              placeholder="Enter tags separated by commas"
              value={tags.join(", ")}
              onChange={(e) => {
                const value = e.target.value;
                setTags(value ? value.split(",").map((t) => t.trim()) : []);
              }}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </FieldContent>
      </Field>
    </div>
  );
}
