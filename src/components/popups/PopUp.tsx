import React  from "react";
import { LiaTimesSolid } from "react-icons/lia";

const PopUpContainer: React.FC<{
    title: string; 
    onClose: () => void;
        children: React.ReactNode; 
}> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#00000066]  flex items-center justify-center z-[1000] absolute ">
      <div className="bg-white rounded-[16px] max-h-[85vh] overflow-y-auto w-[800px] shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-1 border-b border-[#C3C6CF] rounded-t-[16px] bg-[#F8F9FF] sticky top-0 z-10">
          <h2 className="text-[19px] font-semibold text-[#1A1C1E]">
            {title}
          </h2>
          <button
            onClick={() => {onClose() }}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>
        {/* Main Content */}
        <div className="px-6 py-4 space-y-4 text-xs">
          {children}
        </div>


      </div>
    </div>
  );
}
        
    
    export default PopUpContainer;

