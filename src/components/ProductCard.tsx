import styled from "styled-components";
import type { Product } from "../hooks/useProducts";

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 10px 0 4px;
`;

const Price = styled.p`
  color: #4b5563;
  font-weight: 500;
`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <Image src={product.thumbnail} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>₹{product.price}</Price>
    </Card>
  );
}
