import React, { useEffect, useState } from "react";

import CreateQuizBlockModal from "../components/quizblocks/CreateQuizBlockModal";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import logo from '../assets/favicon.svg'
import { BiTrash } from "react-icons/bi";



      

export const LoadingAnimation: React.FC = () => (
  <div className="flex justify-center items-center h-32">
    <img
      src={logo}
      alt="Loading..."
      className="w-16 h-16 animate-pulse drop-shadow-lg"
    />
  </div>
);




const QuizBlocksScreen: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [quizBlocks, setQuizBlocks] = useState<Array<{ id: number; title: string; quizzesCount: number; tags: string[] }>>([]);
    const { apiFetch } = useApi();
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);


    const fetchQuizBlocks = async () => {
      try {
        setLoading(true);
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
      finally {
        setLoading(false);
      }

    };

     useEffect(() => {
    // Example API call to fetch quiz blocks
    fetchQuizBlocks();
 } , []);

    const handleDelete = async (e: React.MouseEvent, blockId: number) => {
      e.preventDefault();
      e.stopPropagation();

      if (!window.confirm("Are you sure you want to delete this quiz block?")) return;

      try {
        setIsDeleting(blockId);
        const res = await apiFetch(`/api/admin/quiz-block/${blockId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Quiz block deleted successfully");
          fetchQuizBlocks();
        } else {
          const errorData = await res.json();
          alert(`Error: ${errorData.message || "Failed to delete quiz block"}`);
        }
      } catch (error) {
        console.error("Error deleting quiz block:", error);
        alert("An error occurred while deleting the quiz block.");
      } finally {
        setIsDeleting(null);
      }
    };

  return (
    <div className="my-4">
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {
        loading ? (
          <div className="col-span-full flex justify-center items-center h-32">
            
            <LoadingAnimation />

          </div>
        ) : (


        quizBlocks.map((block) => (
            <Link to={`./${block.id}`} key={block.id} state={{ title: block.title, quizzesCount: block.quizzesCount, tags: block.tags }}>
          <div
            key={block.id}
            className="bg-[#F2F3FA] rounded-xl p-4 shadow hover:shadow-lg cursor-pointer relative group"
          >
            <button
              onClick={(e) => handleDelete(e, block.id)}
              disabled={isDeleting === block.id}
              className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              title="Delete Quiz Block"
            >
              <BiTrash size={18} />
            </button>
            <div className="font-semibold text-[#1A1C1E] text-lg pr-8">
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
        ))
        )
      }
      </div>

      
      {showCreate && (
    
            <CreateQuizBlockModal onClose={() => setShowCreate(false)} />
          
      )}
    </div>
  );
};

export default QuizBlocksScreen;
