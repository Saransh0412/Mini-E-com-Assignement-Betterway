import React from "react";

export default function Filters({ products, filters, setFilters }) {
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="filters">
      <input
        placeholder="Search products"
        value={filters.search}
        onChange={e =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select
        value={filters.category}
        onChange={e =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={e =>
          setFilters({ ...filters, sort: e.target.value })
        }
      >
        <option value="">Sort by price</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      <button onClick={() =>
        setFilters({ search: "", category: "all", sort: "" })
      }>
        Clear Filters
      </button>
    </div>
  );
}
