import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Checkbox,
  Field,
  Label,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CustomCheckbox from "../Common/CustomCheckbox";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "", // Danh mục sản phẩm (Loại điện thoại)
    brand: [], // Hãng sản xuất
    usage: [], // Nhu cầu sử dụng
    processor: [], // Chip xử lý
    ram: [], // Dung lượng RAM
    storage: [], // Bộ nhớ trong
    specialFeatures: [], // Tính năng đặc biệt
    cameraFeatures: [], // Tính năng camera
    screenRefreshRate: [], // Tần số quét màn hình
    screenSize: [], // Kích thước màn hình
    screenType: [], // Kiểu màn hình
    nfc: "", // Công nghệ NFC
    minPrice: 0,
    maxPrice: 100000000,
  });

  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const categories = ["Điện thoại", "Máy tính bảng", "Laptop"];
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "OPPO",
    "Vivo",
    "Realme",
    "OnePlus",
    "Google",
    "Asus",
  ];
  const usages = ["Chơi game", "Chụp ảnh", "Văn phòng", "Giải trí", "Học tập"];
  const processors = [
    "Snapdragon 8 Gen 2",
    "Apple A17 Pro",
    "Exynos 2400",
    "MediaTek Dimensity 9200",
    "Kirin 9000S",
  ];
  const ramSizes = ["4GB", "6GB", "8GB", "12GB", "16GB"];
  const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
  const specialFeatures = [
    "Chống nước IP68",
    "Sạc nhanh 120W",
    "Vân tay dưới màn hình",
    "Hỗ trợ bút cảm ứng",
    "Mở khóa khuôn mặt",
  ];
  const cameraFeatures = [
    "Zoom quang 10x",
    "Chụp đêm AI",
    "Chống rung OIS",
    "Góc rộng 120 độ",
  ];
  const screenRefreshRates = ["60Hz", "90Hz", "120Hz", "144Hz"];
  const screenSizes = [
    "5.8 inch",
    "6.1 inch",
    "6.5 inch",
    "6.7 inch",
    "7.0 inch",
  ];
  const screenTypes = ["OLED", "AMOLED", "IPS LCD", "Dynamic AMOLED", "LTPO"];
  const nfcSupport = ["Có", "Không"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      brand: params.brand ? params.brand.split(",") : [],
      usage: params.usage ? params.usage.split(",") : [],
      processor: params.processor ? params.processor.split(",") : [],
      ram: params.ram ? params.ram.split(",") : [],
      storage: params.storage ? params.storage.split(",") : [],
      specialFeatures: params.specialFeatures
        ? params.specialFeatures.split(",")
        : [],
      cameraFeatures: params.cameraFeatures
        ? params.cameraFeatures.split(",")
        : [],
      screenRefreshRate: params.screenRefreshRate
        ? params.screenRefreshRate.split(",")
        : [],
      screenSize: params.screenSize ? params.screenSize.split(",") : [],
      screenType: params.screenType ? params.screenType.split(",") : [],
      nfc: params.nfc || "",
      // minPrice: params.minPrice || 0,
      // maxPrice: params.maxPrice || 100000000,
    });

    setPriceRange([params.minPrice || 0, params.maxPrice || 100000000]);
  }, [searchParams]);

  // const [filters, setFilters] = useState({
  //   category: "", // Danh mục sản phẩm (Loại điện thoại)
  //   brand: [], // Hãng sản xuất
  //   usage: [], // Nhu cầu sử dụng
  //   processor: [], // Chip xử lý
  //   ram: [], // Dung lượng RAM
  //   storage: [], // Bộ nhớ trong
  //   specialFeatures: [], // Tính năng đặc biệt
  //   cameraFeatures: [], // Tính năng camera
  //   screenRefreshRate: [], // Tần số quét màn hình
  //   screenSize: [], // Kích thước màn hình
  //   screenType: [], // Kiểu màn hình
  //   nfc: "", // Công nghệ NFC
  //   minPrice: 0,
  //   maxPrice: 100000000,
  // });

  const [selected, setSelected] = useState([]);

  const createSelectedOption = (option) => {
    if (isSelected(option)) {
      setSelected(selected.filter((it) => it !== option));
      return;
    }
    setSelected([...selected, option]);

    console.log(filters);
  };

  const isSelected = (option) => {
    return selected.some((it) => it === option);
  };

  const handleCheckboxChange = (filterType, option) => {
    setFilters((prevFilters) => {
      const newFilter = prevFilters[filterType].includes(option)
        ? prevFilters[filterType].filter((item) => item !== option) // Nếu đã chọn, bỏ
        : [...prevFilters[filterType], option]; // Nếu chưa chọn, thêm vào

      updateURLParams({
        ...prevFilters,
        [filterType]: newFilter,
      });

      return {
        ...prevFilters,
        [filterType]: newFilter,
      };
    });
    console.log(filters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    console.log("ok");
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
      <div>
        {/* <h4 className="text-lg font-semibold text-gray-700 mb-2">Category</h4>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  // onChange={(e) => {
                  //   setSearchParams({ category: e.target.value });
                  // }}
                />
                {category}
              </label>
            </li>
          ))}
        </ul> */}

        <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
          <Disclosure as="div" className="" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between border-b border-[#d9d9d9] pb-2">
              <span className="font-medium text-primary group-data-[hover]:text-primary/80">
                Price
              </span>
              <ChevronDownIcon className="size-5 fill-primary group-data-[hover]:fill-primary/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-primary/50">
              <label className="block text-gray-600 font-medium mb-2">
                Price
              </label>
              <input
                type="range"
                name="priceRange"
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="slider w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-gray-600 mt-2">
                <span>0</span>
                <span>{priceRange[1]}</span>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        {/* Brand */}
        <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
          <Disclosure as="div" className="" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between border-b border-[#d9d9d9] pb-2">
              <span className="font-medium text-primary group-data-[hover]:text-primary/80">
                Hãng sản xuất
              </span>
              <ChevronDownIcon className="size-5 fill-primary group-data-[hover]:fill-primary/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-primary/50">
              <div className="h-52 overflow-y-auto custom-scrollbar">
                {brands.map((brand) => (
                  <Field
                    key={brand}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
                  >
                    <Checkbox
                      value={brand}
                      checked={filters.brand.includes(brand)}
                      onChange={() => handleCheckboxChange("brand", brand)}
                      className="group block size-4 rounded border bg-white data-[checked]:bg-primary"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="text-gray-800">{brand}</Label>
                  </Field>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
          <Disclosure as="div" className="" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between border-b border-[#d9d9d9] pb-2">
              <span className="font-medium text-primary group-data-[hover]:text-primary/80">
                Brand
              </span>
              <ChevronDownIcon className="size-5 fill-primary group-data-[hover]:fill-primary/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-primary/50">
              <div className="max-h-52 overflow-y-auto custom-scrollbar">
                {usages.map((usage) => (
                  <Field
                    key={usage}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
                  >
                    <Checkbox
                      value={usage}
                      checked={filters.usage.includes(usage)}
                      onChange={() => handleCheckboxChange("usage", usage)}
                      className="group block size-4 rounded border bg-white data-[checked]:bg-primary"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="text-gray-800">{usage}</Label>
                  </Field>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
          <Disclosure as="div" className="" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between border-b border-[#d9d9d9] pb-2">
              <span className="font-medium text-primary group-data-[hover]:text-primary/80">
                Brand
              </span>
              <ChevronDownIcon className="size-5 fill-primary group-data-[hover]:fill-primary/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-primary/50">
              <div className="h-52 overflow-y-auto custom-scrollbar">
                {processors.map((processor) => (
                  <Field
                    key={processor}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
                  >
                    <Checkbox
                      value={processor}
                      checked={filters.processor.includes(processor)}
                      onChange={() =>
                        handleCheckboxChange("processor", processor)
                      }
                      className="group block size-4 rounded border bg-white data-[checked]:bg-primary"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="text-gray-800">{processor}</Label>
                  </Field>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        {/* Search Box */}
      </div>
    </div>
  );
};

export default FilterSidebar;
