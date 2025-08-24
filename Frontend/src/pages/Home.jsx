import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Layout/Hero";
import CollectionSection from "../components/Products/CollectionSection";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import ProductCategories from "../components/Products/ProductCategories";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGird from "../components/Products/ProductGird";
import { useEffect, useState } from "react";
import {
  fetchBestSeller,
  fetchProductsByFilters,
} from "../redux/slices/productsSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setbestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch product for a specific collection
    dispatch(
      fetchProductsByFilters({
        category: "Bottom Wear",
        limit: 8,
      })
    );
    dispatch(fetchBestSeller());

    // Fetch best seller product
    // const fetchBestSellers = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
    //     );
    //     setbestSellerProduct(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero title={"Iphone 16 Series"} />
      <CollectionSection />
      <ProductCategories />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top</h2>
        <ProductGird products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
