import React, { useState, useEffect } from 'react';
import thumbnail1 from '../../assets/thumbnail-1.png';
import thumbnail2 from '../../assets/thumbnail-2.png';
import { LiaTimesSolid } from 'react-icons/lia';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';

type Quiz = {
  id: number;
  title: string;
  thumbnail: string;
};

type QuizSelected = {
  id: number;
  name: string;
};

interface SelectQuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuiz: (lecture: string, lectureid: any) => void;
  selectedQuiz: QuizSelected[];
}

const mockQuizzes: Quiz[] = [
  { id: 1, title: 'Anatomical Naming conventions, Planes and Axes', thumbnail: thumbnail1 },
  { id: 2, title: 'Anatomical Naming conventions, Planes and Axes', thumbnail: thumbnail1 },
  { id: 3, title: 'Anatomical Naming conventions, Planes and Axes', thumbnail: thumbnail1 },
  { id: 4, title: 'The Quiz bank/Playlist Title. (should be truncated if the title goes too long)', thumbnail: thumbnail2 },
  { id: 5, title: 'The Quiz bank/Playlist Title. (should be truncated if the title goes too long)', thumbnail: thumbnail2 },
  { id: 6, title: 'The Quiz bank/Playlist Title. (should be truncated if the title goes too long)', thumbnail: thumbnail1 },
  { id: 7, title: 'Anatomical Naming conventions, Planes and Axes', thumbnail: thumbnail2 }
];

const SelectQuizPopup: React.FC<SelectQuizPopupProps> = ({ isOpen, onClose, onSelectQuiz, selectedQuiz }) => {
  const [selectedQuizzes, setSelectedQuizzes] = useState<QuizSelected[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState(1);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showCourseSubmenu, setShowCourseSubmenu] = useState(false);

  useEffect(() => {
    setSelectedQuizzes(selectedQuiz || []);
  }, [selectedQuiz, isOpen]);

  const isQuizSelected = (quiz: Quiz) =>
    selectedQuizzes.some((q) => q.id === quiz.id);

  const toggleQuiz = (id: number, title: string) => {
    const quizObj = { id, name: title };
    setSelectedQuizzes((prev) => {
      const exists = prev.some((q) => q.id === id);
      if (exists) {
        return prev.filter((q) => q.id !== id);
      }
      return [...prev, quizObj];
    });
    onSelectQuiz(title, id);
  };

  const filteredQuizzes = mockQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  const filterOptions = [
    { label: "Last Modified", value: "lastModified" },
    { label: "Views", value: "views" },
    { label: "Course", value: "course" },
    { label: "Tags", value: "tags" }
  ];

  const courseOptions = [
    { label: "Anatomy", icon: <img src={thumbnail1} alt="Anatomy" className="w-4 h-4 rounded-full inline mr-1" /> },
    { label: "Physiology", icon: <span className="inline-block w-4 h-4 rounded-full bg-red-200 mr-1" /> },
    { label: "Biochemistry", icon: <span className="inline-block w-4 h-4 rounded-full bg-green-200 mr-1" /> },
    { label: "Pharmacology", icon: <span className="inline-block w-4 h-4 rounded-full bg-blue-200 mr-1" /> }
  ];

  const handleFilterToggle = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
    if (value !== "course") setShowCourseSubmenu(false);
  };

  const handleCourseToggle = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1100]">
      <div className="bg-white max-w-4xl w-full h-[550px] rounded-xl relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2">
          <h2 className="text-[18px] text-[#1A1C1E] font-semibold">Select Quiz</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition">
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-1 h-0 p-4">
          {/* Left Section */}
          <div className="w-1/2 pr-4 border-r-[1px] border-[#C3C6CF] flex flex-col">
            <div className="space-y-3 mb-3">
              <div className='w-full relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[35px] '>
                <IoSearch className='mx-2 text-xl text-[#0F172A] opacity-50' />
                <input
                  type="text"
                  className='w-full outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]'
                  placeholder="Search for Quizzes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-between gap-2 ml-2 relative'>
                <div className='flex items-center gap-2'>
                  <div
                    className='flex items-center gap-2 text-[#73777F] text-[16px] cursor-pointer relative'
                    onClick={() => setFilterDropdown((v) => !v)}
                  >
                    <IoFilterOutline />
                    <p>Filter</p>
                    <span className="ml-1 text-[#0360AB] bg-[#D4E3FF] px-2 py-1 rounded-[4px]">
                      {selectedFilters.length > 0
                        ? selectedFilters.map(f =>
                            f === "course"
                              ? selectedCourses.length > 0
                                ? selectedCourses.join(", ")
                                : "Course"
                              : filterOptions.find(opt => opt.value === f)?.label
                          ).join(", ")
                        : "None"}
                    </span>
                    {filterDropdown && (
                      <div className="absolute left-0 top-8 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[180px] z-20">
                        <ul>
                          {filterOptions.map((option) => (
                            <li
                              key={option.value}
                              className={`px-4 group py-2 flex items-center justify-between cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm ${selectedFilters.includes(option.value) ? "bg-[#F2F3FA]" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterToggle(option.value);
                                if (option.value === "course") setShowCourseSubmenu(true);
                              }}
                              onMouseEnter={() => {
                                if (option.value === "course") setShowCourseSubmenu(true);
                                else setShowCourseSubmenu(false);
                              }}
                            >
                              <span className="flex items-center">
                                {selectedFilters.includes(option.value)
                                  ? <MdCheckBox className="text-[#0360AB] text-[18px] mr-2" />
                                  : <MdCheckBoxOutlineBlank className="text-[#C3C6CF] text-[18px] mr-2" />}
                                {option.label}
                              </span>
                              {option.value === "course" && (
                                <FaChevronRight className="hidden group-hover:inline ml-2 text-[#1A1C1E] text-[11px]" />
                              )}
                            </li>
                          ))}
                        </ul>
                        {showCourseSubmenu && (
                          <div className="absolute left-full top-0 bg-white border border-[#C3C6CF] rounded shadow-lg min-w-[180px] z-30">
                            <ul>
                              {courseOptions.map((course) => (
                                <li
                                  key={course.label}
                                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#F2F3FA] text-[#1A1C1E] text-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCourseToggle(course.label);
                                  }}
                                >
                                  {selectedCourses.includes(course.label)
                                    ? <MdCheckBox className="text-[#0360AB] text-[18px]" />
                                    : <MdCheckBoxOutlineBlank className="text-[#C3C6CF] text-[18px]" />}
                                  {course.icon}
                                  {course.label}
                                </li>
                              ))}
                              <li className="px-4 py-2 text-[#0360AB] cursor-pointer hover:bg-[#F2F3FA] flex items-center gap-2 border-t border-[#F2F3FA]">
                                <span className="text-lg">+</span> Add new course
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {sortOrder === 1 ? <FaArrowDown onClick={() => setSortOrder(0)} /> : <FaArrowUp onClick={() => setSortOrder(1)} />}
              </div>
            </div>
            <div className="overflow-y-auto flex-1 pr-2 border-t-[1px] border-[#C3C6CF]" style={{ maxHeight: 450 }}>
              {filteredQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center gap-3 py-2 ">
                  {isQuizSelected(quiz)
                    ? <MdCheckBox className="text-[#0360AB] text-[28px]" onClick={() => toggleQuiz(quiz.id, quiz.title)} />
                    : <MdCheckBoxOutlineBlank className="bg-white text-[28px]" onClick={() => toggleQuiz(quiz.id, quiz.title)} />}
                  <img src={quiz.thumbnail} alt="thumb" className="w-[82px] h-[47px] rounded" />
                  <span className="truncate w-full text-sm">{quiz.title}</span>
                </div>
              ))}
              {filteredQuizzes.length === 0 && (
                <div className="text-center text-gray-400 py-8">No lectures found.</div>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className="w-1/2 pl-4 flex flex-col">
            <h3 className="text-[18px] font-semibold mb-2">Selected Quiz</h3>
            <p className="text-[#0360AB] text-[16px] ">
              {selectedQuizzes.length} {selectedQuizzes.length === 1 ? 'Quiz' : 'Quizzes'} selected
            </p>
            <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: 500 }}>
              {selectedQuizzes.map((quizObj) => {
                const quiz = mockQuizzes.find((q) => q.id === quizObj.id);
                if (!quiz) return null;
                return (
                  <div key={quizObj.id} className="flex items-center gap-3 py-2 ">
                    <MdCheckBox className="text-[#0360AB] text-[28px]" />
                    <img src={quiz.thumbnail} alt="thumb" className="w-[82px] h-[47px] rounded" />
                    <span className="truncate w-full text-sm">{quiz.title}</span>
                  </div>
                );
              })}
              {selectedQuizzes.length === 0 && (
                <div className="text-center text-gray-400 py-8">No lecture selected.</div>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end p-4 border-t-[1px] border-[#C3C6CF]">
          <button onClick={onClose} className="bg-[#F2F3FA] text-[#1A1C1E] px-4 py-2 mr-2 rounded-[4px]">Cancel</button>
          <button onClick={onClose} className="bg-[#0360AB] text-white px-4 py-2 rounded-[4px]">Done</button>
        </div>
      </div>
    </div>
  );
};

export default SelectQuizPopup;
