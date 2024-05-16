import React, { useEffect, useState } from "react";
import styles from './ProductCard.module.scss';
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  thumbnail,
}) => {

  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      product: { id, title, description, price, thumbnail }
    });
  };

  return (
    <div className={styles.productCard}>
        <div className={styles.ImageWrapper}>
            <img src={thumbnail} alt={title} className={styles.productImage} />
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.productTitle}>{title}</h3>
          <span className={styles.productDescription}>{description}</span>
        </div>
        <div className={styles.cardFooterWrapper}>
          <button onClick={addToCart} className={styles.addToCartButton}> 
            <span>Add to cart</span>
            <img src="/assets/plus.svg"  /> </button>
          <div className={styles.priceWrapper}>
            <p className={styles.productPrice}>{`£${price.toFixed(2)}`}</p>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
