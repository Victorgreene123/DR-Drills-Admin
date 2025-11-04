import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import { useApi } from "../../hooks/useApi";
import { LoadingAnimation } from "../../pages/QuizBlocksScreen";

interface SelectQuizBlockPopupProps {
  selectedBlocks: { id: string; name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSelectBlock: (block: { id: string; name: string } | null) => void;
}

interface QuizBlock {
  id: string;
  name: string;
}

const SelectQuizBlockPopup: React.FC<SelectQuizBlockPopupProps> = ({
  selectedBlocks,
  isOpen,
  onClose,
  onSelectBlock,
}) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [quizBlocks, setQuizBlocks] = useState<QuizBlock[]>([]);
  const { apiFetch } = useApi();
  const [loading, setLoading] = useState(false);

  // Fetch quiz blocks from API
  useEffect(() => {
    const fetchQuizBlocks = async () => {
      try {
        setLoading(true);
        const res = await apiFetch("/api/blocks/quiz");
        const data = await res.json();
        console.log(data)
        const mappedBlocks: QuizBlock[] = data.data.map((block: any) => ({
          id: block.id,
          name: block.description,
        }));

        setQuizBlocks(mappedBlocks);
      } catch (error) {
        console.error("Error fetching quiz blocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizBlocks();
  }, []);

  // Initialize selection when popup opens
  useEffect(() => {
    if (isOpen) {
      setSelectedId(selectedBlocks?.[0]?.id ?? null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredBlocks = quizBlocks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (id: string) => {
    setSelectedId(id);
    const block = quizBlocks.find((b) => b.id === id) ?? null;
    onSelectBlock(block);
  };

  const selectedBlock = quizBlocks.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1100]">
      <div className="bg-white max-w-3xl w-full h-[450px] rounded-xl relative flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2">
          <h2 className="text-[18px] text-[#1A1C1E] font-semibold">
            Select Quiz Block
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 h-0 p-4 gap-4">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingAnimation />
            </div>
          ) : (
            <>
              {/* Left Side */}
              <div className="w-1/2 pr-4 border-r-[1px] border-[#C3C6CF] flex flex-col">
                <div className="mb-3">
                  <div className="w-full relative bg-[#F2F3FA] border-[1px] border-[#C3C6CF] rounded-[8px] h-[35px] flex items-center">
                    <IoSearch className="mx-2 text-xl text-[#0F172A] opacity-50" />
                    <input
                      type="text"
                      aria-label="Search Quiz Blocks"
                      className="w-full outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F] bg-transparent"
                      placeholder="Search Quiz Blocks"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 pr-2 border-t-[1px] border-[#C3C6CF]" style={{ maxHeight: 300 }}>
                  <div role="radiogroup" aria-label="Quiz Blocks">
                    {filteredBlocks.map((block) => (
                      <label
                        key={block.id}
                        className={`flex items-center gap-3 py-3 px-2 cursor-pointer rounded ${
                          selectedId === block.id ? "bg-[#E8F1FF]" : "hover:bg-[#F2F3FA]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz-block"
                          value={block.id}
                          checked={selectedId === block.id}
                          onChange={() => handleChange(block.id)}
                          className="w-4 h-4 accent-[#0360AB]"
                        />
                        <span className="text-sm text-[#1A1C1E] truncate">{block.name}</span>
                      </label>
                    ))}
                  </div>

                  {filteredBlocks.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No blocks found.</div>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div className="w-1/2 pl-4 flex flex-col">
                <h3 className="text-[18px] font-semibold mb-2">Selected Block</h3>
                <p className="text-[#0360A  B] text-[16px] mb-2">
                  {selectedBlock ? selectedBlock.name : "None selected"}
                </p>

                <div className="overflow-y-auto flex-1 pr-2 border-t-[1px] border-[#C3C6CF]" style={{ maxHeight: 300 }}>
                  {selectedBlock ? (
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-3 h-3 rounded-full bg-[#0360AB]" />
                      <span className="truncate w-full text-sm text-[#1A1C1E]">
                        {selectedBlock.name}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">No block selected.</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t-[1px] border-[#C3C6CF]">
          <button
            onClick={onClose}
            disabled={!selectedBlock}
            className={`px-4 py-2 rounded-[4px] text-white ${
              selectedBlock ? "bg-[#0360AB]" : "bg-[#9fb4d6] cursor-not-allowed"
            }`}
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default SelectQuizBlockPopup;
