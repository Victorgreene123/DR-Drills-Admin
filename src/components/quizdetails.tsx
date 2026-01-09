




import { useState } from "react";
import  { forwardRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";

import { GrDownload } from "react-icons/gr";
import { BiTrash } from "react-icons/bi";

interface QuizDetailsPanelProps {
  id: any;
  data: any[];
  details: any;
  loadingDetails: boolean;
  onClose: () => void;
  onPreview: () => void;
  badge?: string;
  thumbnail?: string;
  leaderboard: any [];
  
}



//  {
//                 "id": 21,
//                 "user_id": 8,
//                 "firstname": "Lea",
//                 "surname": "Miller",
//                 "avatar": "https://i.pravatar.cc/300?img=18",
//                 "university": 4,
//                 "school_name": "University of California, San Francisco School of Medicine",
//                 "score": 95,
//                 "time_taken": 841,
//                 "questions_attempted": 12,
//                 "questions_correct": 6,
//                 "completed_at": "2025-09-15T10:58:10.000Z",
//                 "rank": 1,
//                 "is_top_score": 1
//             },

const QuizDetailsPanel = forwardRef<HTMLDivElement, QuizDetailsPanelProps>(
  (
    {
      id,
      data,
      details,
      loadingDetails,
      onClose,
      onPreview,
      badge,
      // thumbnail,
      leaderboard,
    },
    ref
  ) => {
    const dataItem = data.find((item) => item.id === id);
    const [view, setView] = useState<"details" | "leaderboard">("details");

    if (!dataItem) return null;

    return (
      <div
        ref={ref}   // 🎯 REQUIRED
        className="absolute top-1/8 right-20 h-[438px] w-[410px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col"
      >
      {/* Header */}
      <div className="w-full p-2 bg-[#F8F9FF] border-t-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
        <h2 className="text-center font-semibold text-[18px]">
          {view === "details" ? "Quiz Details" : "Leader Board"}
        </h2>
        <button
          onClick={onClose}
          className="w-8 absolute top-2 right-5 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
          aria-label="Close"
        >
          <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
        </button>
      </div>

      <div className="w-full gap-4 flex items-start px-4">
            <div className="flex-1 items-start">
              <h2 className="text-[#1A1C1E] text-[18px] font-semibold mb-1">{dataItem.title}</h2>
              <span className="bg-[#ECEDF4] rounded-[4px] py-[2px] font-[400] px-[8px] text-xs">{dataItem.course}</span>
            </div>
            <img src={details?.thumbnail ?? badge} alt="" className="w-10 h-10" />
          </div>

      {/* Main view switch */}
      {view === "details" ? (
        <div className="flex-1 w-full py-6 px-4 flex flex-col overflow-y-auto" style={{ minHeight: 0 }}>
          {/* Top Info */}
          

          {/* Stats */}
          <div className="mt-2 text-[#73777F] text-[14px] flex flex-wrap gap-2 items-center">
            <span>{dataItem.questions} questions</span> <GoDotFill />
            <span>Negative: {details?.negative_marking ?? "-0.5"}</span> <GoDotFill />
            <span>{dataItem.type}</span>
          </div>



        <div className="text-[#73777F] text-[14px] flex flex-wrap gap-2 items-center mt-1">
          <span>{dataItem.source}</span> <GoDotFill />
          <span>{dataItem.year}</span>
        </div>

        <div className="text-[#73777F] text-[14px] mt-2">
          Uploaded: {dataItem.uploaded ?? "1 August 2026"}
        </div>

        {/* Tags */}
        {loadingDetails ? (
          <div className="text-xs text-gray-400 mt-3">Loading details...</div>
        ) : details && (
          <div className="flex flex-wrap gap-2 mt-3">
            {(details?.tags || []).map((item: any) => (
              <span
                key={item.id}
                className="bg-[#DFE2EB] text-[#43474E] px-2 py-1 rounded text-[11px]"
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
           {/* Stats */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
            <span className="text-[12px] text-[#73777F]">Avg. monthly Visits:</span>
            <span className="text-[16px] font-semibold text-[#1A1C1E]">
              {dataItem.avgMonthlyVisits ?? "30,000"}
            </span>
          </div>
          <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
            <span className="text-[12px] text-[#73777F]">Total Visits</span>
            <span className="text-[16px] font-semibold text-[#1A1C1E]">
              {dataItem.totalVisits ?? "30,000"}
            </span>
          </div>
          <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
            <span className="text-[12px] text-[#73777F]">Average Score</span>
            <span className="text-[16px] font-semibold text-[#1A1C1E]">
              {dataItem.averageScore ?? "70%"}
            </span>
          </div>
        </div>

          {/* Leaderboard Button */}
          <div className="mt-2">
            <button
              className="w-full flex items-center justify-between px-3 py-2 rounded bg-[#F8F9FF] text-[#1A1C1E] font-medium"
              onClick={() => setView("leaderboard")}
            >
              Leader Board
              <FaChevronRight />
            </button>
          </div>

          {/* Fast Track */}
        {/* <div className="mt-2">
          <h3 className="text-[14px] font-[500]">Fast Track</h3>
          <div className="flex items-center gap-2 my-2">
            <img src={thumbnail} alt="user" className="w-[82px] h-[47px] rounded" />
            <span className="text-xs text-[#73777F]">Introduction to Paris - 101</span>
          </div>

          <div className="mb-2">
            <h3 className="text-[14px] font-[500]">Quiz Blocks</h3>
            <div className="bg-[#F2F3FA] rounded px-3 py-2 mb-2">
              <div className="font-medium text-xs text-[#1A1C1E]">{details?.block_name}</div>
            </div>
          </div>
        </div> */}

        {/* Action List */}
        <div className="p-2 space-y-2 mt-2">
          {/* <div className="flex items-center gap-3 text-[14px]"><RiSendPlane2Line className="text-[#73777F]" /><p className="text-black">Publish quiz</p></div> */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#F8F9FF] text-[#73777F] hover:bg-[#ECEDF4] transition text-[14px]">
              <GrDownload />
              Download CSV
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#FFE8E8] text-[#D32F2F] hover:bg-[#FFCCCC] transition text-[14px]">
              <BiTrash />
              Delete quiz
            </button>
          </div>
        </div>
      </div>



         
    
      ) : (
        // ✅ Leaderboard View
        <div className="flex-1 py-4 px-4 overflow-y-auto">
          <button className="flex items-center gap-2 mb-4 text-[14px]" onClick={() => setView("details")}>
            ← Back
          </button>

          {leaderboard && leaderboard.map((user) => (
            <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span>
                    {user.rank}
                </span>
                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                <p className="text-[14px]">{user.firstname + user.surname}</p>
              </div>
              <span className="text-[14px] font-medium">{user.score}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {view === "details" && (
        <div className="flex flex-col gap-2 py-4 px-4 border-t border-[#C3C6CF] bg-white sticky bottom-0">
          <button className="w-full py-2 rounded bg-[#0360AB] text-white font-medium" onClick={onPreview}>
            Preview & Edit Quiz
          </button>
        </div>
      )}

    </div>
  );
});


export default QuizDetailsPanel;
