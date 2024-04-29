import { CartItem, Product } from "../types";

export const isInCart = (cartItems: CartItem[], item: Product) => {
    return cartItems.some((cartItem) => cartItem.product.id === item.id);
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};
