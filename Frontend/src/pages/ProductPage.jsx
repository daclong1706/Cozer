import { useState, useEffect, useRef } from "react";
import HeroProduct from "../components/Layout/HeroProduct";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGird from "../components/Products/ProductGird";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const ProductPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add Event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <HeroProduct />
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Filter Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden border p-2 flex justify-center items-center"
        >
          <FaFilter className="mr-2" /> Filters
        </button>

        {/*  Filter Sidebar */}
        <div
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 z-50 left-0 bg-white overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-auto lg:bg-transparent lg:overflow-y-visible min-w-[250px]`}
        >
          <FilterSidebar />
        </div>

        <div className="flex-grow p-4">
          <h2 className="text-2xl uppercase mb-4">All</h2>

          {/* Sort Options */}
          <SortOptions />

          {/* Product Gird */}
          <ProductGird products={products} loading={loading} error={error} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
