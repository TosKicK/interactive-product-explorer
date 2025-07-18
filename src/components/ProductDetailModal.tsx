import styled from "styled-components";
import type { Product } from "../hooks/useProducts";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Price = styled.p`
  color: #10b981;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const Info = styled.p`
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 4px;
`;

const Description = styled.p`
  margin-top: 12px;
  font-size: 0.95rem;
  color: #374151;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  background: #f3f4f6;
  border: none;
  font-size: 1.2rem;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const ProductDetailModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <Image src={product.thumbnail} alt={product.title} />
        <Title>{product.title}</Title>
        <Price>₹{product.price}</Price>
        <Info>Brand: {product.brand}</Info>
        <Info>Rating: ⭐ {product.rating}</Info>
        <Info>Stock Available: {product.stock}</Info>
        <Info>Category: {product.category}</Info>
        <Description>{product.description}</Description>
      </Modal>
    </Overlay>
  );
};

export default ProductDetailModal;
