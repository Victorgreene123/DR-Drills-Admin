import React, { useEffect, useRef, useState } from "react";
import {  FaHeart, FaMoneyCheckAlt, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import pfp from '../assets/pfp.jpg'
import { BsWindowSidebar } from "react-icons/bs";
import { PiVideoCameraThin } from "react-icons/pi";
import { RiBarChartBoxLine } from "react-icons/ri";
import {  MdOutlineCampaign } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import UploadLecturePopupFlow from "./popups/UploadLecturePopupFlow";
import CreateLectureBlockPopup from "./popups/CreateLectureBlockPopup";
import CreateLectureBankPopup from "./popups/CreateLectureBankPopup";
import UploadQuizPopUpFlow from "./popups/UploadQuizPopUpFlow";
import CreateQuizBlockModal from "./quizblocks/CreateQuizBlockModal";
import { useAuth } from "../context/authcontext";

const Sidebar: React.FC = () => {


// const menuRef = useRef<HTMLDivElement | null>(null);


  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setCreateClicked(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);
    // const [isCreateClicked , setCreateClicked] = useState(false)
        // const clickCreate = () =>{
        //     setCreateClicked(!isCreateClicked)
        // }
    const profileMenuRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    const [showProfileMenu , setShowProfileMenu] = useState(false)
        const clickProfile = () =>{
            setShowProfileMenu(!showProfileMenu)
        }

    const [islectureOpened, setIsLectureOpened] = useState(false);
        const [isLectureBlockOpened , setIsLectureBlockOpened]= useState(false);
            const [isCreateLectureClicked , setIsCreateLectureClicked]= useState(false)
    const [isQuizOpened , setIsQuizOpened] = useState(false)
    const [isCreateQuizBlockOpened , setisCreateQuizBlockOpened]= useState(false)
    const onClose = () => {
        setIsLectureOpened(false)
    }
    const {logout} = useAuth()
    const sidebarArr = [
            {
                id: 1,
                label : "Dashboard",
                icon : [<BsWindowSidebar />],
                link: "dashboard"
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
    <aside className="w-full h-full relative bg-[#F2F3FA] border-[1px] border-[#C3C6CF]  space-y-3  box-border">
     
      {/* <div className="relative px-2 w-full"  ref={menuRef}>
      
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
                    <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4] cursor-pointer" onClick={() => setIsLectureOpened(true)}>
                    Lecture
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>

                      <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4] cursor-pointer" onClick={() => setIsLectureBlockOpened(true)}>
                    Lecture Block
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline " />
                    
                    </li>

                      <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4] cursor-pointer" onClick={() => setIsCreateLectureClicked(true)}>
                    Lecture Bank
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>

                     <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4] cursor-pointer" onClick={() => setIsQuizOpened(true)}>
                    Quiz
                    <FaChevronRight className="hidden text-[#334155] text-sm group-hover:inline" />
                    
                    </li>
                     <li className="p-2 px-3 group flex items-center justify-between hover:bg-[#ECEDF4] cursor-pointer" onClick={() => setisCreateQuizBlockOpened(true)}>
                    Quiz Block
                    <FaChevronRight className="hidden text-[#334155]  text-sm group-hover:inline" />
                    
                    </li>
                    
                    </ul>
                </div>
            )
        }
      </div> */}
      
      <nav className="mt-12">
        <ul className="list-none space-y-[3px] p-0 ">
            {
                sidebarArr.map((item) =>{
                    const isActive = location.pathname.includes(item.link)
                    return (
                        <Link to={`${item.link}`} key={item.id}>
                        <li
  key={item.id}
  className={`${isActive && "border-l-[3px] border-[#0360AB] bg-[#D4E3FF]"} group flex gap-4 text-black items-center w-full 
             hover:bg-[#D4E3FF] 
             transition-all duration-300 ease-in-out
             hover:border-l-[3px] hover:border-[#0360AB] 
             py-2 px-4 box-border `}
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

     <div
  className="w-[93%] cursor-pointer bg-white py-1 flex items-center 
             absolute bottom-20 mx-2 gap-2 px-[8px] border border-[#C3C6CF] 
             rounded-[4px] select-none"
  ref={profileMenuRef}
  onClick={clickProfile}
>
  <img src={pfp} className="w-[36px] h-[36px] rounded-full object-cover" alt="" />
  <div>
      <h2 className="text-[14px] text-[#1A1C1E]">Orisajo Toluwanimi</h2>
      <p className="text-[11px] text-[#73777F]">Content Manager</p>
  </div>

  {showProfileMenu && (
    <div
      className="absolute -top-[150px] left-[0] w-[240px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                 border border-gray-200 p-4 z-20 animate-profileDialog"
    >
      <p className="text-sm text-gray-700 font-semibold mb-2">Signed in as</p>
      <p className="text-xs text-gray-500 mb-4">Orisajo Toluwanimi</p>

     <Link to={"settings"}> <button className="w-full text-left text-sm py-1.5 px-2 rounded hover:bg-gray-100">
        Account Settings
      </button></Link>
      <button className="w-full text-left text-sm py-1.5 px-2 rounded hover:bg-gray-100 text-red-600" onClick={() => logout()}>
        Logout
      </button>

      {/* Arrow */}
      <div className="absolute bottom-[-8px] left-6 w-4 h-4 bg-white rotate-45 border border-white"></div>
    </div>
  )}
</div>


      {
        islectureOpened && <UploadLecturePopupFlow onClose={onClose}/>
      }
        {
          isLectureBlockOpened &&  <CreateLectureBlockPopup onClose={() => setIsLectureBlockOpened(false)}/>
        }
        {
                    isCreateLectureClicked && <CreateLectureBankPopup onClose={() => setIsCreateLectureClicked(false)} />
        }
        {isQuizOpened && (
        <UploadQuizPopUpFlow isOpen={isQuizOpened} onClose={() => setIsQuizOpened(false)} />
      )}

       {isCreateQuizBlockOpened && (
    
            <CreateQuizBlockModal onClose={() => setisCreateQuizBlockOpened(false)} />
          
      )}
    </aside>
  );
};

export default Sidebar;
