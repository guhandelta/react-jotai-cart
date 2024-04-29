import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { formatCurrency } from "../helpers";
import { CartItem } from "../types";
import TrashIcon from "../assets/trash.svg";
import {
    cartItemsAtom,
    incrementQuantityAtom,
    removeItemAtom,
    decrementQuantityAtom,
    cartTotalAtom,
} from "../store";

export const Cart = () => {

    // The current state of cartItemsAtom, which is an array of cart items. The setter function is not used here, hence it is not destructured.
    const [cartItems] = useAtom(cartItemsAtom);
    const [cartTotal] = useAtom(cartTotalAtom);
    
    // Only the setter function is used here, which is why the first element (the current state) is ignored (indicated by ,).
    const [, incrementQuantity] = useAtom(incrementQuantityAtom);
    const [, decrementQuantity] = useAtom(decrementQuantityAtom);
    const [, removeItem] = useAtom(removeItemAtom);

    const handleIncrementQuantity = (cartItem: CartItem) => {
        incrementQuantity(cartItem);
    };

    const handleDecrementQuantity = (cartItem: CartItem) => {
        decrementQuantity({ ...cartItem });
    };
    
    const handleRemoveItem = (cartItem: CartItem) => {
        removeItem({ ...cartItem });
    };

    return (
        <>
        <h1>Cart</h1>
        <table className="cart-table">
            <thead>
            <tr>
                <th>Product</th>
                <th className="product-data-cell">Quantity</th>
                <th className="product-data-cell">Price</th>
            </tr>
            </thead>
            <tbody>
            {cartItems.map((cartItem) => (
                <tr key={cartItem.product.id} className="product-row">
                <td className="product-head">
                    <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    className="product-image"
                    width="60"
                    height="60"
                    />
                    <h4>
                    <Link to="#">{cartItem.product.name}</Link>
                    </h4>
                </td>
                <td className="product-data-cell">
                    <div className="product-quantity">
                    <button
                        className="btn-left"
                        onClick={() => handleDecrementQuantity(cartItem)}
                    >
                        -
                    </button>
                    <span className="product-quantity_value">
                        {cartItem.quantity}
                    </span>
                    <button
                        className="btn-right"
                        onClick={() => handleIncrementQuantity(cartItem)}
                    >
                        +
                    </button>
                    </div>
                    <button
                    onClick={() => handleRemoveItem(cartItem)}
                    className="delete-btn"
                    >
                    <img src={TrashIcon} alt="Remove" className="icon" />
                    </button>
                </td>
                <td className="product-data-cell">
                  {formatCurrency(cartItem.product.price * cartItem.quantity)}
                </td>
                </tr>
            ))}
            <tr>
                <td colSpan={3} className="total-cell">
                Total: &nbsp;
                <span className="total">
                  {/* {formatCurrency(getTotalPrice(cartItems))} */}
                    {formatCurrency(cartTotal)}
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        </>
    );
};