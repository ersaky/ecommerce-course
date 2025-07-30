import { getCategories } from "@/lib/db";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div>
      <h1>Kategoriler</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
