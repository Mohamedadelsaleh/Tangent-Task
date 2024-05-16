// components/Products.tsx
import React, { useEffect, useState } from 'react';
import { getAllProducts, Product } from '../../services/services';
import styles from './Products.module.scss';
import ProductCard from '@/components/ProductCard/ProductCard';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      const getProducts = async () => {
        const products = await getAllProducts();
        setProducts(products);
      };
  
      getProducts();
    }, []);
  
    return (
      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    );
  };
  
  export default Products;
