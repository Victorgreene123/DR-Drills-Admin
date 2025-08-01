import React, { useState } from "react";
import image1 from "../assets/Bank_pic.png";
import Filters from "../components/Filters"; // ✅ import
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import UploadLecturePopupFlow from "./popups/UploadLecturePopupFlow";
import Stats from "./stats";

const AllLectures: React.FC = () => {
  const sampleData = [
    {
      id: 1,
      image: image1,
      title: "Introductory Anatomy: All the basics you’ll ever need.",
      course: "Anatomy",
      visibility: "Draft",
      dateCreated: "Oct 8, 2025",
      Views: 45,
    },
    {
      id: 2,
      image: image1,
      title: "Advanced Anatomy: Nervous System.",
      course: "Anatomy",
      visibility: "Published",
      dateCreated: "Aug 20, 2025",
      Views: 100,
    },
    {
      id: 3,
      image: image1,
      title: "Biochemistry Basics.",
      course: "Biochemistry",
      visibility: "Draft",
      dateCreated: "Jul 10, 2025",
      Views: 60,
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  const courseOptions = ["Anatomy"];
  const visibilityOptions = ["Draft", "Published"];

  const filterOptions = [
    { label: "Course", value: "course", dropdown: true, options: courseOptions },
    { label: "Visibility", value: "visibility", dropdown: true, options: visibilityOptions }
  ];

  const filteredData = sampleData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = activeFilters.every(f =>
      f.type === "course" ? item.course === f.value :
      f.type === "visibility" ? item.visibility === f.value :
      true
    );
    return matchesSearch && matchesFilters;
  });
  const [isOpen , setIsOpen]= useState(false);
  const onClose = () =>{
    setIsOpen(!isOpen)
  }


  return (
    <div>
         <div className='flex gap-4 mt-4'>
                        <Stats value="3,200" label="Lectures Uploaded" />
                        <Stats value="320" label="Lecture Banks " />
                        <Stats value="40" label="Lecture Blocks" />
                    </div>
      <div className='flex items-center gap-2 mb-2 mt-3'>
  

              <div className='w-full sm:w-[27%] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] max-w-xs'>
                                <IoSearch className='mx-2 text-[#0F172A] opacity-50' />
                                <input
                                 value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
                                    type="text"
                                    className='w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]'
                                    placeholder='Search for Content or User'
                                />
                            </div>
        <Filters filterOptions={filterOptions} onFilterChange={setActiveFilters} />
            <button className='bg-[#0360AB] flex  text-white rounded-md w-[150px] h-[32px] flex items-center justify-center' onClick={() => {
                setIsOpen(true);
                console.log("PopUp initiated")

            }}>
                <FaPlus className='mr-2' />
                Upload Lecture
                </button>

      </div>
      <div className="overflow-x-auto">
        <table className="w-full my-4 text-left text-sm text-[#1A1C1E] border-collapse">
          <thead className="bg-[#F2F3FA] text-[#73777F] text-[15px] font-medium">
            <tr>
              <th className="px-4 py-2">Lecture Titles</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Visibility</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Views</th>
            </tr>
          </thead>
          <tbody className="bg-white">
             <tr>
    <td colSpan={5} className="h-3"></td> {/* 👈 separator row */}
  </tr>
            {filteredData.map(item => (
              <tr key={item.id} className="cursor-pointer bg-[#FFFFFF] hover:bg-[#F0F0F0] transition-colors">
                <td className="flex items-center gap-4 pb-2 px-4 py-2">
                  <img src={item.image} alt="" className="w-[76px] h-[48px]" />
                  {item.title}
                </td>
                <td className="px-4 py-2">{item.course}</td>
                <td className="px-4 py-2">{item.visibility}</td>
                <td className="px-4 py-2">{item.dateCreated}</td>
                <td className="px-4 py-2">{item.Views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        isOpen && <UploadLecturePopupFlow onClose={onClose}/>
      }
    </div>
  );
};

export default AllLectures;
