import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

const PopUpContainer: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ title, children, onClose , footer }) => {
  return (
    <div className="fixed inset-0 bg-[#00000066]  flex items-center justify-center z-[1000] absolute ">
      <div className="bg-white rounded-[16px] max-h-[85vh] overflow-y-auto w-[577px] shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-14 py-4 border-b border-[#C3C6CF] rounded-t-[16px] bg-[#F8F9FF] sticky top-0 z-10">
          <h2 className="text-[24px] font-semibold text-[#1A1C1E]">{title}</h2>
          <button
            onClick={() => {
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] cursor-pointer text-xl" />
          </button>
        </div>
        {/* Main Content */}
        <div className="px-6 py-4 pb-16 space-y-4 text-xs">{children}</div>

{/* Footer */}
            {
              footer ?  (
                <div className="absolute bottom-0 left-0 right-0 border-t border-[#C3C6CF] bg-white p-4">
                  {footer}
                </div>
              ) : (
                				<div className="flex justify-end gap-4 mt-3 p-2 bg-[#F8F9FF] w-full sticky bottom-0 z-10">
					<button
						className="px-3 py-1 text-xs bg-[#D4E3FF] rounded  text-[#0360AB] h-[28px]"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="px-3 py-1 text-xs rounded bg-[#0360AB] text-white h-[28px]"
						onClick={onClose}
					>
						Done
					</button>
				</div>
              )
            }

      </div>
    </div>
  );
};

export default PopUpContainer;
