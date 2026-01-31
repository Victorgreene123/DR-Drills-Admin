import React, { useState, useEffect } from 'react';
import thumbnail1 from '../../assets/thumbnail-1.png';
import thumbnailmain from '../../assets/thumbnail-1.png'; // update if needed
import { LiaTimesSolid } from 'react-icons/lia';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';
import { FaArrowDown, FaArrowUp, FaSpinner } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';
import { useApi } from '../../hooks/useApi';

type Lecture = {
  id: number;
  title: string;
  thumbnail: string;
};

interface AddLecturesProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (selectedLectures: Lecture[]) => void;
}

const AddLectures: React.FC<AddLecturesProps> = ({ isOpen, onClose, onAdd }) => {
  const [allLectures, setAllLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);
  const { apiFetch } = useApi();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showCourseSubmenu, setShowCourseSubmenu] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchLectures = async () => {
        try {
          setLoading(true);
          const res = await apiFetch('/api/admin/all-lectures');
          if (res.ok) {
            const response = await res.json();
            const lecturesList = response.data?.lectures || response.lectures || [];
            setAllLectures(lecturesList);
          }
        } catch (error) {
          console.error('Error fetching lectures:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchLectures();
    }
  }, [isOpen]);

  const toggleLecture = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const selected = allLectures.filter(l => selectedIds.includes(l.id));
    onAdd(selected);
    onClose();
  };

  if (!isOpen) return null;

  const filteredLectures = allLectures.filter(lecture =>
    lecture.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1100]">
      <div className="bg-white max-w-4xl w-full h-[550px] rounded-xl relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2">
          <h2 className="text-[18px] text-[#1A1C1E] font-semibold">Add Lectures</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 h-0 p-4">
          {/* Left */}
          <div className="w-1/2 pr-4 border-r border-[#C3C6CF] flex flex-col">
            <div className="space-y-3 mb-3">
           <div className="mb-3">
						 <div className="w-full relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[35px]">
						   <IoSearch className="mx-2 text-xl text-[#0F172A] opacity-50" />
						   <input
							 type="text"
							 className="w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]"
							 placeholder="Search for Lectures"
							 value={search}
							 onChange={(e) => setSearch(e.target.value)}
						   />
						 </div>
					   </div>


              <div className='flex items-center justify-between gap-2 ml-2 relative'>
                <div className='flex items-center gap-2'>
                  <div
                    className='flex items-center gap-2 text-[#73777F] text-[16px] cursor-pointer relative'
                    onClick={() => setFilterDropdown(!filterDropdown)}
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
                          {filterOptions.map(option => (
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
                              {courseOptions.map(course => (
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
                {sortOrder === 1
                  ? <FaArrowDown onClick={() => setSortOrder(0)} />
                  : <FaArrowUp onClick={() => setSortOrder(1)} />}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 border-t border-[#C3C6CF]" style={{ maxHeight: 450 }}>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <FaSpinner className="animate-spin text-[#0360AB] text-2xl" />
                </div>
              ) : (
                <>
                  {filteredLectures.map(lecture => (
                    <div key={lecture.id} className="flex items-center gap-3 py-2">
                      {selectedIds.includes(lecture.id)
                        ? <MdCheckBox className="text-[#0360AB] text-[28px] cursor-pointer" onClick={() => toggleLecture(lecture.id)} />
                        : <MdCheckBoxOutlineBlank className="bg-white text-[28px] cursor-pointer" onClick={() => toggleLecture(lecture.id)} />}
                      <img src={lecture.thumbnail || thumbnailmain} alt="thumb" className="w-[82px] h-[47px] rounded object-cover" />
                      <span className="truncate w-full text-sm">{lecture.title}</span>
                    </div>
                  ))}
                  {filteredLectures.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No lectures found.</div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="w-1/2 pl-4 flex flex-col">
            <h3 className="text-[18px] font-semibold mb-2">Selected Lectures</h3>
            <p className="text-[#0360AB] text-[16px]">
              {selectedIds.length} {selectedIds.length === 1 ? 'Lecture' : 'Lectures'} selected
            </p>
            <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: 500 }}>
              {selectedIds.map(id => {
                const lecture = allLectures.find(l => l.id === id);
                if (!lecture) return null;
                return (
                  <div key={id} className="flex items-center gap-3 py-2">
                    <MdCheckBox className="text-[#0360AB] text-[28px] cursor-pointer" onClick={() => toggleLecture(id)} />
                    <img src={lecture.thumbnail || thumbnailmain} alt="thumb" className="w-[82px] h-[47px] rounded object-cover" />
                    <span className="truncate w-full text-sm">{lecture.title}</span>
                  </div>
                );
              })}
              {selectedIds.length === 0 && (
                <div className="text-center text-gray-400 py-8">No lecture selected.</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-[#C3C6CF]">
          <button onClick={onClose} className="bg-[#F2F3FA] text-[#1A1C1E] px-4 py-2 mr-2 rounded-[4px]">Cancel</button>
          <button onClick={handleAdd} className="bg-[#0360AB] text-white px-4 py-2 rounded-[4px]">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddLectures;
