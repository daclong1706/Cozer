import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import ButtonDarkMode from "../Common/ButtonDarkMode";

const AdminLayout = () => {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerText, setHeaderText] = useState("");

  useEffect(() => {
    // Cập nhật tiêu đề dựa trên URL
    if (location.pathname === "/admin") {
      setHeaderText("Bảng điều khiển");
    } else if (location.pathname === "/admin/users") {
      setHeaderText("Quản lý tài khoản");
    } else if (location.pathname === "/admin/products") {
      setHeaderText("Quản lý sản phẩm");
    } else if (location.pathname === "/admin/orders") {
      setHeaderText("Quản lý đơn hàng");
    }
  }, [location.pathname]); // Chỉ chạy khi đường dẫn thay đổi

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-secondary text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-secondary w-64 min-h-screen text-white absolute md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto h-screen dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">{headerText}</h2>
          <ButtonDarkMode />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
