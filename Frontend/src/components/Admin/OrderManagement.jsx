import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare, FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import PaginationComponent from "../Common/PaginationComponent";
import { fetchAllOrders } from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const [sortColumn, setSortColumn] = useState(""); // Cột để sắp xếp
  const [sortDirection, setSortDirection] = useState(""); // Hướng sắp xếp (asc/desc/unsorted)
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user]);

  const itemsPerPage = 10;

  // Tìm kiếm danh sách users
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp danh sách users
  const sortedOrders = sortDirection
    ? [...filteredOrders].sort((a, b) => {
        const valueA = a[sortColumn]?.toLowerCase?.() || a[sortColumn];
        const valueB = b[sortColumn]?.toLowerCase?.() || b[sortColumn];

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        } else if (sortDirection === "desc") {
          return valueA < valueB ? 1 : -1;
        }
        return 0; // Không sắp xếp nếu ở trạng thái unsorted
      })
    : filteredOrders;

  // Cắt danh sách users theo trang hiện tại
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = sortedOrders.length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Nếu đã click cùng cột, thay đổi hướng sắp xếp
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(""); // Lần thứ ba sẽ trở về trạng thái unsorted
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc"); // Mặc định là tăng dần khi chọn cột mới
    }
  };

  const SortIcon = ({ sortColumn, columnName, sortDirection }) => {
    if (sortColumn === columnName) {
      if (sortDirection === "asc") {
        return <FaSortDown />;
      } else if (sortDirection === "desc") {
        return <FaSortUp />;
      }
    }
    return <FaSort />;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="flex flex-row mb-6 justify-between">
          <label htmlFor="search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng"
                value={searchTerm}
                onChange={handleSearch}
                className="bg-white px-4 py-2 pr-12 rounded-xl focus:outline-none w-full placeholder:text-neutral-400 border-[#e7e7e7] border-2"
              />

              {/* Search Icon */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <AiOutlineSearch className="h-6 w-6" />
              </button>
            </div>
          </label>

          <div className="flex justify-center items-center gap-2 bg-create-100 px-6 rounded-xl text-white hover:bg-create-200">
            <FaPlusSquare className="h-5 w-5" />
            <Link to="add-user" className="font-medium uppercase">
              Sản phẩm
            </Link>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-separate border-spacing-y-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-xl cursor-pointer"
                onClick={() => handleSort("_id")}
              >
                <div className="flex items-center space-x-2">
                  <span>Mã đơn hàng</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="_id"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center space-x-2">
                  <span>Khách hàng</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="category"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("brand")}
              >
                <div className="flex items-center space-x-2">
                  <span>Số lượng</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="brand"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center space-x-2">
                  <span>Tổng tiền</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="price"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("countInStock")}
              >
                <div className="flex items-center space-x-2">
                  <span>Thanh toán</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="countInStock"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("sku")}
              >
                <div className="flex items-center space-x-2">
                  <span>Giao hàng</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="sku"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("rating")}
              >
                <div className="flex items-center space-x-2">
                  <span>Ngày tạo</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="rating"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                <div className="flex justify-center">Thao tác</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    className="w-4 p-4 border-y-2 border-l-2 border-neutral-200 rounded-l-xl"
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={user._id}
                  >
                    {user._id}
                  </td>
                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    <div className="flex justify-center items-center">
                      {order.user?.avatar ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={order.user.avatar}
                          alt={order.user.name}
                        />
                      ) : (
                        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                          {order.user?.name
                            ? order.user.name
                                .trim()
                                .split(" ")
                                .slice(-1)[0][0]
                                .toUpperCase()
                            : ""}
                        </div>
                      )}
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {order.user.name}
                        </div>
                        <div
                          className="font-normal text-gray-500"
                          style={{
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={order.user.email}
                        >
                          {order.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-y-2 border-neutral-200 w-10">
                    {order.orderItems.length} Sản phẩm
                  </td>
                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    {order.totalPrice}
                  </td>
                  <td className="px-2 py-4 border-y-2 border-neutral-200">
                    <div
                      className={`flex items-center justify-center rounded-full text-sm font-semibold ${
                        order.paymentStatus === "paid"
                          ? "bg-green-200 text-green-800 shadow-sm"
                          : order.paymentStatus === "unpaid"
                          ? "bg-red-200 text-red-800 shadow-sm"
                          : order.paymentStatus === "pending"
                          ? "bg-yellow-200 text-yellow-800 shadow-sm"
                          : "bg-gray-200 text-gray-800 shadow-sm"
                      }`}
                    >
                      {order.paymentStatus === "paid"
                        ? "Đã thanh toán"
                        : order.paymentStatus === "unpaid"
                        ? "Chưa thanh toán"
                        : order.paymentStatus === "pending"
                        ? "Đang xử lý"
                        : "Không xác định"}
                    </div>
                  </td>
                  <td className="px-2 py-4 border-y-2 border-neutral-200 ">
                    <div
                      className={`flex items-center justify-center rounded-full text-sm font-semibold ${
                        order.status === "Processing"
                          ? "bg-yellow-200 text-yellow-800 shadow-sm"
                          : order.status === "Shipped"
                          ? "bg-blue-200 text-blue-800 shadow-sm"
                          : order.status === "Delivered"
                          ? "bg-green-200 text-green-800 shadow-sm"
                          : order.status === "Cancelled"
                          ? "bg-red-200 text-red-800 shadow-sm"
                          : "bg-gray-200 text-gray-800 shadow-sm"
                      }`}
                    >
                      {order.status === "Processing"
                        ? "Đang xử lý"
                        : order.status === "Shipped"
                        ? "Đã gửi đi"
                        : order.status === "Delivered"
                        ? "Đã giao"
                        : order.status === "Cancelled"
                        ? "Đã hủy"
                        : "Không xác định"}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    <div className="flex items-center">
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y-2 border-neutral-200 border-r-2 rounded-r-xl">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <button className="text-neutral-400 hover:text-blue-400 cursor-pointer">
                        <EyeIcon className="size-6" />
                      </button>
                      <button className="text-neutral-400 hover:text-green-400 cursor-pointer">
                        <PencilSquareIcon className="size-6" />
                      </button>
                      <button
                        className="text-neutral-400 hover:text-red-400 cursor-pointer"
                        onClick={() => {}}
                      >
                        <TrashIcon className="size-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  Không có người dùng nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
