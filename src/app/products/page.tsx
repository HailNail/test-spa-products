import Navbar from "@/components/Navbar";
import ProductsList from "../../product_components/ProductList";

const ProductsPage = () => {
  return (
    <>
      <div className="mt-8 w-[80%]">
        <Navbar />
      </div>

      <ProductsList />
    </>
  );
};

export default ProductsPage;
