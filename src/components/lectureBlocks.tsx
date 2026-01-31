import React, { useEffect, useState } from "react";
// import Stats from "./stats";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import CreateLectureBlockPopup from "./popups/CreateLectureBlockPopup";
import { BiTrash } from "react-icons/bi";

const LectureBlocks:React.FC = () => {
  const [lectureBlocks, setLectureBlocks] = useState<Array<{ id: number; title: string; bankCount: number; tags: string[] }>>([]);
      const { apiFetch } = useApi();
    const [isLectureBlockOpened , setIsLectureBlockOpened]= useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const fetchLectureBlocks = async () => {
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
  
       useEffect(() => {
      // Example API call to fetch quiz blocks
      fetchLectureBlocks();
   } , []);

   const handleDelete = async (e: React.MouseEvent, blockId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this lecture block?")) return;

    try {
      setIsDeleting(blockId);
      const res = await apiFetch(`/api/admin/lecture-block/${blockId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Lecture block deleted successfully");
        fetchLectureBlocks();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || "Failed to delete lecture block"}`);
      }
    } catch (error) {
      console.error("Error deleting lecture block:", error);
      alert("An error occurred while deleting the lecture block.");
    } finally {
      setIsDeleting(null);
    }
  };
  

    return (
        <div className="w-full">
        
                {/* <div className='flex gap-4 mt-4'>
                        <Stats value="3,200" label="Lectures Uploaded" />
                        <Stats value="320" label="Lecture Banks " />
                        <Stats value="40" label="Lecture Blocks" />
                    </div> */}


                            {/* <Filters filterOptions={filterOptions} onFilterChange={setActiveFilters} /> */}
                          
                    
                          

                    {/* <Filters filterOptions={filterOptions} onFilterChange={setActiveFilters} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-3">
                
                 {lectureBlocks.map((block) => (
          <Link to={`./${block.id}`} key={block.id}>
          <div
            key={block.id}
            className="bg-[#F2F3FA] rounded-xl p-4 py-8 pointer cursor-pointer relative group"
          >
            <button
              onClick={(e) => handleDelete(e, block.id)}
              disabled={isDeleting === block.id}
              className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              title="Delete Lecture Block"
            >
              <BiTrash size={18} />
            </button>
            <div className="font-semibold text-[#1A1C1E] text-lg pr-8">
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

        {
          isLectureBlockOpened &&  <CreateLectureBlockPopup onClose={() => setIsLectureBlockOpened(false)}/>
        }

        </div>
    )
}

export default LectureBlocks