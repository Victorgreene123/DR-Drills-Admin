import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import logo from '../assets/favicon.svg'
import { FiMessageSquare } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaChevronRight} from "react-icons/fa";
import UploadLecturePopupFlow from './popups/UploadLecturePopupFlow';
import CreateLectureBlockPopup from './popups/CreateLectureBlockPopup';
import CreateLectureBankPopup from './popups/CreateLectureBankPopup';
import UploadQuizPopUpFlow from './popups/UploadQuizPopUpFlow';
import CreateQuizBlockModal from './quizblocks/CreateQuizBlockModal';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

interface NavProps {
  onOpenFeedback : () => void;
}
const Navbar: React.FC<NavProps> = ({onOpenFeedback}) => {

  
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setCreateClicked(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
      const [isCreateClicked , setCreateClicked] = useState(false)
          const clickCreate = () =>{
              setCreateClicked(!isCreateClicked)
          }
  
      const [islectureOpened, setIsLectureOpened] = useState(false);
          const [isLectureBlockOpened , setIsLectureBlockOpened]= useState(false);
              const [isCreateLectureClicked , setIsCreateLectureClicked]= useState(false)
      const [isQuizOpened , setIsQuizOpened] = useState(false)
      const [isCreateQuizBlockOpened , setisCreateQuizBlockOpened]= useState(false)
      const onClose = () => {
          setIsLectureOpened(false)
      }

      const location = useLocation();

      const currentPage = location.pathname.slice(1)
      const DisplayPage = currentPage[0].toUpperCase() + currentPage.slice(1)
      
  return (
    <nav className="bg-white h-[52px] border-[1px] px-3 border-[#C3C6CF] flex items-center">
      <div className='w-[25%]  h-full flex items-center gap-3'>
      <img src={logo} alt="" className=''/>
      <h2 className='text-2xl font-bold text-[#004883]'>Admin Panel</h2>
      </div>
      <div className='w-[75%]   h-full  flex items-center justify-between'>
        <p className='text-[#73777F] w-[18%]' >Dashboard /{DisplayPage}</p>
        <div className='flex gap-3 items-center'>
            <div className='w-[320px] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] '>
                <IoSearch  className='mx-2 text-[#0F172A] opacity-50 '/>
                <input type="text" className='w-full flex items-center outline-none border-none  pl-8 rounded-[8px] h-full  text-[14px] text-[#73777F]' placeholder='Search for Content or User' />
            </div>
            <div className='text-[#0360AB] bg-[#ECEDF4] cursor-pointer  rounded-[8px] px-2 py-2 flex items-center gap-1' onClick={ onOpenFeedback}>
                <FiMessageSquare  className='text-xl'/>
                <span>User Feedback</span>
                <span className='bg-[#B3261E] w-4 h-4 text-white flex items-center justify-center rounded-full text-[12px]'>
                    3
                </span>

            </div>

                  <div className="relative px-2 w-auto"  ref={menuRef}>
                 
                  <button className="bg-[#0360AB] ml-3 rounded-md w-[112px] h-[40px] text-white flex items-center gap-2 box-border px-5 " onClick={clickCreate}>
                                        {
                        isCreateClicked ? <FaMinus className="text-sm "/> :  <FaPlus className="text-sm "/>
                    }
                    
                    Create

                   
            
                    </button>
                    {
                        isCreateClicked && (
                            <div className="bg-white absolute z-10 w-full left-0 px-1 py-2 border-[1px] border-[#C3C6CF] rounded-[8px]   ">
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
                  </div>

        </div>
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
      
    </nav>
  );
};

export default Navbar;
