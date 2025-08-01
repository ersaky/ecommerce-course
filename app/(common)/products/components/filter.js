"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

export default function ProductFilter({
  categories,
  currentCategory,
  currentSearch,
  currentSortBy,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (selectedCategory && selectedCategory !== "Tümü") {
      params.set("category", selectedCategory);
    }

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (sortBy && sortBy !== "name") {
      params.set("sortBy", sortBy);
    }

    if (sortOrder && sortOrder !== "asc") {
      params.set("sortOrder", sortOrder);
    }

    // URL'yi güncelle
    const queryString = params.toString();
    const newUrl = queryString ? `/products?${queryString}` : "/products";
    router.push(newUrl);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("name");
    setSortOrder("asc");
    router.push("/products");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  // Aktif filtre kontrolü
  const hasActiveFilters =
    currentCategory !== "Tümü" || currentSearch || currentSortBy !== "name";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
        {/* Arama */}
        <div key="search-input" className="relative w-full ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>

        {/* Kategori */}
        <Select
          key="category-select"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Kategori seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tümü">Tüm Kategoriler</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sıralama */}
        <Select key="sort-select" value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sırala" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">İsme göre</SelectItem>
            <SelectItem value="price">Fiyata göre</SelectItem>
          </SelectContent>
        </Select>

        {/* Sıralama Yönü */}
        <Select
          key="sort-order-select"
          value={sortOrder}
          onValueChange={setSortOrder}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sıralama Yönü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Artan</SelectItem>
            <SelectItem value="desc">Azalan</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtrele Butonu */}
        <Button
          key="filter-button"
          onClick={handleFilter}
          className="w-full md:w-auto px-6"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtrele
        </Button>
      </div>

      {/* Aktif filtreler ve temizle butonu */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Aktif filtreler:</span>
          {currentCategory !== "Tümü" && (
            <span
              key="category-filter"
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
            >
              {currentCategory}
            </span>
          )}
          {currentSearch && (
            <span
              key="search-filter"
              className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
            >
              "{currentSearch}"
            </span>
          )}
          {currentSortBy !== "name" && (
            <span
              key="sort-filter"
              className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"
            >
              {currentSortBy === "price" ? "Fiyata göre" : "İsme göre"}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="ml-2"
          >
            <X className="h-3 w-3 mr-1" />
            Temizle
          </Button>
        </div>
      )}
    </div>
  );
}
