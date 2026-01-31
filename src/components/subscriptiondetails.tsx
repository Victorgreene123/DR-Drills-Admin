




import { useState } from "react";
import  { forwardRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
// import { GoDotFill } from "react-icons/go";

import { LuMailPlus } from "react-icons/lu";
import { LoadingAnimation } from "../pages/QuizBlocksScreen";
import { FaArrowLeft } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

interface SubscriptionDetailsPanelProps {
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

const SubscriptionDetailsPanel = forwardRef<HTMLDivElement, SubscriptionDetailsPanelProps>(
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
    const [view, setView] = useState<"details" | "leaderboard">("details");

    const getStatusColor = (status: string) => {
      switch (status?.toLowerCase()) {
        case 'success': return 'bg-green-100 text-green-700';
        case 'pending': return 'bg-yellow-100 text-yellow-700';
        case 'failed': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    if (!dataItem) return null;

    return (
      <div
        ref={ref}   // 🎯 REQUIRED
        className="absolute top-1/8 right-20 h-[85vh] w-[450px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col"
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

      <div className="w-full gap-4 flex items-start px-4 mt-4">
            <div className={`flex items-center gap-3`}>
            <img src={dataItem?.image ?? badge} alt="" className={`w-14 h-14 rounded-full ${(details?.user?.isPremium || dataItem.premium == 1) && "border-4 border-[#004883]"}`} />
              <div>
              <h2 className="text-[#1A1C1E] text-[18px] font-semibold leading-tight" >{details?.user?.fullname || dataItem.title}</h2>
              <h5 className="text-[#43474E] flex items-center gap-2">{details?.user?.email || dataItem.email} <LuMailPlus /></h5>
              <h6 className="text-[12px] text-[#73777F]">Last Seen : {details?.user?.lastSeen || dataItem.lastSeen || "Never"}</h6>

              </div>
            
            </div>
          </div>

      {/* Main view switch */}
      
                <div className="flex-1 py-4 px-4 overflow-y-auto flex flex-col">
                  {view !== "details" && (
                    <button className="flex items-center gap-2 mb-4 text-[14px]" onClick={() => setView("details")}>
                    <FaArrowLeft/> Back
                    </button>
                  )}
        
                  {loadingDetails ? (
                    <div className="flex-1 flex items-center justify-center">
                      <LoadingAnimation />
                    </div>
                  ) : details ? (
                    <div className="space-y-6">
                      {/* Active Subscription Summary */}
                      {details.activeSubscription && (
                        <div className="bg-[#F8F9FF] p-4 rounded-lg border border-[#D4E3FF]">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-[#1A1C1E]">Active Plan</h4>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${details.activeSubscription.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {details.activeSubscription.status}
                            </span>
                          </div>
                          <p className="text-[16px] font-bold text-[#0360AB]">{details.activeSubscription.plan}</p>
                          <p className="text-[12px] text-[#73777F] mt-1">
                            Expiry: {details.activeSubscription.expiry === "Invalid Date" ? "No precise date" : details.activeSubscription.expiry}
                          </p>
                          <p className="text-[14px] font-semibold mt-2">{details.activeSubscription.amount} NGN</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-[#1A1C1E] mb-3 flex items-center gap-2">
                          Payment History <span className="text-[12px] font-normal text-[#73777F]">({details.paymentHistory?.length || 0})</span>
                        </h4>
              
                        {details.paymentHistory && details.paymentHistory.length > 0 ? (
                          <div className="space-y-3">
                            {details.paymentHistory.map((history: any, idx: number) => (
                              <div key={idx} className="flex items-center w-full justify-between p-3 rounded-lg border border-transparent hover:border-[#E0E0E0] hover:bg-[#FAFAFA] transition">
                                <div className="flex-1 min-w-0">
                                  <p className="text-[14px] font-medium text-[#1A1C1E] truncate">{history.description}</p>
                                  <div className="flex items-center gap-2 text-[12px] text-[#73777F] mt-1">
                                    <span>{history.date}</span>
                                    <GoDotFill className="text-[6px]" />
                                    <span>{history.expiry}</span>
                                  </div>
                                </div>
                                <div className="text-right ml-4">
                                  <p className="text-[14px] font-semibold text-[#1A1C1E]">{history.amount} {history.currency}</p>
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${getStatusColor(history.status)}`}>
                                    {history.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-[#73777F] text-sm italic">
                            No payment history available
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                      Select a subscription to view details
                    </div>
                  )}
                </div>

      
    </div>
  );
});


export default SubscriptionDetailsPanel;
