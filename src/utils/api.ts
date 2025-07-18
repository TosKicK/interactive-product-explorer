export const fetchProducts = async (limit = 12, skip = 0) => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchProductsByCategory = async (category: string) => {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
};
