import SingleProduct from "@/product_components/SingleProduct";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  return <SingleProduct productId={productId} />;
}
