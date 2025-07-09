import React, { useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import UserMetrics from "../components/userMetrics";
import RevenueMetrics from "../components/revenueMetrics";
import ContentMetrics from "../components/contentMetrics";

const AnalyticsPage: React.FC = () => {
  const [view, setView] = React.useState(1);


    const lastNdays = [
        { name: 'Last 7 days', value: 7 },
        { name: 'Last 14 days', value: 14 },
        { name: 'Last 30 days', value: 30 },
        { name: 'Last 60 days' , value: 60},
        { name: 'Last 90 days' , value: 90},
    ]

    const [dayfilter , setDayFilter] = useState(7);
    const [isDropDown , setIsDropDown] = useState(false)

  return (
    <div className="flex flex-col  min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-[#004883]">Analytics </h1>
      <div className="border-b-[1px] my-3 border-[#C3C6CF] flex  w-[80%] justify-between items-center">
        <div className="flex items-center">
          <div
            className={`text-[16px] cursor-pointer font-[500] p-2 px-3 ${
              view === 1
                ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                : " text-[#73777F] bg-white "
            } `}
            onClick={() => setView(1)}
          >
            User Metrics
          </div>
          <div
            className={`text-[16px] cursor-pointer  p-2 px-3 font-[500] ${
              view === 2
                ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                : " text-[#73777F] bg-white "
            } `}
            onClick={() => setView(2)}
          >
            Revenue Metrics
          </div>
          <div
            className={`text-[16px] cursor-pointer  p-2 px-3 font-[500] ${
              view === 3
                ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                : " text-[#73777F] bg-white "
            } `}
            onClick={() => setView(3)}
          >
            Content Metrics
          </div>
        </div>

        <div>
          <h2 className="text-[#73777F] text-[12px]">Aug 30 - Sep 30</h2>
          <div className="relative flex items-center gap-3 text-[#43474E] font-[500] text-[16px]" onClick={() => setIsDropDown(!isDropDown)}>
            
            <h3 className="cursor-pointer">Last {dayfilter} days</h3>
            <FaChevronDown className="cursor-pointer" />

            {
              isDropDown && (<div className="flex flex-col w-full border-[1px] border-[#73777F] rounded-[8px] absolute top-8 right-0 bg-white shadow-lg" style={{ boxShadow: "0px 4px 4px 0px #00000026" }}>
                <ul>
                    {
                        lastNdays.filter((item) => item.value !== dayfilter).map((item) => {

                            return (
                    <li className="cursor-pointer text-[#1A1C1E] p-1 hover:bg-[#ECEDF4] rounded-[8px] " key={item.value} onClick={
                        () => {
                            setDayFilter(item.value);
                            setIsDropDown(false);
                        }
                    }>{item.name}</li>

                            )
                        })
                    }
                    
                </ul>
            </div>)
            }

          </div>
        </div>
      </div>

     


      {
        view === 1 && <UserMetrics />

      }
      {
        view === 2 && <RevenueMetrics />
      }
      {
        view === 3 && <ContentMetrics />
      }
    
   
    </div>
  );
};

export default AnalyticsPage;