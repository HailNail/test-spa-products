"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  selectProductsLoading,
  toggleFavorite,
} from "@/redux/features/productSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectAllProducts } from "@/redux/features/productSlice";
import { useEffect, useState } from "react";
// import { Navbar } from "@/app/Navbar";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PaginationComponent } from "@/components/PaginationComponent";
import RatingStars from "@/components/RatingStars";
import { Heart, Star, StarOff } from "lucide-react";

const ProductsList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector(selectProductsLoading);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClick = () => {
    router.push("/");
  };

  const filteredProducts = (products || []).filter((product) =>
    product.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderedProducts = currentProducts.map((product) => (
    <motion.div
      key={product.id}
      whileHover={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative">
        <Button
          variant="ghost"
          className="absolute top-2 right-2 z-10"
          onClick={() => dispatch(toggleFavorite(product.id))}
        >
          {product.isFavorite ? (
            <Heart
              fill="oklch(37.543% 0.09415 46.647)"
              className="text-foreground"
            />
          ) : (
            <Heart />
          )}
        </Button>
        <Link href={`/products/${product.id}`}>
          <CardHeader>
            <Image
              className="w-full object-cover rounded-xl p-2 bg-accent"
              src={product.thumbnail}
              alt={product.title}
              width={400}
              height={600}
            />

            <CardTitle className="text-foreground font-bold mt-4">
              {product.title}
            </CardTitle>
            <CardDescription>
              <p>{product.description.substring(0, 80)}...</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Category: {product.category}</li>
              <li>Price: {product.price} $</li>
              <li>
                <RatingStars rating={product.rating} />
              </li>
              <li>Stock: {product.stock}</li>
              <li>
                Brand: <Badge>{product.brand}</Badge>
              </li>
              {product.tags && (
                <li className="mt-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="mr-2">
                      {tag}
                    </Badge>
                  ))}
                </li>
              )}
            </ul>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  ));

  return (
    <div className="py-8 px-4 w-[80%] mx-auto">
      <h1 className="text-3xl text-center font-bold my-8 text-secondary-foreground">
        {searchQuery || "All products"}
      </h1>
      {loading ? (
        <div className="w-full flex justify-center p-4">
          <Spinner className="size-6" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderedProducts}
          </div>
        </div>
      )}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Button onClick={handleClick} className="w-full my-4">
        Back to Home
      </Button>
    </div>
  );
};

export default ProductsList;
