import React from "react";
import Stats from "./stats";
import { Link } from "react-router-dom";

const LectureBlocks:React.FC = () => {
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
                
                 {quizBlocks.map((block) => (
          <Link to={`./${block.id}`} key={block.id}>
          <div
            key={block.id}
            className="bg-[#F2F3FA] rounded-xl p-4 py-8  cursor-pointer"
          >
            <div className="font-semibold text-[#1A1C1E] text-lg">
              {block.title}
            </div>
            <div className="text-[#73777F] text-sm mb-2">
              {block.quizzesCount} quizzes
            </div>
            <div className="flex flex-wrap gap-2">
              {block.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          </Link>
        ))}
        </div>



        </div>
    )
}

export default LectureBlocks