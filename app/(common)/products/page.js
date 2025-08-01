import { getCategories } from "@/db/category";
import { getFilteredProducts } from "@/db/product";
import ProductFilter from "./components/filter";
import ProductList from "./components/list";

export default async function Products({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "Tümü";
  const search = params?.search || "";
  const sortBy = params?.sortBy || "name";
  const sortOrder = params?.sortOrder || "asc";
  const filters = {
    category,
    search,
    sortBy,
    sortOrder,
  };
  const categories = await getCategories();

  const products = await getFilteredProducts(filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Ürünler</h1>
        <ProductFilter
          categories={categories}
          currentCategory={category}
          currentSearch={search}
          currentSortBy={sortBy}
        />
        <p className="text-gray-600 my-6">{products.length} ürün bulundu..</p>
        <ProductList products={products} />
      </div>
    </div>
  );
}
