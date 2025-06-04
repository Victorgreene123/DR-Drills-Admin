import React, { useState, useEffect } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { IoSearch } from 'react-icons/io5';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

interface SelectQuizBlockPopupProps {
  quizBlocks: { id: number; name: string }[];
  selectedBlocks: { id: number; name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSelectBlock: (block: { id: number; name: string }) => void;
}

const SelectQuizBlockPopup: React.FC<SelectQuizBlockPopupProps> = ({
  quizBlocks,
  selectedBlocks,
  isOpen,
  onClose,
  onSelectBlock,
}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    setSelected(selectedBlocks || []);
  }, [selectedBlocks, isOpen]);

  if (!isOpen) return null;

  const isBlockSelected = (block: { id: number; name: string }) =>
    selected.some((b) => b.id === block.id);

  const toggleBlock = (block: { id: number; name: string }) => {
    setSelected((prev) =>
      prev.some((b) => b.id === block.id)
        ? prev.filter((b) => b.id !== block.id)
        : [...prev, block]
    );
    onSelectBlock(block);
  };

  const filteredBlocks = quizBlocks.filter((block) =>
    block.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1100]">
      <div className="bg-white max-w-2xl w-full h-[400px] rounded-xl relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2">
          <h2 className="text-[18px] text-[#1A1C1E] font-semibold">Select Quiz Block</h2>
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
          <div className="w-full flex flex-col">
            <div className="mb-3">
              <div className="w-full relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[35px]">
                <IoSearch className="mx-2 text-xl text-[#0F172A] opacity-50" />
                <input
                  type="text"
                  className="w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]"
                  placeholder="Search for Quiz Blocks"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 pr-2 border-t-[1px] border-[#C3C6CF]" style={{ maxHeight: 250 }}>
              {filteredBlocks.map((block) => (
                <div key={block.id} className="flex items-center gap-3 py-2">
                  {isBlockSelected(block) ? (
                    <MdCheckBox
                      className="text-[#0360AB] text-[24px]"
                      onClick={() => toggleBlock(block)}
                    />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      className="bg-white text-[24px]"
                      onClick={() => toggleBlock(block)}
                    />
                  )}
                  <span className="truncate w-full text-sm">{block.name}</span>
                </div>
              ))}
              {filteredBlocks.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No quiz blocks found.
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2 justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded text-sm bg-[#D4E3FF]"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectQuizBlockPopup;
