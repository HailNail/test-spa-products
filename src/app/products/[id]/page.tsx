import SingleProduct from "@/product_components/SingleProduct";
import { Product } from "@/types/product";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();

  return data.products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  return <SingleProduct productId={productId} />;
}
