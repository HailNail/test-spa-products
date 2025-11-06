import ProductCarousel from "../product_components/ProductCarousel";
import ProductsCards from "../product_components/ProductCards";

const Home = () => {
  return (
    <>
      <main className="flex flex-col w-full items-center justify-center gap-6 py-12">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to the Store
        </h1>
        <div>
          <ProductCarousel />
          <ProductsCards />
        </div>
      </main>
    </>
  );
};

export default Home;
