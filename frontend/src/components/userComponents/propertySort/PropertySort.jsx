import { useState } from "react";
import PropertyList from "../propertyList/PropertyList";
import Select from "react-select";
import Slider from "react-slider";
import "./PropertySort.css";

// eslint-disable-next-line react/prop-types
export default function PropertySort({ search }) {
  const min = 1000,
    max = 100000;
  const [sortData, setSortData] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [priceFilter, setPiceFilter] = useState([min, max]);

  const handleChange = (e) => {
    setSortData(e);
  };

  const options = [
    { value: "wifi", label: "wifi" },
    { value: "petSpace", label: "petSpace" },
    { value: "pool", label: "pool" },
    { value: "bathtub", label: "bathtub" },
  ];

  const handleMultipleChange = (selectedOptions) => {
    const updatedSelectedOptions = selectedOptions.map((option) => ({
      value: option.value,
      label: option.value,
    }));

    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 mb-10 gap-5">
        <div className="w-full md:w-1/3">
          <div className="relative mb-6">
            <div>
              <div className="mb-2">
                {" "}
                Price Range: ₹{priceFilter[0]} - ₹{priceFilter[1]}
              </div>
              <Slider
                className="slider"
                onChange={setPiceFilter}
                value={priceFilter}
                min={min}
                max={max}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
              Min : ₹1000
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
              Max : ₹100000
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:items-center">
          <div>
            <div className="mb-2">Amenities:</div>
            <Select
              className="border hover:border-gray-400 border-gray-500 rounded-md focus:outline-none focus:shadow-outline"
              options={options}
              onChange={handleMultipleChange}
              value={selectedOptions}
              isMulti={true}
            />
          </div>
          <div className="relative inline-block text-left w-full md:w-52">
            <div className="mb-2">Price Sort:</div>
            <select
              onChange={(e) => handleChange(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-500 hover:border-gray-400 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <PropertyList
        sort={sortData}
        search={search}
        aminitesSort={selectedOptions}
        priceFilter={priceFilter}
      />
    </>
  );
}
