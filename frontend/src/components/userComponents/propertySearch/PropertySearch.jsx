import "react-datepicker/dist/react-datepicker.css";
import "./PropertySearch.css";
import PropertySort from "../propertySort/PropertySort";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Input } from "@material-tailwind/react";

export default function PropertySearch() {
  const [search, setSearch] = useState(0);

  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-1 px-3 items-center w-full h-[65px] rounded-md bg-[#fcfbfb] box-shadow mb-[2rem] md:my-4">
        <div className="w-full md:w-full">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={(e) => {
              e.target.value.length !== 0
                ? setSearch(e.target.value)
                : setSearch(0);
            }}
          />
        </div>
      </div>
      <PropertySort search={search} />
    </>
  );
}
