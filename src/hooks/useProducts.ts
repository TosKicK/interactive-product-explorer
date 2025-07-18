import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../utils/api";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
  stock: number;
  brand: string;
  category: string;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortOption, setSortOption] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * itemsPerPage;
      const data = selectedCategory
        ? await fetchProductsByCategory(selectedCategory)
        : await fetchProducts(itemsPerPage, skip);
      setProducts(data.products);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        if (Array.isArray(res)) setCategories(res);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
    }

    switch (sortOption) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "title-asc":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filtered;
    }
  }, [products, sortOption, searchTerm]);

  return {
    products: filteredAndSortedProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    loading,
    error,
  };
};
