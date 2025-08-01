import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeaturedProducts({ featuredProducts }) {
  const featured = featuredProducts;
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold">Öne Çıkan Ürünler</h2>
        <Link href="/products">
          <Button variant="outline">Tümünü Gör</Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {featured.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer py-0 pb-3">
              <div className="relative">
                <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-500">Ürün Resmi</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">₺{product.price}</span>
                  <Button size="sm">Sepete Ekle</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
