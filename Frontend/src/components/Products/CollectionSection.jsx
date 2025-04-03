import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchBestSeller,
  fetchNewArrival,
} from "../../redux/slices/productsSlice";

const CollectionSection = () => {
  const dispatch = useDispatch();
  const { bestSellerProducts, newArrivalProducts, loading, error } =
    useSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState("New Arrival");

  useEffect(() => {
    // Fetch products for both categories
    dispatch(fetchBestSeller());
    dispatch(fetchNewArrival());
  }, [dispatch]);

  const getActiveProducts = () => {
    if (activeCategory === "Bestseller") {
      return bestSellerProducts;
    }
    return newArrivalProducts;
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const products = getActiveProducts();

  return (
    <section className="py-4 px-4 lg:px-12">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 pb-4">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => handleCategoryChange("New Arrival")}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeCategory === "New Arrival"
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              New Arrival
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleCategoryChange("Bestseller")}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeCategory === "Bestseller"
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              Bestseller
            </button>
          </li>
        </ul>
      </div>

      {/* Grid layout for displaying products */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {products.map((product, index) => (
          <div key={index} className="relative group overflow-hidden">
            <Link to={`/product/${product._id}`} className="block">
              <img
                src={product.images[0].url || null}
                alt={product.images[0].altText || product.name}
                className="w-full h-[400px] object-cover transition-transform duration-500 ease-in-out scale-100 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 bg-white opacity-90 p-4">
                <p className="text-xl font-bold text-gray-900 mb-0">
                  {product.name}
                </p>
                <span className="text-gray-500">
                  Keeping things tidy - now entirely from recycled materials
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
