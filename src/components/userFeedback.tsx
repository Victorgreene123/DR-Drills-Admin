import React from "react";
import userImage from "../assets/pfp.jpg"; // replace if needed
import { LiaTimesSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


interface FeedbackItem {
    id: number;
    user: string;
    action: string;
    course: string;
}

interface FeedbackProps {
    onClose : () => void;
}
const feedbackData = {
  thisWeek: [
    {
      id: 1,
      user: "Yemisi Olaoba",
      action: "flagged a question in",
      course:
        "Introductory medical anatomy ",
    },
    {
      id: 2,
      user: "Yemisi Olaoba",
      action: "flagged a question in",
      course:
        "Introductory medical anatomy test",
    },
    {
      id: 3,
      user: "Yemisi Olaoba",
      action: "flagged a question in",
      course:
        "Introductory medical anatomy test",
    },
    {
      id: 4,
      user: "Yemisi Olaoba",
      action: "flagged a question in",
      course:
        "Introductory medical anatomy quiz",
    },
  ],
  lastWeek: [
    {
      id: 5,
      user: "Yemisi Olaoba",
      action: "flagged a question in",
      course:
        "Introductory medical anatomy quiz.",
    },
    {
      id: 6,
      user: "Yemisi Olaoba",
      action: "flagged a question in",
      course:
        "Introductory medical anatomy lecture",
    },
  ],
};

const UserFeedbackPanel: React.FC<FeedbackProps> = ({onClose}) => {
  return (
    <div className="w-[25%] min-h-full bg-[#F8F9FF] border border-[#C3C6CF] px-6 py-8 overflow-y-auto">
      {/* Title */}
      <div className="flex items-center w-full justify-between">
        <h2 className="text-[#004883] font-semibold">User Feedback </h2>
        <button className="bg-[#ECEDf4] w-[32px] h-[32px] flex items-center justify-center rounded-full" onClick={onClose}>
            <LiaTimesSolid size={20}/>
        </button>
    </div>

    <div className="space-y-3 mt-6">
        <h5 className="text-[#0360AB] font-semibold">This Week </h5>
        <div className="space-y-3">
            {
                feedbackData.thisWeek.map((item) => (
                    <div className="w-full flex items-center space-around gap-3"> 
                        <img  src={userImage} className="w-[24px] h-[24px]  rounded-full object-cover"></img>
                        <p className="text-sm w-[78%] overflow-hidden break-words line-clamp-2">
                            {item.user} {item.action} {item.course}
                        </p>
                        <button>
                            
                            <IoMdCheckmarkCircleOutline className="text-[#73777F]" size={20}/>
                        </button>
                    </div>
                ))
            }
        <h5 className="text-[#0360AB] font-semibold">Last Week </h5>
           <div className="space-y-3">
            {
                feedbackData.lastWeek.map((item) => (
                    <div className="w-full flex items-center space-around gap-3"> 
                        <img  src={userImage} className="w-[24px] h-[24px]  rounded-full object-cover"></img>
                        <p className="text-sm w-[78%] overflow-hidden break-words line-clamp-2">
                            {item.user} {item.action} {item.course}
                        </p>
                        <button>
                            
                            <IoMdCheckmarkCircleOutline className="text-[#73777F]" size={20}/>
                        </button>
                    </div>
                ))
            }
              </div>
        </div>

        </div>
        
    </div>
  );
};

export default UserFeedbackPanel;
