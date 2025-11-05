"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProductById,
  selectProductById,
} from "@/redux/features/productSlice";
import { useEffect } from "react";
import RatingStars from "@/components/RatingStars";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Home, ShoppingCartIcon } from "lucide-react";

type ProductDetailProps = {
  productId: number;
};

export default function SingleProduct({ productId }: ProductDetailProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    selectProductById(state, productId)
  );
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    if (!product) dispatch(fetchProductById(productId));
  }, [dispatch, product, productId]);

  if (loading && !product)
    return <p className="text-center mt-8">Loading...</p>;
  if (!product) return <p className="text-center mt-8">Product not found.</p>;

  return (
    <div className=" mt-8">
      <div className="flex justify-between mb-4">
        <Button
          variant="outline"
          className="w-[20%] mt-4 border-2"
          onClick={router.back}
        >
          Back to Products <ShoppingCartIcon />
        </Button>
        <Button
          className="w-[20%] mt-4 border-2"
          onClick={() => router.push("/")}
        >
          Back to Home <Home />
        </Button>
      </div>
      <Card className="w-full max-w-4xl mx-auto shadow-xl p-4 md:p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center items-start">
            <Image
              src={product.thumbnail}
              alt={product.title}
              className="rounded-lg object-cover w-full h-auto max-h-[400px] border bg-accent"
              width={400}
              height={400}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-bold">
                {product.title}
              </CardTitle>
              <CardDescription className="text-lg font-bold text-muted-foreground">
                {product.brand ? product.brand : "Unknown"}
              </CardDescription>

              <div className="flex items-center justify-between pt-2">
                <span className="text-4xl font-extrabold text-foreground">
                  {product.price} $
                </span>
                <RatingStars rating={product.rating} />
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-0 space-y-3 grow">
              <p className="text-muted-foreground">{product.description}</p>

              <div className="flex items-center space-x-2 mt-10">
                <Badge variant="secondary" className="px-3 py-1">
                  In Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
                </Badge>
                <Badge className="capitalize">{product.category}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </div>
        <CardFooter className="flex justify-between ">
          <Button className="w-[48%]" disabled={product.stock === 0}>
            {product.stock > 0 ? "Add to Cart" : "Notify Me When Available"}
          </Button>
          <Button
            variant="outline"
            className="w-[48%]"
            disabled={product.stock === 0}
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
