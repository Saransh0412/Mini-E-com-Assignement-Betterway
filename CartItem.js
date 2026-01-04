import React from "react";

export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="cart-item">
      <span>{item.title}</span>

      <input
        type="number"
        min="1"
        max={item.stock}
        value={item.quantity}
        onChange={e =>
          updateQuantity(item.id, Number(e.target.value))
        }
      />

      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
}
