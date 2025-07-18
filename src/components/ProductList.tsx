import { useProducts } from "../hooks/useProducts";
import type { Product } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  display: block;
  margin: 0 auto 20px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  font-size: 0.95rem;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: 0.2s ease-in-out;
  background: ${(props) => (props.active ? "#1f2937" : "#f3f4f6")};
  color: ${(props) => (props.active ? "#fff" : "#1f2937")};

  &:hover {
    background: ${(props) => (props.active ? "#1f2937" : "#e5e7eb")};
  }
`;

const Select = styled.select`
  margin: 0 auto;
  display: block;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  background: white;
  max-width: 250px;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  margin-top: 24px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductList = () => {
  const {
    products,
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
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Container>
      <Heading>Interactive Product Explorer</Heading>

      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />

      <CategoryWrapper>
        <CategoryButton
          active={!selectedCategory}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </CategoryButton>

        {Array.isArray(categories) &&
          categories.map((cat) => (
            <CategoryButton
              key={String(cat)}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {typeof cat === "string" ? cat.replaceAll("-", " ") : String(cat)}
            </CategoryButton>
          ))}
      </CategoryWrapper>

      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="title-asc">Title: A → Z</option>
        <option value="title-desc">Title: Z → A</option>
      </Select>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>
      )}

      <Grid>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "280px",
                  background: "#e5e7eb",
                  borderRadius: "12px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))
          : products.map((product) => (
              <motion.div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </Grid>

      {products.length > 0 && !loading && (
        <PaginationWrapper>
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </PageButton>
          <span style={{ paddingTop: "8px" }}>Page {currentPage}</span>
          <PageButton onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </PageButton>
        </PaginationWrapper>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Container>
  );
};

export default ProductList;
