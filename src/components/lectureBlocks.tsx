import React, { useEffect, useState } from "react";
import Stats from "./stats";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

const LectureBlocks:React.FC = () => {
  const [lectureBlocks, setLectureBlocks] = useState<Array<{ id: number; title: string; bankCount: number; tags: string[] }>>([]);
      const { apiFetch } = useApi();
  
  
       useEffect(() => {
      // Example API call to fetch quiz blocks
      const fetchQuizBlocks = async () => {
        try {
          const res = await apiFetch('/api/blocks/lecture');
          const data = await res.json();
           // Adjust endpoint as needed
          // console.log('Fetched quiz blocks:', data.data);
          const mappedBlocks = data.data.map((block: any) => ({
            id: block.id,
            title: block.description,
            bankCount: block.bank_count,
            tags : block.tags || [],
          }));
          console.log('Mapped quiz blocks:', mappedBlocks);
          // Assuming you have a state to hold quiz blocks
          setLectureBlocks(mappedBlocks);
          // setQuizBlocks(data); // Uncomment and implement state if needed
        } catch (error) {
          console.error('Error fetching quiz blocks:', error);
        }
  
      };
      fetchQuizBlocks();
   } , [apiFetch]);
  
    const quizBlocks = [
  {
    id: 1,
    title: "Practice physiology with these",
    quizzesCount: 5,
    tags: ["Anatomy", "Upper limb", "University of Lagos"],
  },
  {
    id: 2,
    title: "Learn with systems",
    quizzesCount: 5,
    tags: ["Anatomy", "Physiology", "Upper limb"],
  },
  {
    id: 3,
    title: "New to Anatomy",
    quizzesCount: 5,
    tags: ["Anatomy", "Physiology", "Upper limb"],
  },
  {
    id: 4,
    title: "Introductory examination",
    quizzesCount: 5,
    tags: ["Anatomy", "Physiology", "Upper limb"],
  },
  // ...repeat as needed for demo
];
    return (
        <div className="w-full">
        
                <div className='flex gap-4 mt-4'>
                        <Stats value="3,200" label="Lectures Uploaded" />
                        <Stats value="320" label="Lecture Banks " />
                        <Stats value="40" label="Lecture Blocks" />
                    </div>

                    {/* <Filters filterOptions={filterOptions} onFilterChange={setActiveFilters} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-3">
                
                 {lectureBlocks.map((block) => (
          <Link to={`./${block.id}`} key={block.id}>
          <div
            key={block.id}
            className="bg-[#F2F3FA] rounded-xl p-4 py-8  cursor-pointer"
          >
            <div className="font-semibold text-[#1A1C1E] text-lg">
              {block.title}
            </div>
            <div className="text-[#73777F] text-sm mb-2">
              {block.bankCount} banks
            </div>
            <div className="flex flex-wrap gap-2">
              {
              block.tags.length > 0 ? (
              block.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))
              ) : (<span className="text-[#73777F] text-xs">No tags</span>
              )
            }
            </div>
          </div>
          </Link>
        ))}
        </div>



        </div>
    )
}

export default LectureBlocks