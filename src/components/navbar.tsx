import React from 'react';
// import { Link } from 'react-router-dom';
import logo from '../assets/favicon.svg'
import { FiMessageSquare } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";


const Navbar: React.FC = () => {
  return (
    <nav className="bg-white h-[52px] border-[1px] px-3 border-[#C3C6CF] flex items-center">
      <div className='w-[15%]  h-full flex items-center '>
      <img src={logo} alt="" className=''/>

      </div>
      <div className='w-[85%]  h-full px-6 flex items-center justify-between'>
        <p className='text-[#73777F]'>Dashboard / Analytics</p>
        <div className='flex gap-3'>
            <div className='w-[320px] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] '>
                <IoSearch  className='mx-2 text-[#0F172A] opacity-50 '/>
                <input type="text" className='w-full flex items-center outline-none border-none  pl-8 rounded-[8px] h-full absolute top-0  text-[14px] text-[#73777F]' placeholder='Search for Content or User' />
            </div>
            <div className='text-[#0360AB] bg-[#ECEDF4] rounded-[8px] px-2 flex items-center gap-1'>
                <FiMessageSquare  className='text-xl'/>
                <span>User Feedback</span>
                <span className='bg-[#B3261E] w-4 h-4 text-white flex items-center justify-center rounded-full text-[12px]'>
                    3
                </span>

            </div>

        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
