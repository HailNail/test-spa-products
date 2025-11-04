"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  selectProductsLoading,
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
import { Pagination } from "@/components/ui/pagination";
import { PaginationComponent } from "@/components/PaginationComponent";

const ProductsList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClick = () => {
    router.push("/");
  };

  const filteredProducts = (products || []).filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  /*  const handleSearch = (query: string) => {
    setQuery(query);
  }; */

  const renderedProducts = currentProducts.map((product) => (
    <Link href={`/products/${product.id}`} key={product.id}>
      <motion.div
        whileHover={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card>
          <CardHeader>
            <Image
              className="w-full object-cover rounded-t-xl"
              src={product.thumbnail}
              alt={product.title}
              width={400}
              height={600}
            />

            <CardTitle className="text-rose-500 font-bold mt-4">
              {product.title}
            </CardTitle>
            <CardDescription>
              <p>{product.description.substring(0, 80)}...</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Category: {product.category}</li>
              <li>Price: {product.price} </li>
              <li>Rating: {product.rating}</li>
              <li>Stock: {product.stock}</li>
              <li>
                Brand: <Badge>{product.brand}</Badge>
              </li>
              {product.tags && (
                <li>
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="mr-2">
                      {tag}
                    </Badge>
                  ))}
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  ));

  return (
    <div className="py-8 px-4 w-[80%] mx-auto">
      {/* <Navbar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        length={filteredMovies.length}
      /> */}
      <h1 className="text-4xl text-center font-bold my-8">All Products</h1>
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
