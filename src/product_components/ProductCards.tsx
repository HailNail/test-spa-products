"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsLoading,
} from "@/redux/features/productSlice";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Category } from "@/types/product";
import Link from "next/link";
import RatingStars from "@/components/RatingStars";

const ProductsCards = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner className="size-6" />
      </div>
    );
  }

  const categories: Category[] = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
  ];

  const renderProductsByCategory = (category: Category) => {
    const filteredProducts = products
      .filter((product) => product.category.includes(category))
      .slice(0, 3);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
        {filteredProducts.map((product) => (
          <Link href={`/product?id=${product.id}`} key={product.id}>
            <motion.div key={product.id} whileHover={{ scale: 0.97 }}>
              <Card>
                <CardHeader>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={400}
                    height={225}
                    className="w-full object-cover rounded-xl bg-accent"
                  />
                  <CardTitle className="mt-3 text-foreground">
                    {product.title.slice(0, 20)}
                  </CardTitle>
                  <CardDescription className="overflow-hidden text-ellipsis h-10">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p>Price: ${product.price}</p>
                  <div className="flex justify-between py-1">
                    <RatingStars rating={product.rating} />
                    {Math.floor(
                      (product.reviews.length + 1) * Math.random() * 10
                    )}{" "}
                    Reviews
                  </div>
                  {product.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="mr-2">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    );
  };
  return (
    <div className="space-y-10 w-full">
      {categories.map((category) => (
        <div key={category} className="mb-10 w-full">
          <h2 className="text-2xl text-center font-semibold text-foreground mb-4 capitalize">
            {category}
          </h2>
          {renderProductsByCategory(category)}
        </div>
      ))}
    </div>
  );
};

export default ProductsCards;
