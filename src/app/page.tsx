"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProductCarousel from "./products/ProductCarousel";
import ProductsCards from "./products/ProductCards";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/products");
  };
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-6 py-12">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to the Store
        </h1>
        <div className="flex flex-col items-center gap-10 py-10">
          <ProductCarousel />
          <ProductsCards />
        </div>
        <Button className="w-[80%]" onClick={handleClick}>
          View All Products
        </Button>
      </main>
    </>
  );
}
