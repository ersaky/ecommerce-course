import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Hero() {
  return (
    <section className="py-20 text-center bg-gradient-to-r from-purple-100 to-blue-300 rounded-b-2xl">
      <h1 className="text-6xl font-bold mb-6">
        Modern <span className="text-purple-700">eTicaret</span> Deneyimi
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        En kalite ürünleri en uygun fiyatlarla keşfedin. Hızlı kargo ve güvenli
        ödeme ile alışverişin keyfini çıkarın.
      </p>
      <div className="space-x-4">
        <Link href="/products">
          <Button size="lg" className="text-lg px-8">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Alışverişe Başla
          </Button>
        </Link>
      </div>
    </section>
  );
}
