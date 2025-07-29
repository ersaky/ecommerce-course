import { Headphones, Shield, ShoppingBag, Truck } from "lucide-react";

export default function Properties() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-4 gap-8">
        <div className="text-center">
          <Truck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="font-semibold mb-2">Hızlı Kargo</h3>
          <p className="text-gray-600 text-sm">24 saat içinde kapınızda</p>
        </div>
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <h3 className="font-semibold mb-2">Güvenli Ödeme</h3>
          <p className="text-gray-600 text-sm">SSL sertifikası ile korualı</p>
        </div>
        <div className="text-center">
          <Headphones className="h-12 w-12 mx-auto mb-4 text-purple-600" />
          <h3 className="font-semibold mb-2">7/24 Destek</h3>
          <p className="text-gray-600 text-sm">Her zaman yanınızdayız</p>
        </div>
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-orange-600" />
          <h3 className="font-semibold mb-2">Kolay İade</h3>
          <p className="text-gray-600 text-sm">
            30 gün içerisinde ücretsiz iade
          </p>
        </div>
      </div>
    </section>
  );
}
