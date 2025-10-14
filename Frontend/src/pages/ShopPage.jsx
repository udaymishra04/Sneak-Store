import { React, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Loading from "../components/CircularIndeterminate";
import { CartState } from "../context/CartProvider";
import { getAllProducts } from "../services/productService";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/ShopPage.css";

export default function ShopPage() {
  const {
    productState: { sort, category, rating, brand, searchQuery }
  } = CartState();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  // Fetching all the products from the DB
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
      console.log("Products fetched:", res);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  //   const [filters, setFilters] = useState({
  //   category: [],
  //   rating: [],
  //   brand: [],
  // });

  const transformProducts = () => {
    let sortedProducts = products;
    // Ascending or Descending
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    console.log("category:", category);
    // Accoring to Category
    if (category.length > 0) {
      sortedProducts = sortedProducts.filter(prod =>
        category.some(cat => prod.category === cat)
      );
    }

    if (rating) {
      sortedProducts = sortedProducts.filter(prod => prod.rating >= rating);
    }

    if (brand.length > 0) {
      sortedProducts = sortedProducts.filter(prod =>
        brand.some(br => prod.brand === br)
      );
    }
    return sortedProducts;
  };

  return (
    <div
      id="top"
      data-aos="fade-in"
      className="flex justify-content-center max-w-7xl mx-auto px-6 py-10 gap-8">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Filters />
          {/* Products */}
          <main className="">
            <h2 className="text-2xl font-bold mb-6">All Sneakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformProducts().map(product => (
                <div key={product.id}>
                  <ProductCard prod={product} />
                </div>
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
