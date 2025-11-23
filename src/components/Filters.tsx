import React, { useEffect, useRef, useState } from 'react';
import { IoFilterOutline } from 'react-icons/io5';
import { FaChevronDown } from "react-icons/fa";

interface FilterOption {
  label: string;
  value: string;
  dropdown: boolean;
  options?: string[];
}

interface FiltersProps {
  filterOptions: FilterOption[];
  onFilterChange: (filters: { type: string; value: string }[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterOptions, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);
  const [dropdownType, setDropdownType] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleAddFilter = (type: string) => {
    const option = filterOptions.find(o => o.value === type);

    // THIS IS THE ONLY FIX
    if (option?.dropdown) {
      setDropdownType(type);
      setShowFilterDropdown(false);
      if (type === "year") {
        setSelectedYears(activeFilters.filter(f => f.type === "year").map(f => f.value));
      }
      return;
    }
    // END OF FIX

    // Non-dropdown filters (e.g. "Drafts")
    if (!activeFilters.some(f => f.type === type && f.value === type)) {
      updateFilters([...activeFilters, { type, value: type }]);
    }
    setShowFilterDropdown(false);
  };

  const handleDropdownSelect = (type: string, value: string) => {
    if (type === "year") {
      setSelectedYears(prev =>
        prev.includes(value) ? prev.filter(y => y !== value) : [...prev, value]
      );
      return;
    }
    if (!activeFilters.some(f => f.type === type && f.value === value)) {
      updateFilters([...activeFilters, { type, value }]);
    }
    setDropdownType(null);
  };

  const handleYearDropdownDone = () => {
    updateFilters([
      ...activeFilters.filter(f => f.type !== "year"),
      ...selectedYears.map(y => ({ type: "year", value: y }))
    ]);
    setDropdownType(null);
  };

  const handleRemoveFilter = (type: string, value: string) => {
    const updated = activeFilters.filter(f => !(f.type === type && f.value === value));
    updateFilters(updated);
    if (type === "year") {
      setSelectedYears(selectedYears.filter(y => y !== value));
    }
  };

  const handleClearFilters = () => {
    updateFilters([]);
    setSelectedYears([]);
  };

  const updateFilters = (filters: { type: string; value: string }[]) => {
    setActiveFilters(filters);
    onFilterChange(filters);
  };

   const menuRef = useRef<HTMLDivElement | null>(null);
    
    
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowFilterDropdown(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
  return (
    <div className="flex flex-wrap items-center gap-2" >
      <div className="relative" ref = {menuRef}>
        <button
          className="bg-[#F2F3FA] border border-[#C3C6CF] rounded-[8px] px-3 h-[32px] flex items-center gap-2 text-[#43474E] text-[13px]"
          onClick={() => {
            setShowFilterDropdown(v => !v);
            setDropdownType(null);
          }}
        >
          Add Filter
          <IoFilterOutline className="ml-1" />
        </button>

        {showFilterDropdown && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg z-20">
            <ul>
              {filterOptions.map(option => (
                <li
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-[#F2F3FA] text-sm"
                  onClick={() => handleAddFilter(option.value)}
                >
                  {option.label}
                  {option.dropdown && <FaChevronDown className="inline ml-2 text-xs" />}
                </li>
              ))}
            </ul>
          </div>
        )}

        {dropdownType && filterOptions.find(f => f.value === dropdownType)?.options && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg z-30 p-2">
            <ul>
              {filterOptions.find(f => f.value === dropdownType)?.options!.map(option => (
                <li
                  key={option}
                  className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#F2F3FA] text-sm"
                  onClick={() => dropdownType === "year" ? null : handleDropdownSelect(dropdownType, option)}
                >
                  {dropdownType === "year" ? (
                    <>
                      <input
                        type="checkbox"
                        checked={selectedYears.includes(option)}
                        onChange={() => handleDropdownSelect("year", option)}
                        className="mr-2"
                      />
                      {option}
                    </>
                  ) : (
                    option
                  )}
                </li>
              ))}
            </ul>
            {dropdownType === "year" && (
              <button
                className="mt-2 bg-[#0360AB] text-white rounded px-3 py-1 text-xs"
                onClick={handleYearDropdownDone}
              >
                Done
              </button>
            )}
          </div>
        )}
      </div>

      {activeFilters.map(filter => (
        <div
          key={filter.type + filter.value}
          className="bg-[#E8F0FE] border border-[#C3C6CF] rounded-[8px] px-3 h-[32px] flex items-center text-[#0360AB] text-[13px] gap-1"
        >
          {filter.value}
          <button className="ml-1 hover:text-red-500" onClick={() => handleRemoveFilter(filter.type, filter.value)}>×</button>
        </div>
      ))}

      {activeFilters.length > 0 && (
        <button
          className="bg-[#F2F3FA] border border-[#C3C6CF] rounded-[8px] px-2 h-[32px] text-[13px]"
          onClick={handleClearFilters}
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default Filters;