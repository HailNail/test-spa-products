"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProductCarousel from "../product_components/ProductCarousel";
import ProductsCards from "../product_components/ProductCards";

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
        <Button className="w-[80%]" onClick={handleClick}>
          View All Products
        </Button>
        <div className="flex flex-col items-center gap-10 ">
          <ProductCarousel />
          <ProductsCards />
        </div>
      </main>
    </>
  );
}
