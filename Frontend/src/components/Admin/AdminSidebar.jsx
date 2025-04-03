import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import logo from "../../assets/svg/logo.svg";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="pl-4 h-screen flex flex-col">
      <div className="flex justify-center items-center mt-8 mb-16 -ml-4">
        <Link to="/admin" className="text-2xl font-medium">
          <img src={logo} alt="logo" className="filter brightness-0 invert" />
        </Link>
      </div>
      <nav className="flex flex-col space-y-4 flex-grow">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <FaUser />
          <span>Bảng điều khiển</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <FaUser />
          <span>Tài khoản</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <FaBoxOpen />
          <span>Sản phẩm</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="my-6 mr-4">
        <button
          onClick={handleLogout}
          className="w-full bg-white hover:bg-gray-200 text-secondary p-3 rounded-3xl flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
