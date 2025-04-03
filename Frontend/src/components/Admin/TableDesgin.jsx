import { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  FaSort,
  FaSortDown,
  FaSortUp,
  FaPlus,
  FaPlusSquare,
} from "react-icons/fa";
import PaginationComponent from "../Common/PaginationComponent";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const TableDesgin = ({ users, deleteItem }) => {
  const [sortColumn, setSortColumn] = useState(""); // Cột để sắp xếp
  const [sortDirection, setSortDirection] = useState(""); // Hướng sắp xếp (asc/desc/unsorted)
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm

  const itemsPerPage = 10;

  // Tìm kiếm danh sách users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp danh sách users
  const sortedUsers = sortDirection
    ? [...filteredUsers].sort((a, b) => {
        const valueA = a[sortColumn]?.toLowerCase?.() || a[sortColumn];
        const valueB = b[sortColumn]?.toLowerCase?.() || b[sortColumn];

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        } else if (sortDirection === "desc") {
          return valueA < valueB ? 1 : -1;
        }
        return 0; // Không sắp xếp nếu ở trạng thái unsorted
      })
    : filteredUsers;

  // Cắt danh sách users theo trang hiện tại
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = sortedUsers.length;

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

  return (
    <div className="overflow-x-auto sm:rounded-lg">
      <div className="flex flex-row mb-6 justify-between">
        <label htmlFor="search">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản"
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
            Tài khoản
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
                <span>ID</span>
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
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center space-x-2">
                <span>Tên</span>
                <SortIcon
                  sortColumn={sortColumn}
                  columnName="name"
                  sortDirection={sortDirection}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("role")}
            >
              <div className="flex items-center space-x-2">
                <span>Phân quyền</span>
                <SortIcon
                  sortColumn={sortColumn}
                  columnName="role"
                  sortDirection={sortDirection}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("accountStatus")}
            >
              <div className="flex items-center space-x-2">
                <span>Trạng thái</span>
                <SortIcon
                  sortColumn={sortColumn}
                  columnName="accountStatus"
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
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr
                key={user._id}
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
                <td
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white border-y-2 border-neutral-200"
                >
                  {user?.avatar ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                      {user?.name
                        ? user.name
                            .trim()
                            .split(" ")
                            .slice(-1)[0][0]
                            .toUpperCase()
                        : ""}
                    </div>
                  )}
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                  {capitalizeFirstLetter(user.role)}
                </td>
                <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        user.accountStatus === "active"
                          ? "bg-green-500"
                          : user.accountStatus === "inactive"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>{" "}
                    {capitalizeFirstLetter(user.accountStatus)}
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
                      onClick={() => deleteItem(user._id)}
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
  );
};

export default TableDesgin;
