"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Package, Tags, Users } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SideBar() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/login",
    });
  };
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b">
          <Link href="/admin" className="text-xl font-bold text-gray-900">
            eTicaret Admin
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          <Link
            href="/admin"
            className="flex items-center rounde-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center rounde-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100"
          >
            <Tags className="mr-3 h-5 w-5" />
            Kategoriler
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center rounde-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100"
          >
            <Package className="mr-3 h-5 w-5" />
            Ürünler
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center rounde-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100"
          >
            <Users className="mr-3 h-5 w-5" />
            Kullanıcılar
          </Link>
        </nav>

        {/* User&Logout */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {session && session.user?.name}
                </p>
                <Badge variant="secondary" className="text-xs">
                  Admin
                </Badge>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Çıkış Yap</AlertDialogTitle>
                  <AlertDialogDescription>
                    Çıkış yapmak istediğinize emin misiniz?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignOut}>
                    Çıkş Yap
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
