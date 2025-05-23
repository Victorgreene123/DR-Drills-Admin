import React from 'react';
import Stats from '../components/stats';
import { IoSearch } from 'react-icons/io5';
import Dropdown from '../components/dropdown';




const Quizzes: React.FC = () => {
    return (
        <div >

            <div className='space-y-4'>
            <h1 className='text-[#004883] font-[500] text-[24px]'>Quizzes</h1>
            <div className='border-b-[1px] border-[#C3C6CF] flex  w-[70%] '>
                <div className="text-[16px] text-[#1A1C1E] font-[500] bg-[#F2F3FA] border-b-[2px] border-[#0360AB] p-2 px-3" >
                    All Quizzes
                </div>
                <div className="text-[16px] text-[#73777F] font-[500] bg-white   p-2 px-3">
                    Quiz Blocks
                </div>
            </div>

            </div>
            <div className='space-y-4 mt-4'>
                <div className='flex gap-4 mt-4'>
                    <Stats value="3,200,000,000" label="Questions Uploaded" />
                    <Stats value="320" label="Quizzes Uploaded " />
                    <Stats value="3,200,000,000" label="Quiz Blocks" />
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2 w-full">
                    <div className='w-full sm:w-[27%] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] max-w-xs'>
                        <IoSearch className='mx-2 text-[#0F172A] opacity-50' />
                        <input
                            type="text"
                            className='w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]'
                            placeholder='Search for Content or User'
                        />
                    </div>
                    <div className="w-auto flex items-center">
                        <Dropdown defaultValue='All' options={["First 20", "First 50"]} />
                        <Dropdown defaultValue='Active' options={["First 20", "First 50"]} />
        <button className="bg-[#F2F3FA] border-[1px] border-[#C3C6CF]  rounded-[8px] w-[73px] h-[32px] text-[#43474E] flex items-center justify-between  px-2 gap-3 ">
            Clear
        </button>
                    </div>


                </div>
             </div>
        </div>
    );
};

export default Quizzes;