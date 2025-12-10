import React, { useState, useEffect, useMemo } from "react";
import { fetchProducts } from "../api/fetchProduct";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

const ProductListing = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = ["All", ...new Set(allProducts.map(p => p.category))];
    return uniqueCategories.filter(cat => cat && cat !== "All").sort();
  }, [allProducts]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setProducts(filtered);
  }, [allProducts, activeCategory, sortOption, priceRange]);

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProducts();
        
        if (response.data && Array.isArray(response.data)) {
          setAllProducts(response.data);
          
          // Find max price for price range
          const maxPrice = Math.max(...response.data.map(p => p.price));
          setPriceRange([0, Math.ceil(maxPrice / 1000) * 1000]); // Round to nearest 1000
        } else {
          throw new Error("Invalid data received");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        toast.error("Failed to load products ❌");
      } finally {
        setLoading(false);
      }
    };
    
    getProducts();
  }, []);

  const selectCategory = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setSortOption("featured");
    const maxPrice = Math.max(...allProducts.map(p => p.price));
    setPriceRange([0, maxPrice || 10000]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <div className="text-xl text-gray-600">Loading products...</div>
          <p className="text-gray-500 mt-2">Fetching the best products for you</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😞</div>
          <div className="text-2xl text-red-600 mb-4">{error}</div>
          <p className="text-gray-600 mb-8">Please check your connection and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header - ALWAYS VISIBLE */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center mb-3 text-gray-900">Our Products</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Browse through our amazing collection of products. Filter by category or price to find what you need.
          </p>
        </div>

        {/* Filters - ALWAYS VISIBLE */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Sort Dropdown */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By:</label>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full lg:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Active Filters and Reset */}
            {(activeCategory !== "All" || sortOption !== "featured" || priceRange[1] < (Math.max(...allProducts.map(p => p.price)) || 10000)) && (
              <div className="w-full lg:w-auto flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-primary font-medium flex items-center gap-1"
                >
                  <span>🔄</span>
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Category Filter and Price Range - ALWAYS VISIBLE */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories */}
              <div className="lg:w-2/3">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => selectCategory("All")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === "All"
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => selectCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="lg:w-1/3">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={Math.max(...allProducts.map(p => p.price)) || 10000}
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{(Math.max(...allProducts.map(p => p.price)) || 10000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(activeCategory !== "All" || sortOption !== "featured" || priceRange[1] < (Math.max(...allProducts.map(p => p.price)) || 10000)) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {activeCategory !== "All" && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory("All")} className="ml-1 hover:text-blue-900">×</button>
                </span>
              )}
              {sortOption !== "featured" && (
                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Sorted: {sortOption.replace('-', ' ')}
                  <button onClick={() => setSortOption("featured")} className="ml-1 hover:text-purple-900">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Summary - ALWAYS VISIBLE */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
          </h2>
          {activeCategory !== "All" && (
            <p className="text-gray-600 mt-1">
              in <span className="font-semibold text-primary">{activeCategory}</span>
            </p>
          )}
          {products.length > 0 && (
            <div className="text-gray-600 mt-2">
              Showing {Math.min(products.length, 1)}-{Math.min(products.length, 12)} of {products.length}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {activeCategory !== "All" ? `No products found in ${activeCategory}` : 'No products available'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {activeCategory !== "All" 
                ? `We couldn't find any products in the ${activeCategory} category. Try selecting a different category.`
                : 'There are currently no products in our catalog. Please check back later.'}
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Show All Products
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default ProductListing;