"use client";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession, signOut } from "next-auth/react";
export default function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <header className="border-b">
      <div className="container mx-auto px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            eTicaret
          </Link>
          {/* Arama */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Ürün Ara.." className="pl-10" />
            </div>
          </div>
          {/* Navigasyon*/}
          <nav className="flex items-center space-x-4">
            <Link href="/products">Ürünler</Link>
            <Link href="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-600">
                  3
                </Badge>
              </Button>
            </Link>
            {session ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <Button variant="ghost">
                    <User className="h-5 w-5 mr-2" />
                    {session.user?.name || "Profil"}
                  </Button>
                </Link>

                <Button onClick={handleSignOut}>Çıkış Yap</Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link href="/signup">
                  <Button variant="ghost">Kayıt Ol</Button>
                </Link>
                <Link href="/login">
                  <Button>Giriş</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
