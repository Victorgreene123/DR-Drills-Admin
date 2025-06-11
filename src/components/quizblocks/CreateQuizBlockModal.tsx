import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import AddQuizzesToBlockModal from "./AddQuizzesToBlockModal";

const CreateQuizBlockModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [course, setCourse] = useState("");
  const [selectedQuizzes, setSelectedQuizzes] = useState<any[]>([]);
  const [showAddQuiz, setShowAddQuiz] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[1100]">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <button
          className="absolute top-2 right-2 text-2xl text-[#73777F]"
          onClick={onClose}
        >
          <LiaTimesSolid />
        </button>
        <h2 className="text-xl font-semibold mb-4">Create Quiz Block</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              maxLength={100}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Give your quiz a title"
            />
            <div className="text-xs text-right text-[#73777F]">{title.length}/100</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              className="w-full border rounded px-3 py-2"
              maxLength={100}
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              placeholder="A short description of the quiz block"
            />
            <div className="text-xs text-right text-[#73777F]">{subtitle.length}/100</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Type a course"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quiz block</label>
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
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="bg-[#F2F3FA] text-[#0360AB] px-4 py-2 rounded" onClick={onClose}>
            Save as Draft
          </button>
          <button className="bg-[#0360AB] text-white px-4 py-2 rounded" onClick={onClose}>
            Publish
          </button>
        </div>
        {showAddQuiz && (
         
                <AddQuizzesToBlockModal
                    onClose={() => setShowAddQuiz(false)}
                    selected={selectedQuizzes}
                    setSelected={setSelectedQuizzes}
                />
               
            
          
        )}
      </div>
    </div>
  );
};

export default CreateQuizBlockModal;
