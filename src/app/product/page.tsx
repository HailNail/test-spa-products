"use client";

import { useSearchParams } from "next/navigation";
import SingleProduct from "@/product_components/SingleProduct";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <p className="text-center mt-10 text-lg">No product selected.</p>;
  }

  const productId = parseInt(id, 10);

  return <SingleProduct productId={productId} />;
}
