"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import AddToCartButton from "../components/addCart";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          const error = await response.json();
          console.error("Submit error:", error.error || "İşlem başarısız");
        }
      } catch (error) {
        console.error("Submit error:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct(params.id);
  }, [params.id]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ürün bulunamadı</h1>
          <Link href="/products">
            <Button>Ürünlere Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Geri Dön Butonu */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri Dön
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ürün Resimleri */}
        <div>
          <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500">Ürün Resmi</span>
          </div>
        </div>

        {/* Ürün Bilgileri */}
        <div>
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>

          {/* Fiyat */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              {product.discount && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500">
                    %{product.discount} İndirim
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">KDV dahil</p>
          </div>

          {/* Stok Durumu */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600">
                  Stokta var ({product.stock} adet)
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600">Stokta yok</span>
              </div>
            )}
          </div>

          {/* Miktar Seçimi */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Miktar:</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Aksiyon Butonları */}
          <div className="space-y-3 mb-8">
            <AddToCartButton product={product} />
            <Button variant="outline" className="w-full" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Favorilere Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* Detaylı Açıklama */}
      {product.description && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Ürün Açıklaması</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Teknik Özellikler */}
      {product.specifications && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Teknik Özellikler</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {Object.entries(product.specifications).map(
                  ([key, value], index) => (
                    <div key={index} className="flex justify-between py-3 px-4">
                      <span className="font-medium">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
