// components/Cart.tsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
    const { state, dispatch } = useCart();

  const total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className={styles.cart}>
        <h2>Shopping Cart</h2>
        {state.items.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
            <div className={styles.cartItems}>
            {state.items.map(item => (
                <div key={item.id} className={styles.cartItem}>
                <img src={item.thumbnail} alt={item.title} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                    <h3 className={styles.cartItemTitle}>{item.title}</h3>
                    <span className={styles.productTitle}>{item.description}</span>
                    <p className={styles.cartItemPrice}>{`£${item.price.toFixed(2)}`}</p>
                    <div className={styles.cartItemQuantity}>
                    <button onClick={() => dispatch({ type: 'DECREASE_QUANTITY', id: item.id })}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch({ type: 'INCREASE_QUANTITY', id: item.id })}>+</button>
                    </div>
                </div>
                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} className={styles.removeItemButton}>Remove</button>
                </div>
            ))}
            </div>
        )}
        <div className={styles.cartTotal}>
            <h3>Total: {`£${total.toFixed(2)}`}</h3>
        </div>
        </div>
    );
};

export default Cart;
