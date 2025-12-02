




import { useState } from "react";
import  { forwardRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
// import { GoDotFill } from "react-icons/go";

import { LuMailPlus } from "react-icons/lu";
// import { LoadingAnimation } from "../pages/QuizBlocksScreen";
import { FaArrowLeft } from "react-icons/fa6";

interface QuizDetailsPanelProps {
  id: any;
  data: any[];
  details: any;
  loadingDetails: boolean;
  onClose: () => void;
  onPreview?: () => void;
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

const SubscriptionDetailsPanel = forwardRef<HTMLDivElement, QuizDetailsPanelProps>(
  (
    {
      id,
      data,
      // details,
      // loadingDetails,
      onClose,
      badge,
    },
    ref
  ) => {
    const dataItem = data.find((item) => item.id === id);
    const [view, setView] = useState<"details" | "leaderboard">("details");

    if (!dataItem) return null;

    return (
      <div
        ref={ref}   // 🎯 REQUIRED
        className="absolute top-1/8 right-20 h-[85vh] w-[410px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col"
      >
      {/* Header */}
      <div className="w-full p-2 bg-[#F8F9FF] border-t-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
        <h2 className="text-center font-semibold text-[18px]">
          {view === "details" ? "Subscription Details" : "Leader Board"}
        </h2>
        <button
          onClick={onClose}
          className="w-8 absolute top-2 right-5 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
          aria-label="Close"
        >
          <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
        </button>
      </div>

      <div className="w-full gap-4 flex items-start px-4 mt-2">
            <div className={`flex items-center gap-3`}>
            <img src={dataItem?.image ?? badge} alt="" className={`w-12 h-12 rounded-full ${dataItem.premium == 1 && "border-4 border-[#004883]"}`} />
              <div>
              <h2 className="text-[#1A1C1E] text-[18px] font-semibold leading-tight" >{dataItem.title}</h2>
              <h5 className="text-[#43474E] flex items-center gap-2">{dataItem.email} <LuMailPlus /></h5>
              <h6 className="text-[12px] text-[#73777F]">Last Seen : {dataItem.lastSeen || "Never"}</h6>

              </div>
            
            </div>
          </div>

      {/* Main view switch */}
      
                <div className="flex-1 py-4 px-4 overflow-y-auto">
                  <button className="flex items-center gap-2 mb-4 text-[14px]" onClick={() => setView("details")}>
                   <FaArrowLeft/> Back
                  </button>
        
                  <div>
                  <h4 className="font-semibold">Payment History</h4>
        
                  {/* {
                    loadingDetails ? <LoadingAnimation /> : details.payment_history?.length > 0? ( */}
                        <div className="flex items-center w-full justify-between">
                    <div>
                      <p className="text-[14px]">11 Oct 2025</p>
                      <p className="text-[12px] text-[#73777F]">exp : 11 Oct 2026</p>
                    </div>
                    <div>
                      <p className="text-[14px]">New Monthly Premium Subscription</p>
                    </div>
                  </div>
                    {/* ) : "No Data Available"
                  } */}
                  
        
                  </div>
                </div>


         
    
      
    

      
    </div>
  );
});


export default SubscriptionDetailsPanel;
