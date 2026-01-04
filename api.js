export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.slice(0, 20).map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    stock: p.stock
  }));
}
