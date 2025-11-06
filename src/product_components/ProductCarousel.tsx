"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsLoading,
} from "@/redux/features/productSlice";
import { useEffect } from "react";

import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProductCarousel = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const isLoading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = Array.from(products || [])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const router = useRouter();
  const handleClick = () => {
    router.push("/products");
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-4">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <>
      <Button className="w-[80%]" onClick={handleClick}>
        View All Products
      </Button>
      <h1 className="text-3xl text-center p-4 text-foreground font-bold">
        Bestsellers
      </h1>
      <Carousel className="w-[80%]">
        <CarouselContent className="-ml-1">
          {sortedProducts.map((product) => (
            <CarouselItem
              className="pl-1 md:basis-1/2 lg:basis-1/4"
              key={product.id}
            >
              <Link href={`/products/${product.id}`}>
                <motion.div
                  className="p-1"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card>
                    <CardHeader className="flex items-center justify-center">
                      <Image
                        className="aspect-4/5 w-full object-cover rounded-2xl bg-accent"
                        src={product.thumbnail}
                        alt={product.title}
                        width={300}
                        height={450}
                      />
                    </CardHeader>
                    <CardDescription>
                      <div className="flex justify-between px-6 font-semibold text-foreground">
                        {product.title.slice(0, 20)}
                        <Badge variant="secondary">${product.price}</Badge>
                      </div>
                      <p className="px-6 font-bold">
                        Category:{" "}
                        <Badge>
                          {product.category ? product.category : "Unknown"}
                        </Badge>
                      </p>
                    </CardDescription>
                  </Card>
                </motion.div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ProductCarousel;
