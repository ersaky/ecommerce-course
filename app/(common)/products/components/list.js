import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "./addCart";

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="hover:shadow-lg transition-shadow pt-0"
        >
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <span>Ürün Resmi</span>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg">
                <Link
                  href={`/products/${product.id}`}
                  className="hover:text-blue-600"
                >
                  {product.name}
                </Link>
              </CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <Badge variant="outline" className="w-fit">
                {product.category_name}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold">
                    ₺{parseFloat(product.price).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <AddToCartButton product={product} />
                <Link href={`/products/${product.id}`}>
                  <Button variant="outline" className="w-full">
                    Detayları Gör
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
