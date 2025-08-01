import { getFeaturedProducts } from "@/db/product";
import Categories from "./components/home/categories";
import FeaturedProducts from "./components/home/featured";
import Hero from "./components/home/hero";
import Properties from "./components/home/properties";
import { testConnection } from "@/db/connection";
import { getCategoriesWithProductCount } from "@/db/category";

export default async function Home() {
  const isConnected = await testConnection();
  const featuredProducts = await getFeaturedProducts();
  const categoriesWithProductCount = await getCategoriesWithProductCount();

  return (
    <div className="container mx-auto">
      <Hero />
      <Categories categoriesWithProductCount={categoriesWithProductCount} />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <Properties />
    </div>
  );
}
