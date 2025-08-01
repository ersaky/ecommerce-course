"use client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddToCartButton({ product }) {
  const { addItem } = useCartStore();
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} sepete eklendi`);
  };
  return (
    <Button className="w-full" onClick={handleAddToCart}>
      Sepete Ata
    </Button>
  );
}
