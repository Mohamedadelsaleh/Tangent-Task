// context/CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: 'ADD_ITEM'; product: Product }
    | { type: 'REMOVE_ITEM'; id: number }
    | { type: 'INCREASE_QUANTITY'; id: number }
    | { type: 'DECREASE_QUANTITY'; id: number };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
        const item = state.items.find(item => item.id === action.product.id);
        if (item) {
            return {
            ...state,
            items: state.items.map(item =>
                item.id === action.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            };
        } else {
            return {
            ...state,
            items: [...state.items, { ...action.product, quantity: 1 }],
            };
        }
        }
        case 'REMOVE_ITEM': {
        return {
            ...state,
            items: state.items.filter(item => item.id !== action.id),
        };
        }
        case 'INCREASE_QUANTITY': {
        return {
            ...state,
            items: state.items.map(item =>
            item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        };
        }
        case 'DECREASE_QUANTITY': {
        return {
            ...state,
            items: state.items
            .map(item =>
                item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0),
        };
        }
        default:
        return state;
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
