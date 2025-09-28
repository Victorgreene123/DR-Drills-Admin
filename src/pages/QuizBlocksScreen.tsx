import React, { useEffect, useState } from "react";

import CreateQuizBlockModal from "../components/quizblocks/CreateQuizBlockModal";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";


      




const QuizBlocksScreen: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [quizBlocks, setQuizBlocks] = useState<Array<{ id: number; title: string; quizzesCount: number; tags: string[] }>>([]);
    const { apiFetch } = useApi();


     useEffect(() => {
    // Example API call to fetch quiz blocks
    const fetchQuizBlocks = async () => {
      try {
        const res = await apiFetch('/api/blocks/quiz');
        const data = await res.json();
         // Adjust endpoint as needed
        // console.log('Fetched quiz blocks:', data.data);
        const mappedBlocks = data.data.map((block: any) => ({
          id: block.id,
          title: block.description,
          quizzesCount: block.quiz_count,
          tags : block.tags || [],
        }));
        console.log('Mapped quiz blocks:', mappedBlocks);
        // Assuming you have a state to hold quiz blocks
        setQuizBlocks(mappedBlocks);
        // setQuizBlocks(data); // Uncomment and implement state if needed
      } catch (error) {
        console.error('Error fetching quiz blocks:', error);
      }

    };
    fetchQuizBlocks();
 } , [apiFetch]);

  return (
    <div className="my-4">
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quizBlocks.map((block) => (
          <Link to={`./${block.id}`} key={block.id}>
          <div
            key={block.id}
            className="bg-[#F2F3FA] rounded-xl p-4 shadow hover:shadow-lg cursor-pointer"
          >
            <div className="font-semibold text-[#1A1C1E] text-lg">
              {block.title}
            </div>
            <div className="text-[#73777F] text-sm mb-2">
              {block.quizzesCount} quizzes
            </div>
            <div className="flex flex-wrap gap-2">
              {
              block.tags.length > 0 ? (block.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))) : (<span className="text-[#73777F] text-xs">No tags</span>
              )
              
            }
            </div>
          </div>
          </Link>
        ))}
         
      </div>
      <div className="flex items-center gap-4 mt-6 mb-4">
       
        <button
          className="ml-auto bg-[#0360AB] text-white px-4 py-2 rounded"
          onClick={() => setShowCreate(true)}
        >
          Create Quiz Block
        </button>
      </div>
      {showCreate && (
    
            <CreateQuizBlockModal onClose={() => setShowCreate(false)} />
          
      )}
    </div>
  );
};

export default QuizBlocksScreen;
