import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaChevronDown  , FaChevronRight, FaChevronUp, FaHeart, FaMoneyCheckAlt, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import pfp from '../assets/pfp.jpg'
import { BsWindowSidebar } from "react-icons/bs";
import { PiVideoCameraThin } from "react-icons/pi";
import { RiBarChartBoxLine } from "react-icons/ri";
import {  MdOutlineCampaign } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {

    const [isCreateClicked , setCreateClicked] = useState(false)
        const clickCreate = () =>{
            setCreateClicked(!isCreateClicked)
        }

    const sidebarArr = [
            {
                id: 1,
                label : "Dashboard",
                icon : [<BsWindowSidebar />],
                link: "/"
            },
              {
                id: 2,
                label : "Lectures",
                icon : [<PiVideoCameraThin />],
                link : "lectures"
            },  {
                id : 3,
                label : "Quizzes",
                icon : [<FaRegHeart /> , <FaHeart />],
                link : "quizzes"
            },  {
                id : 4,
                label : "Users",
                icon : [<FaRegUserCircle />],
                link : "users"
            },  {
                id: 5,
                label : "Subscriptions",
                icon : [<FaMoneyCheckAlt />],
                link : "subscriptions"
            },  {
                id : 6,
                label : "Analytics",
                icon : [<RiBarChartBoxLine />],
                link : "analytics"

            },  {
                id : 7,
                label : "Campaigns",
                icon : [<MdOutlineCampaign />],
                link : "campaigns",

            },  {
                id: 8,
                label : "Settings",
                icon : [<IoMdSettings />],
                link : "settings"
            },
    ]
  return (
    <aside className="w-full h-full bg-[#F2F3FA] border-[1px] border-[#C3C6CF]  space-y-3  box-border">
      <button className="w-[32px] mx-5 mt-5 flex items-center justify-center h-[32px] rounded-[4px] bg-[#ECEDF4] border-[1px] border-[#C3C6CF] ">
        <HiOutlineBars3 className="text-xl"/>
      </button>
      <div className="relative px-2 w-full">
      
      <button className="bg-[#0360AB] mx-3 mt-3 rounded-[36px] w-[112px] h-[48px] text-white flex items-center justify-between box-border px-5 " onClick={clickCreate}>
        Create
        {
            isCreateClicked ? <FaChevronUp className="text-sm "/> :  <FaChevronDown className="text-sm "/>
        }
       

        </button>
        {
            isCreateClicked && (
                <div className="bg-white absolute z-10 w-4/5 left-6 px-1 py-2 border-[1px] border-[#C3C6CF] rounded-[8px]   ">
                    <ul className="w-full text-[14px] text-[#334155] ">
                    <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4]">
                    Lecture
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>

                      <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4]">
                    Lecture Block
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>

                      <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4]">
                    Lecture Bank
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>

                     <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4]">
                    Quiz
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>
                     <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4]">
                    Quiz Block
                    <FaChevronRight className="hidden text-[#334155]  text-sm group-hover:inline" />
                    
                    </li>
                    
                    </ul>
                </div>
            )
        }
      </div>
      
      <nav>
        <ul className="list-none space-y-[3px] p-0">
            {
                sidebarArr.map((item) =>{
                    return (
                        <Link to={`${item.link}`}>
                        <li
  key={item.id}
  className="group flex gap-4 text-black items-center w-full 
             hover:bg-[#D4E3FF] 
             transition-all duration-300 ease-in-out
             hover:border-l-[3px] hover:border-[#0360AB] 
             py-2 px-4 box-border border-l-[0px] border-transparent"
>
                            <span className={`text-xl group-hover:text-[#004883] ${item.icon[1]? "group-hover:hidden" : " " }`}>{item.icon[0]}</span>
                            {
                                item.icon[1] && (
                                    <span className={`text-xl group-hover:text-[#004883] hidden ${item.icon[1]? "group-hover:flex" : " " }`} >{item.icon[1]}</span>
                                ) 
                            }
                            <p className="text-[#43474E] text-[16px] group-hover:text-[#004883]">{item.label}</p>

                        </li>
                        </Link>
                    )
                })
            }
        </ul>
      </nav>

      <div className="w-[93%] bg-white py-1 flex items-center mt-14 mx-2 gap-2 px-[8px] border-[1px] border-[#C3C6CF] rounded-[4px] ">
        <img src={pfp} className="w-[36px] h-[36px] rounded-full object-cover" alt="" />
        <div>
            <h2 className="text-[14px] text-[#1A1C1E]">Orisajo Toluwanimi</h2>
            <p className="text-[11px] text-[#73777F]">Content Manager</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
