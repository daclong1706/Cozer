import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];
const SortOptions = () => {
  const [selected, setSelected] = useState(people[1]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    // <div className="mb-4 flex items-center justify-end mr-4">
    //   <Listbox value={selected} onChange={setSelected}>
    //     <ListboxButton
    //       className={clsx(
    //         "relative block rounded-lg bg-black/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black",
    //         "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
    //       )}
    //     >
    //       {selected.name}
    //       <ChevronDownIcon
    //         className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
    //         aria-hidden="true"
    //       />
    //     </ListboxButton>
    //     <ListboxOptions
    //       anchor="bottom"
    //       transition
    //       className={clsx(
    //         "w-[var(--button-width)] rounded-xl border border-black/20 bg-black/20 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
    //         "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
    //       )}
    //     >
    //       {people.map((person) => (
    //         <ListboxOption
    //           key={person.name}
    //           value={person}
    //           className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/20"
    //         >
    //           <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
    //           <div className="text-sm/6 text-white">{person.name}</div>
    //         </ListboxOption>
    //       ))}
    //     </ListboxOptions>
    //   </Listbox>
    // </div>

    <div className="mb-4 flex items-center justify-end">
      <select
        name=""
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="mr-4 p-2 rounded-md focus:outline-none bg-gray-300"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ss">ss</option>
      </select>
    </div>
  );
};

export default SortOptions;
