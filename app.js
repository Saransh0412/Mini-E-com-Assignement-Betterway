import React, { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./data/api";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: ""
  });

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Load cart from localStorage (bonus)
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Persist cart (bonus)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (filters.sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters]);

  const addToCart = (product) => {
    setCart(prev => {
      const item = prev.find(i => i.id === product.id);
      if (item) {
        if (item.quantity < product.stock) {
          return prev.map(i =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(qty, item.stock) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="container">
      <h1>Mini E-Commerce</h1>

      <Filters
        products={products}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="layout">
        <ProductGrid
          products={filteredProducts}
          addToCart={addToCart}
        />
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
}
