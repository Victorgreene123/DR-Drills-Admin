




import { useEffect, useRef, useState } from "react";
import  { forwardRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";

import { FaChevronRight } from "react-icons/fa";

import { LuMailPlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import { formatReadableDate } from "../utils/formatDate";
import { LoadingAnimation } from "../pages/QuizBlocksScreen";

interface UserDetailsPanelProps {
  id: any;
  data: any[];
  details: any;
  loadingDetails: boolean;
  onClose: () => void;
  onPreview?: () => void;
  badge?: string;
  thumbnail?: string;
  payment_history: any [];
  
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

const UserDetailsPanel = forwardRef<HTMLDivElement, UserDetailsPanelProps>(
  (
    {
      id,
      data,
      details,
      loadingDetails,
      onClose,
      badge,
    },
    ref
  ) => {
    const dataItem = data.find((item) => item.id === id);
    const showPremiumRef = useRef<HTMLDivElement | null>(null);
        
        
          useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
              if (showPremiumRef.current && !showPremiumRef.current.contains(event.target as Node)) {
                setShowAddPremium(false);
              }
            }
        
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
          }, []);
    const [view, setView] = useState<"details" | "history">("details");
    const [showAddPremiumModal , setShowAddPremium] = useState(false)
    const [validityPeriod , setValidityPeriod] = useState<number>(7)
    if (!dataItem) return null;
    console.log(dataItem)
    return (
      <div
        ref={ref}   // 🎯 REQUIRED
        className="absolute top-1/8 right-20 h-[85vh] w-[410px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col"
      >

        {/*Add Premium Subscription Modal */}
        
       {
       showAddPremiumModal && 
       <div className= "shadow-lg border-[1px] border-[#C3C6CF] z-[1500] bg-white absolute left-[-310px] top-1/3 w-[300px] rounded-[8px] h-[180px]" ref={showPremiumRef}>
        {/* Header */}
      <div className="w-full p-2 bg-[#F8F9FF] border-y-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
        <h2 className="text-center font-semibold text-[16px] text-[#0360AB]">
         Add Premium Subscription
        </h2>
        <button
          onClick={() => setShowAddPremium(false)}
          className="w-6 absolute top-2 right-5 h-6 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
          aria-label="Close"
        >
          <LiaTimesSolid className="text-[#1A1C1E] text-sm" />
        </button>
      </div>

      {/* Validity Period */}
      <div className="p-2">
                      <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-[16px] font-medium text-[#1A1C1E]">Validity Period (Days)</label>

                <input type="number"  className="border border-[#C3C6CF] rounded-lg p-3 text-sm cursor-pointer" value={validityPeriod} onChange={(e) => setValidityPeriod(Number(e.target.value))}/>
              </div>

              <button className="w-full text-white bg-[#0360AB] rounded-md py-2">
                  Add Subscription
              </button>
      </div>



        </div>}
      {/* Header */}
      <div className="w-full p-2 bg-[#F8F9FF] border-y-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
        <h2 className="text-center font-semibold text-[18px] text-[#0360AB]">
          {view === "details" ? "User Details" : "Leader Board"}
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
              <h6 className="text-[12px] text-[#73777F]">Last Seen : {dataItem.lastSeen}</h6>

              </div>
            
            </div>
          </div>

      {/* Main view switch */}
      {view === "details" ? (
        <div className="flex-1 w-full py-6 px-4 flex flex-col overflow-y-auto" style={{ minHeight: 0 }}>
          {/* Top Info */}

        {loadingDetails ? (
          <div className="text-xs text-gray-400 mt-3">Loading details...</div>
        ) : details && (
          <>
          
        <h4 className="font-semibold">Basic Information</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                    <p className="flex items-center">{details.university || "No university"} <GoDotFill /></p>
                    <p className="flex items-center">{`${details.level} level` || "No data" } <GoDotFill /> </p>
                    <p>{details.dept || "No Data"}</p>
              
          </div>
          </>

        )}
        {/* {
            "user_id": 36,
            "firstname": "yinka",
            "surname": "madamidolda",
            "email": "codewithyinka@gmail.com",
            "online_status": 0,
            "avatar": null,
            "level": null,
            "university": null,
            "dept": null,
            "premium": 0,
            "verified": 0,
            "created_at": "2025-10-22T14:15:53.000Z",
            "last_login": null
        }, */}


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

          


        {/* Action List */}
        <div className="p-2 space-y-2 mt-2">
          <h4 className="font-semibold">Payment</h4>
          <button
              className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
              onClick={() => setView("history")}
            >
              View History 
              <FaChevronRight />
            </button>
                    <button
              className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
             
            >
              Next Billing Date : {loadingDetails ? "loading ..." : details.premium_details ? formatReadableDate(details.premium_details.premium_expiry)  : "--" }
              <FaChevronRight />
            </button>
            <button
              className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
              onClick={() => setShowAddPremium(true)}
            >
              Add Premium Subscription 
              <FaChevronRight />
            </button>
        </div>

        <div className="p-2 space-y-2 mt-2">
          <h4 className="font-semibold">Account</h4>
          <button
              className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
              // onClick={() => setView("leaderboard")}
            >
              Suspend/Activate Account 
              <FaChevronRight />
            </button>
                    <button
              className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
              // onClick={() => setView("leaderboard")}
            >
              Reset Password
              <FaChevronRight />
            </button>
                    <button
              className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
              // onClick={() => setView("leaderboard")}
            >
              Delete Account
              <FaChevronRight />
            </button>
        </div>
      </div>



         
    
      ) : (
        // ✅ Leaderboard View
        <div className="flex-1 py-4 px-4 overflow-y-auto">
          <button className="flex items-center gap-2 mb-4 text-[14px]" onClick={() => setView("details")}>
           <FaArrowLeft/> Back
          </button>

          <div>
          <h4 className="font-semibold">Payment History</h4>

          {
            loadingDetails ? <LoadingAnimation /> : details.payment_history.length > 0? (
                <div className="flex items-center w-full justify-between">
            <div>
              <p className="text-[14px]">11 Oct 2025</p>
              <p className="text-[12px] text-[#73777F]">exp : 11 Oct 2026</p>
            </div>
            <div>
              <p className="text-[14px]">New Monthly Premium Subscription</p>
            </div>
          </div>
            ) : "No Data Available"
          }
          

          </div>
        </div>
      )}

      

    </div>
  );
});


export default UserDetailsPanel;
