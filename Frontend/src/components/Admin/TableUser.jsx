import { getTheme } from "@table-library/react-table-library/baseline";
import {
  SelectTypes,
  useRowSelect,
} from "@table-library/react-table-library/select";
import {
  SortToggleType,
  useSort,
} from "@table-library/react-table-library/sort";
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";

import { Checkbox } from "@headlessui/react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSort, FaSortDown, FaSortUp, FaPlus } from "react-icons/fa";
import UserNotFound from "../../assets/img/user-not-found.png";
import { Link } from "react-router-dom";

const TableUser = ({ users, deleteItem }) => {
  const [search, setSearch] = useState(""); // State for search input

  // Theme configuration for the table
  const theme = useTheme([
    getTheme(),
    {
      Table: `
      display: flow;
      max-width: 100%;
      overflow-x: auto;
    `,
      Row: `
      border: 2px solid #e7e7e7;
      border-radius: 10px;
      margin-bottom: 10px;
    `,
    },
  ]);

  // Filtered data based on search input
  const updatedData = users.map((item) => ({
    ...item,
    id: item._id,
  }));

  const data = {
    nodes: updatedData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  };

  // Sorting configuration
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        size: "10px",
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        ID: (array) => array.sort((a, b) => a.id - b.id), // Sort by ID
        EMAIL: (array) => array.sort((a, b) => a.email.localeCompare(b.email)), // Sort by Email
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)), // Sort by Name
        ROLE: (array) => array.sort((a, b) => a.role.localeCompare(b.role)), // Sort by Role
      },
    }
  );

  const select = useRowSelect(
    data,
    {
      onChange: onSelectChange,
    },
    {
      rowSelect: SelectTypes.MultiSelect,
      buttonSelect: SelectTypes.MultiSelect,
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  function onSelectChange(action, state) {
    console.log(action, state);
    console.log(!select.state.all && !select.state.none);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Helper Functions for Sorting Icons

  const getIcon = (sortKey) => {
    if (sort.state.sortKey === sortKey && sort.state.reverse) {
      return <FaSortDown />;
    }

    if (sort.state.sortKey === sortKey && !sort.state.reverse) {
      return <FaSortUp />;
    }

    return <FaSort />;
  };

  return (
    <div className="bg-white p-6">
      <div className="flex flex-row mb-6 justify-between">
        <label htmlFor="search">
          {/* Search by Task:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} /> */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm tên người dùng"
              value={search}
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
          <FaPlus className="h-4 w-4" />
          <Link to="add-user" className="font-medium">
            Tài khoản
          </Link>
        </div>
      </div>

      <Table data={data} sort={sort} theme={theme} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow className="!bg-neutral-100 !flex !justify-end">
                {/* <HeaderCellSelect /> */}
                <HeaderCell stiff className="!flex-none w-16">
                  <div className="w-fit p-2.5 hover:bg-cerulean-blue-100/25 opacity-75 rounded-full">
                    <Checkbox
                      aria-label="select all"
                      checked={select.state.all}
                      onChange={select.fns.onToggleAll}
                      indeterminate={!select.state.all && !select.state.none}
                      className="group block size-4 rounded border-2 bg-white transition data-[checked]:bg-black data-[indeterminate]:bg-black cursor-pointer"
                    >
                      {/* Hiển thị biểu tượng dấu trừ khi trạng thái là indeterminate */}
                      {({ indeterminate }) => (
                        <svg
                          className="stroke-white opacity-0 group-data-[checked]:opacity-100 group-data-[indeterminate]:opacity-100"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          {indeterminate ? (
                            <path
                              d={
                                indeterminate ? "M3 7L11 7" : "M3 8L6 11L11 3.5"
                              }
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ) : (
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      )}
                    </Checkbox>
                  </div>
                </HeaderCell>
                <HeaderCell className="!flex-auto hover:!text-gray-500 w-32">
                  <button
                    onClick={() => {
                      sort.fns.onToggleSort({
                        sortKey: "ID",
                      });
                    }}
                    className="w-full flex items-center justify-between border-r-2 border-neutral-300 pr-2"
                  >
                    ID {getIcon("ID")}
                  </button>
                </HeaderCell>

                <HeaderCell className="!flex-auto hover:!text-gray-500 w-64">
                  <button
                    onClick={() => {
                      sort.fns.onToggleSort({
                        sortKey: "EMAIL",
                      });
                    }}
                    className="w-full flex items-center justify-between border-r-2 border-neutral-300 pr-2"
                  >
                    Email {getIcon("EMAIL")}
                  </button>
                </HeaderCell>

                <HeaderCell className="!flex-auto hover:!text-gray-500 w-64">
                  <button
                    onClick={() => {
                      sort.fns.onToggleSort({
                        sortKey: "NAME",
                      });
                    }}
                    className="w-full flex items-center justify-between border-r-2 border-neutral-300 pr-2"
                  >
                    Name {getIcon("NAME")}
                  </button>
                </HeaderCell>

                <HeaderCell className="!flex-auto hover:!text-gray-500 w-32">
                  <button
                    onClick={() => {
                      sort.fns.onToggleSort({
                        sortKey: "ROLE",
                      });
                    }}
                    className="w-full flex items-center justify-between border-r-2 border-neutral-300 pr-2"
                  >
                    Role {getIcon("ROLE")}
                  </button>
                </HeaderCell>

                <HeaderCell className="!flex-auto w-32">
                  <button className="w-full flex items-center justify-center">
                    Action
                  </button>
                </HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.length > 0 ? (
                tableList.map((item) => (
                  <Row key={item.id} item={item} className="!flex !justify-end">
                    <Cell stiff className="!flex-none w-16">
                      <div className="w-fit p-2.5 hover:bg-cerulean-blue-100/25 opacity-75 rounded-full">
                        <Checkbox
                          aria-label="select item"
                          checked={select.state.ids.includes(item.id)}
                          onChange={() => {
                            select.fns.onToggleById(item.id);
                          }}
                          className="group block size-4 rounded border-2 bg-white data-[checked]:bg-black data-[checked]:border-black cursor-pointer"
                        >
                          <svg
                            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Checkbox>
                      </div>
                    </Cell>
                    <Cell className="!flex-auto w-32">{item.id}</Cell>
                    <Cell className="!flex-none w-64">{item.email}</Cell>
                    <Cell className="!flex-auto w-64">{item.name}</Cell>
                    <Cell className="!flex-auto w-32">{item.role}</Cell>
                    <Cell className="!flex-auto w-32">
                      <div className="flex flex-row gap-3 justify-center items-center">
                        <button className="text-neutral-400 hover:text-blue-400 cursor-pointer">
                          <EyeIcon className="size-6" />
                        </button>
                        <button className="text-neutral-400 hover:text-green-400 cursor-pointer">
                          <PencilSquareIcon className="size-6" />
                        </button>
                        <button
                          className="text-neutral-400 hover:text-red-400 cursor-pointer"
                          onClick={() => deleteItem(item.id)}
                        >
                          <TrashIcon className="size-6" />
                        </button>
                      </div>
                    </Cell>
                  </Row>
                ))
              ) : (
                <Row item={{ id: "no-data" }} key="no-data">
                  <Cell colSpan={5}>
                    <div className="flex flex-col justify-center items-center py-6 text-gray-500 w-full">
                      <img
                        src={UserNotFound}
                        alt="User Not Found"
                        className="mr-0 w-32 h-32"
                      />
                      <h2>Không tìm thấy kết quả nào phù hợp.</h2>
                    </div>
                  </Cell>
                </Row>
              )}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default TableUser;
