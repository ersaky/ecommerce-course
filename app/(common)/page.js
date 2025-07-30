import Categories from "./components/home/categories";
import FeaturedProducts from "./components/home/featured";
import Hero from "./components/home/hero";
import Properties from "./components/home/properties";
import { testConnection } from "@/lib/db";

export default async function Home() {
  const isConnected = await testConnection();

  return (
    <div className="container mx-auto">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Properties />
    </div>
  );
}
