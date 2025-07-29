import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-20 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div>
            <h3 className="font-bold text-lg mb-4">eTicaret</h3>
            <p className="text-gray-600 text-sm">
              Modern ve güvenilir e-ticaret deneyimi için buradayız.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Ürünler
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 className="font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=electronics"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Elektronik
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=clothing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Giyim
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=books"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Kitap
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Ev & Yaşam
                </Link>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Yardım
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Kargo Bilgileri
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-gray-900"
                >
                  İade & Değişim
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2025 eTicaret. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
