import { useState } from "react";
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import CartDrawer from "../Layout/CartDrawer";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [navOpenDrawer, setNavOpenDrawer] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavOpenDrawer(!navOpenDrawer);
  };

  const toggleCartDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 h-24 z-50">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/products/all"
            className="text-gray-700 hover:text-black font-medium uppercase"
          >
            Products
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium uppercase"
          >
            Collection
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium uppercase"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium uppercase"
          >
            Contact
          </Link>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Search */}

          <SearchBar />

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer openDrawer={openDrawer} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navOpenDrawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>

            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
