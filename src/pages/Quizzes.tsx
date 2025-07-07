import React, { useState } from 'react';
import Stats from '../components/stats';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';
import { FaChevronDown } from "react-icons/fa";

import UploadQuizPopUpFlow from '../components/popups/UploadQuizPopUpFlow';
import QuizzesTable from '../components/QuizzesTable';
import QuizBlocksScreen from './QuizBlocksScreen'; // Add import for QuizBlocksScreen (to be created)

const Quizzes: React.FC = () => {
    const [view , setView] = useState(1);
    const toggleView = () =>{
        setView(view === 1 ? 2 : 1);
    }
    const [showPop , setShowPop] = useState(false)
   const data = [
  {
    id: 1,
    title: "Anatomy Quiz 1",
    course: "Anatomy",
    questions: 50,
    negative: "-0.5",
    type: "MCQ",
    source: "University of Lagos",
    year: 2023,
    uploaded: "1 August 2023",
    tags: ["Anatomy", "Bones", "Intro"],
    avgMonthlyVisits: "12,000",
    totalVisits: "120,000",
    averageScore: "75%",
    visibility: "Published",
  },
  {
    id: 2,
    title: "Physiology Final",
    course: "Physiology",
    questions: 40,
    negative: "-1",
    type: "Essay",
    source: "Harvard",
    year: 2022,
    uploaded: "15 May 2022",
    tags: ["Physiology", "Finals"],
    avgMonthlyVisits: "8,000",
    totalVisits: "80,000",
    averageScore: "68%",
    visibility: "Draft",
  },
  {
    id: 3,
    title: "Pharmacology Midterm",
    course: "Pharmacology",
    questions: 30,
    negative: "-0.25",
    type: "MCQ",
    source: "Oxford",
    year: 2024,
    uploaded: "10 March 2024",
    tags: ["Pharmacology", "Midterm"],
    avgMonthlyVisits: "10,000",
    totalVisits: "100,000",
    averageScore: "80%",
    visibility: "Published",
  },
    {
        id: 4,
        title: "Biochemistry Basics",
        course: "Biochemistry",
        questions: 25,
        negative: "-0.1",
        type: "MCQ",
        source: "MIT",
        year: 2023,
        uploaded: "20 January 2023",
        tags: ["Biochemistry", "Basics"],
        avgMonthlyVisits: "5,000",
        totalVisits: "50,000",
        averageScore: "85%",
        visibility: "Published",
    },
    {
        id: 5,
        title: "Microbiology Quiz Block",
        course: "Microbiology",
        questions: 60,
        negative: "-0.2",
        type: "MCQ",
        source: "Stanford",
        year: 2023,
        uploaded: "5 February 2023",
        tags: ["Microbiology", "Block"],
        avgMonthlyVisits: "15,000",
        totalVisits: "150,000",
        averageScore: "90%",
        visibility: "Draft",
    },
  // ...add more sample quizzes as needed...
];

const filterOptions = [
  { label: "Course", value: "course", dropdown: true },
  { label: "Visibility", value: "visibility", dropdown: true },
  { label: "Year", value: "year", dropdown: true },
  { label: "Type", value: "type", dropdown: true },
  { label: "Drafts", value: "Drafts", dropdown: false }
];

const courseOptions = [
  "Anatomy",
  "Physiology",
  "Pharmacology",
  "Biochemistry",
  "Microbiology"
];

const visibilityOptions = ["Published", "Draft"];
const yearOptions = Array.from(new Set(data.map(q => q.year))).sort((a, b) => b - a);
const typeOptions = Array.from(new Set(data.map(q => q.type)));

const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);
const [showFilterDropdown, setShowFilterDropdown] = useState(false);
const [dropdownType, setDropdownType] = useState<string | null>(null);
// Track selected years in the year dropdown
const [selectedYears, setSelectedYears] = useState<string[]>([]);

const handleAddFilter = (type: string) => {
  // Show dropdown for filter types with options
  if (type === "course" || type === "visibility" || type === "year" || type === "type") {
    setDropdownType(type);
    setShowFilterDropdown(false);
    // For year, initialize selectedYears with currently active year filters
    if (type === "year") {
      setSelectedYears(activeFilters.filter(f => f.type === "year").map(f => f.value));
    }
    return;
  }
  if (!activeFilters.some(f => f.type === type && f.value === type)) {
    setActiveFilters([...activeFilters, { type, value: type }]);
  }
  setShowFilterDropdown(false);
};

const handleDropdownSelect = (type: string, value: string) => {
  if (type === "year") {
    // Toggle year selection
    setSelectedYears(prev =>
      prev.includes(value)
        ? prev.filter(y => y !== value)
        : [...prev, value]
    );
    return;
  }
  if (!activeFilters.some(f => f.type === type && f.value === value)) {
    setActiveFilters([...activeFilters, { type, value }]);
  }
  setDropdownType(null);
};

// When user clicks "Done" in year dropdown, update activeFilters
const handleYearDropdownDone = () => {
  // Remove all year filters, then add selectedYears
  setActiveFilters(prev =>
    [
      ...prev.filter(f => f.type !== "year"),
      ...selectedYears.map(y => ({ type: "year", value: y }))
    ]
  );
  setDropdownType(null);
};

const handleRemoveFilter = (type: string, value: string) => {
  setActiveFilters(activeFilters.filter(f => !(f.type === type && f.value === value)));
  // If removing a year filter, also update selectedYears
  if (type === "year") {
    setSelectedYears(selectedYears.filter(y => y !== value));
  }
};

const handleClearFilters = () => {
  setActiveFilters([]);
  setSelectedYears([]);
};

// Filtering logic
const filteredData = data.filter((quiz) => {
  if (activeFilters.length === 0) return true;

  // Separate year filters from others
  const yearFilters = activeFilters.filter(f => f.type === "year").map(f => f.value);
  const otherFilters = activeFilters.filter(f => f.type !== "year");

  // If there are year filters, quiz.year must match at least one
  if (yearFilters.length > 0 && !yearFilters.includes(String(quiz.year))) {
    return false;
  }

  // All other filters must match (AND logic)
  return otherFilters.every((filter) => {
    if (filter.type === "course") {
      return quiz.course === filter.value;
    }
    if (filter.type === "visibility") {
      return quiz.visibility === filter.value;
    }
    if (filter.type === "type") {
      return quiz.type === filter.value;
    }
    if (filter.type === "Drafts") {
      return quiz.visibility === "Draft";
    }
    return true;
  });
});

    return (
        <div >

            <div className='space-y-4 relative'>
            <h1 className='text-[#004883] font-[500] text-[24px]'>Quizzes</h1>
            <div className='border-b-[1px] border-[#C3C6CF] flex  w-[70%] '>
            <div className={`text-[16px] cursor-pointer font-[500] p-2 px-3 ${view === 1 ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]" : " text-[#73777F] bg-white "} `} onClick={toggleView} >
                    All Quizzes
                </div>
                <div className={`text-[16px] cursor-pointer  p-2 px-3 font-[500] ${view === 2 ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]" : " text-[#73777F] bg-white "} `} onClick={toggleView}>
                    Quiz Blocks
                </div>
            </div>

            </div>
            <div className='space-y-4 mt-4'>
                <div className='flex gap-4 mt-4'>
                    <Stats value="3,200,000,000" label="Questions Uploaded" />
                    <Stats value="320" label="Quizzes Uploaded " />
                    <Stats value="3,200,000,000" label="Quiz Blocks" />
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2 w-full">
                    <div className='w-full sm:w-[27%] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] max-w-xs'>
                        <IoSearch className='mx-2 text-[#0F172A] opacity-50' />
                        <input
                            type="text"
                            className='w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]'
                            placeholder='Search for Content or User'
                        />
                    </div>
                    {/* Filter UI */}
                    <div className="relative">
                  <button
                    className="bg-[#F2F3FA] border-[1px] border-[#C3C6CF] rounded-[8px] px-[12px] h-[32px] flex items-center gap-2 text-[#43474E] text-[13px] min-w-[100px]"
                    onClick={() => {
                      setShowFilterDropdown((v) => !v);
                      setDropdownType(null);
                    }}
                  >
                    Add Filter
                    <IoFilterOutline className="ml-1" />
                  </button>
                  {showFilterDropdown && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[140px] z-20">
                      <ul>
                        {filterOptions.map((option) => (
                          <li
                            key={option.value}
                            className="px-4 py-2 cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm"
                            onClick={() => handleAddFilter(option.value)}
                          >
                            {option.label}
                            {option.dropdown && <FaChevronDown className="inline ml-2 text-xs" />}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Dropdown for filter values */}
                  {dropdownType === "course" && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[140px] z-30">
                      <ul>
                        {courseOptions.map((course) => (
                          <li
                            key={course}
                            className="px-4 py-2 cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm"
                            onClick={() => handleDropdownSelect("course", course)}
                          >
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {dropdownType === "visibility" && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[140px] z-30">
                      <ul>
                        {visibilityOptions.map((v) => (
                          <li
                            key={v}
                            className="px-4 py-2 cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm"
                            onClick={() => handleDropdownSelect("visibility", v)}
                          >
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {dropdownType === "year" && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[140px] z-30 p-2">
                      <ul>
                        {yearOptions.map((y) => (
                          <li
                            key={y}
                            className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm"
                            onClick={e => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={selectedYears.includes(String(y))}
                              onChange={() => handleDropdownSelect("year", String(y))}
                              className="mr-2"
                              id={`year-checkbox-${y}`}
                            />
                            <label htmlFor={`year-checkbox-${y}`} className="cursor-pointer">{y}</label>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="mt-2 bg-[#0360AB] text-white rounded px-3 py-1 text-xs"
                        onClick={handleYearDropdownDone}
                      >
                        Done
                      </button>
                    </div>
                  )}
                  {dropdownType === "type" && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[140px] z-30">
                      <ul>
                        {typeOptions.map((t) => (
                          <li
                            key={t}
                            className="px-4 py-2 cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm"
                            onClick={() => handleDropdownSelect("type", t)}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
  {/* Render active filters */}
  {activeFilters.map((filter) => (
    <div
      key={filter.type + filter.value}
      className="bg-[#E8F0FE] border border-[#C3C6CF] rounded-[8px] px-3 h-[32px] flex items-center text-[#0360AB] text-[13px] gap-1"
    >
      {filter.value}
      <button
        className="ml-1 text-[#0360AB] hover:text-red-500"
        onClick={() => handleRemoveFilter(filter.type, filter.value)}
      >
        ×
      </button>
    </div>
  ))}
  {activeFilters.length > 0 && (
    <button
      className="bg-[#F2F3FA] border-[1px] border-[#C3C6CF] rounded-[8px] w-[90px] h-[32px] text-[#43474E] flex items-center justify-center px-2 gap-3"
      onClick={handleClearFilters}
    >
      Clear filters
    </button>
  )}
</div>
             </div>

             <div>
                {view === 1 ? (
                  <div>

                  <QuizzesTable
                    data={filteredData} 
                    tableheads={["Quiz Title" , "Course" , "Source" , "Type" , "Questions" , "Year" , "Visibility"] } 
                    ids={[ "title" , "course" , "source", "type", "questions" ,"year"  ,"visibility" ]}
                    initialRowsPerPage={40}
                  />
                <button className='bg-[#0360AB] flex mx-auto text-white rounded-[8px] w-[150px] h-[40px] flex items-center justify-center' onClick={() => setShowPop(true)}>
                Upload Quiz
            </button>
                  </div>
                ) : (
                  <QuizBlocksScreen />
                )}
            </div>
            

            {
                showPop && (
                    <UploadQuizPopUpFlow isOpen={showPop} onClose={() => setShowPop(false)} />)
            }
            {/* <UploadQuizPopUpFlow isOpen= {true} onClose={() => console.log("closed")}/> */}
        </div>
    );
};

export default Quizzes;