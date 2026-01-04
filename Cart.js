import React from "react";
import CartItem from "./CartItem";

export default function Cart({ cart, updateQuantity, removeFromCart }) {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  );

  return (
    <div className="cart">
      <h2>Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}

      {cart.length > 0 && (
        <>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ₹{totalPrice}</p>
        </>
      )}
    </div>
  );
}
