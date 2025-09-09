import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { CartState } from "../context/CartProvider";
import "../styles/ShopPage.css";

export default function ShopPage() {
  const {state: {products}} = CartState();

    const [filters, setFilters] = useState({
    category: [],
    rating: [],
    brand: [],
  });

  return (
    <div data-aos="fade-in" className="flex justify-content-center max-w-7xl mx-auto px-6 py-10 gap-8">
      
      <Filters filters={filters} setFilters={setFilters} />
      {/* Products */}
      <main className="">
        <h2 className="text-2xl font-bold mb-6">All Sneakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}             
            >
              <ProductCard
                prod={product}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
