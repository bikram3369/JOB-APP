import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setFilterQuery } from "@/redux/jobSlice";

// Define all filter options
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: [
      { label: "0 - 0.4 LPA", min: 0, max: 0.4 },
      { label: "0.42 - 1 LPA", min: 0.42, max: 1 },
      { label: "1 - 5 LPA", min: 1, max: 5 },
    ],
  },
];


const FilterCard = () => {
  // Old code kept as comments (you didn’t want to remove these)
  // const [selectedValue, setSelectedValue] = useState('');
  // const dispatch = useDispatch();
  // const changeHandler = (value) => {
  //     setSelectedValue(value);
  // }
  // useEffect(()=>{
  //     dispatch(setSearchedQuery(selectedValue));
  // },[selectedValue]);

   const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Industry: "",
    Salary: null,
  });

  const changeHandler = (filterType, value) => {
    const parsedValue = filterType === "Salary" ? JSON.parse(value) : value;

    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: parsedValue,
    }));
  };

  useEffect(() => {
    dispatch(setFilterQuery(selectedFilters));
  }, [selectedFilters]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h1 className="font-bold text-lg">{data.filterType}</h1>

          <RadioGroup
            value={data.filterType === "Salary" ? JSON.stringify(selectedFilters[data.filterType] || {}) : selectedFilters[data.filterType]}
            onValueChange={(val) => changeHandler(data.filterType, val)}
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              const value = data.filterType === "Salary" ? JSON.stringify({ min: item.min, max: item.max }) : item;

              return (
                <div className="flex items-center space-x-2 my-2" key={idx}>
                  <RadioGroupItem value={value} id={itemId} />
                  <Label htmlFor={itemId}>{data.filterType === "Salary" ? item.label : item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;