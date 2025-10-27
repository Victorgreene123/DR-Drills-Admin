import React, { useState } from "react";
import AddQuizzesToBlockModal from "./AddQuizzesToBlockModal";
import PopUpContainer from "../popups/PopUp";
import { useApi } from "../../hooks/useApi";
import { FaSpinner } from "react-icons/fa6";

const CreateQuizBlockModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [course, setCourse] = useState("");
  const [selectedQuizzes, setSelectedQuizzes] = useState<any[]>([]);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const {apiFetch} = useApi();
  const [loading, setLoading] = useState(false);
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };


  const handleSubmit = async () => {

    
    // Handle form submission logic here
    const newQuizBlock = {
      name: title,
      description: subtitle,
      isPublic: isPublic,
      tags : tags,
      courseId: Number(course) || 1,
      quizIds: selectedQuizzes.map(q => q.id),
    };
    console.log("Creating Quiz Block:", newQuizBlock);

    try {
      setLoading(true); 
      const response = await apiFetch('/api/admin/quiz-block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuizBlock),
      });
      if (response.ok) {
        console.log('Quiz Block created successfully');
        onClose();

      }
    } catch (error) {
      console.error('Error creating Quiz Block:', error);
    }
    finally{
      setLoading(false);
    }




  };

  return (
    <PopUpContainer
      title="Create Quiz Block"
      onClose={onClose}
    >

      {/* Main Content */}
        <div className="px-6 py-4 space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              {/* Title */}
              <label className="text-[#1A1C1E] font-[500] mb-2">Title</label>
              <div className="relative p-2 h-[56px]">
                <textarea
                  className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                  placeholder="Give your quiz block a title"
                  style={{ resize: "none" }}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={100}
                />
                <p className="absolute bottom-0 text-[#73777F] text-[11px] right-2">{title.length}/100</p>
              </div>
              {/* Subtitle */}
              <label className="text-[#1A1C1E] font-[500] mb-2">Subtitle</label>
              <div className="relative p-2 h-[56px]">
                <textarea
                  className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                  placeholder="A short description of the quiz block"
                  style={{ resize: "none" }}
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  maxLength={100}
                />
                <p className="absolute bottom-0 text-[#73777F] text-[11px] right-2">{subtitle.length}/100</p>
              </div>
              {/* Tags */}
              <div className="w-full mb-2">
                <label className="block text-xs font-[500] text-[#1A1C1E] mb-1">Tags</label>
                <div className="relative border border-[#C3C6CF] rounded-[6px] px-2 py-1 min-h-[36px] flex flex-wrap items-center gap-1 bg-white">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#E8F0FE] text-[#0360AB] px-2 py-1 rounded text-[11px] flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-[16px] text-[#0360AB] hover:text-red-500"
                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="flex-1 min-w-[80px] border-none outline-none text-xs px-1 bg-transparent"
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
              </div>
              {/* Course */}
              <div>
                <label className="block text-xs font-[500] text-[#1A1C1E] mb-1">Course</label>
                <input
                  className="w-full border rounded-[6px] text-xs px-2 py-1 h-[28px] flex items-center justify-between min-h-[28px]"
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  placeholder="Type a course"
                />
              </div>
              <div>
              <label className="block text-xs font-[500] text-[#1A1C1E]">Quiz block</label>
              <p className="text-black font-[400] text-[10px] mb-1">Add quizzes to this block</p>
              <div className="flex items-center gap-2">
                <button
                  className="bg-[#F2F3FA] border border-[#C3C6CF] rounded px-4 py-2 flex items-center gap-2"
                  onClick={() => setShowAddQuiz(true)}
                >
                  Add Quiz <span>▸</span>
                </button>
                {selectedQuizzes.length > 0 && (
                  <span className="text-xs text-[#0360AB]">{selectedQuizzes.length} quizzes selected</span>
                )}
              </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={e => setIsPublic(e.target.checked)}
                />
                <label className="text-xs text-[#1A1C1E]">Make Quiz Block Public</label>
              </div>
            </div>

            {/* Create Quiz Block */}
            <div className="flex justify-end mt-2">
              <button
                className="px-4 py-2 bg-[#0360AB] text-white rounded text-xs"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin text-lg" />: 'Create Quiz Block'}
              </button>
            </div>

          </div>

        </div>

        
        {showAddQuiz && (
          <AddQuizzesToBlockModal
            onClose={() => setShowAddQuiz(false)}
            selected={selectedQuizzes}
            setSelected={setSelectedQuizzes}
          />
        )}

    </PopUpContainer>
        
     
  );
};

export default CreateQuizBlockModal;
