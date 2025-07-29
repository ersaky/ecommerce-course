import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
const categories = [
  { name: "Elektronik", count: 150, icon: "📱" },
  { name: "Giyim", count: 200, icon: "👕" },
  { name: "Ev & Yaşam", count: 120, icon: "🏠" },
  { name: "Kitap", count: 80, icon: "📚" },
];
export default function Categories() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link key={index} href="/products">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} ürün</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
