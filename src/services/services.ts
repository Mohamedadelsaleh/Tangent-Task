export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
};
