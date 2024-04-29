import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CartItem } from "../types";

// The atom, `cartItemsAtom`, is initialized using `atomWithStorage` from `jotai/utils`, which is a utility function provided by Jotai for persisting state in storage (like `localStorage` or `sessionStorage`). This atom is specifically for storing an array of `CartItem` objects, representing the items in a shopping cart. 

/* Key: `"cartItems"` is the key under which the array is stored in the storage.
 Default Value: `[]` indicates that the default value is an empty array. If there is no existing data in storage under `"cartItems"`, this default value is used. */
export const cartItemsAtom = atomWithStorage<CartItem[]>("cartItems", []);

/* 
cartCountAtom reads the current state of cartItemsAtom using the get function, and returns number of cart items by getting the the length of the cartItems array. 

This atom is derived from cartItemsAtom, which means that it will automatically update whenever the cartItemsAtom changes. This is because Jotai tracks the dependencies of atoms, and when an atom that another atom depends on changes, the dependent atom is automatically updated.
*/
export const cartCountAtom = atom((get) => {
    return get(cartItemsAtom).length;
});

/* 
cartTotalAtom, calculates the total price of all the items in the cart by fetching the current state of cartItemsAtom using get(), and calculates the total price of all the items in the cart using reduce(), to accumulate the price of each items by accesing the product.price of each item. 

Like cartCountAtom, this atom is also reactive and will update whenever cartItemsAtom changes, ensuring that the total is always accurate based on the current cart contents.
*/
export const cartTotalAtom = atom((get) => {
    const items = get(cartItemsAtom);
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
});
