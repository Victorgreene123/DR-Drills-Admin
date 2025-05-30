import React, { useState } from 'react';
import thumbnail1 from '../../assets/thumbnail-1.png';
import thumbnail2 from '../../assets/thumbnail-2.png';
import { LiaTimesSolid } from 'react-icons/lia';

import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';

import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

type Lecture = {
	id: number;
	title: string;
	thumbnail: string;
};

interface SelectLecturePopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectLecture: (lecture: string , lectureid: any) => void;
}

const mockLectures: Lecture[] = [
	{
		id: 1,
		title: 'Anatomical Naming conventions, Planes and Axes',
		thumbnail: thumbnail1
	},
	{
		id: 2,
		title: 'Anatomical Naming conventions, Planes and Axes',
		thumbnail: thumbnail1
	},
	{
		id: 3,
		title: 'Anatomical Naming conventions, Planes and Axes',
		thumbnail: thumbnail1
	},
	{
		id: 4,
		title: 'The Lecture bank/Playlist Title. (should be truncated if the title goes too long)',
		thumbnail: thumbnail2
	},
	{
		id: 5,
		title: 'The Lecture bank/Playlist Title. (should be truncated if the title goes too long)',
		thumbnail: thumbnail2
	},
	{
		id: 6,
		title: 'The Lecture bank/Playlist Title. (should be truncated if the title goes too long)',
		thumbnail: thumbnail1
	},
	{
		id: 7,
		title: 'Anatomical Naming conventions, Planes and Axes',
		thumbnail: thumbnail2
	}
];

const SelectLecturePopup: React.FC<SelectLecturePopupProps> = ({ isOpen, onClose, onSelectLecture }) => {
	const [selectedLectures, setSelectedLectures] = useState<number[]>([]);
	const [search, setSearch] = useState<string>('');

    const [sortOrder , setSortOrder] = useState(1)
    

	if (!isOpen) return null;

	const toggleLecture = (id: number) => {
		setSelectedLectures((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const filteredLectures = mockLectures.filter((lecture) =>
		lecture.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1100]">

			<div className="bg-white max-w-5xl w-full h-[600px] rounded-xl  relative flex flex-col">
				{/* Header */}
				<div className="flex justify-between items-center border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2">
					<h2 className="text-[18px] text-[#1A1C1E] font-semibold">Select Lecture</h2>
				    <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
                            aria-label="Close"
                          >
                            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
                          </button>
				</div>
				{/* Content */}
				<div className="flex flex-1 h-0  p-4">
					{/* Left Section */}
					<div className="w-1/2 pr-4 border-r-[1px] border-[#C3C6CF] flex flex-col">
						<div className="space-y-3 mb-3">
							

                            <div className='w-full relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[35px] '>
                                            <IoSearch  className='mx-2 text-xl text-[#0F172A] opacity-50 '/>
                                            <input type="text" className='w-full flex items-center outline-none border-none  pl-8 rounded-[8px] h-full absolute top-0  text-[14px] text-[#73777F]'
                                           placeholder="Search for Lectures"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
                                             />
                                        </div>

                                        <div className='flex items-center justify-between gap-2 ml-2'>
                                            <div className='flex items-center gap-2'>
                                                   <div className='flex items-center gap-2 text-[#73777F] text-[16px]'>
                                                <IoFilterOutline  className=' '/>
                                            <p>Filter</p> 
                                            </div>

                                            <p className='text-[#0360AB] bg-[#D4E3FF] px-2 py-1 rounded-[4px]'>
                                                Last modified
                                            </p>

                                            <p className='text-[#0360AB] bg-[#D4E3FF] px-2 py-1 rounded-[4px]'>
                                                Pharmacology
                                            </p>
                                            </div>

                                           {
                                            sortOrder === 1 ? (
                                                <FaArrowDown  onClick={()  => setSortOrder(0)}/>
                                            ) : (<FaArrowUp onClick={()  => setSortOrder(1)}/>)
                                           }
                                            



                                         


                                           

                                        </div>
						</div>
						<div
							className="overflow-y-auto flex-1 pr-2 border-t-[1px] border-[#C3C6CF] "
							style={{ maxHeight: 450 }}
						>
							{filteredLectures.map((lecture) => (
								<div
									key={lecture.id}
									className="flex items-center gap-3 py-2 "
								>
									{/* <Checkbox
  checked={selectedLectures.includes(lecture.id)}
  onChange={() => toggleLecture(lecture.id)}
/> */}
    {
        selectedLectures.includes(lecture.id) ? (
            <MdCheckBox className='text-[#0360AB] text-[28px]' 
            onClick={() => toggleLecture(lecture.id)}

            />): 
             (<MdCheckBoxOutlineBlank className='  bg-white text-[28px]' 
onClick={() => toggleLecture(lecture.id)}
             
             />)
    }
       

{selectedLectures.includes(lecture.id) && (
  <svg
    className="absolute left-0 top-0 w-4 h-4 pointer-events-none"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4 8.5L7 11.5L12 5.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)}

									<img
										src={lecture.thumbnail}
										alt="thumb"
										className="w-[82px] h-[47px] rounded"
									/>
									<span className="truncate w-full text-sm">
										{lecture.title}
									</span>
								</div>
							))}
							{filteredLectures.length === 0 && (
								<div className="text-center text-gray-400 py-8">
									No lectures found.
								</div>
							)}
						</div>
					</div>
					{/* Right Section */}
					<div className="w-1/2 pl-4 flex flex-col">
						<h3 className="text-[18px] font-semibold mb-2">
							Selected Lecture</h3>
                            
                            <p className='text-[#0360AB] text-[16px] '> {selectedLectures.length}{' '}
							{selectedLectures.length === 1 ? 'Lecture' : 'Lectures'} selected
                            </p>
						
						<div
							className="overflow-y-auto flex-1 pr-2"
							style={{ maxHeight: 500 }}
						>
							{selectedLectures.map((id) => {
								const lecture = mockLectures.find((l) => l.id === id);
								if (!lecture) return null;
								return (
									<div
										key={id}
										className="flex items-center gap-3 py-2 "
									>
										<MdCheckBox className='text-[#0360AB] text-[28px]' 
            // onClick={() => toggleLecture(lecture.id)}

            />
										<img
											src={lecture.thumbnail}
											alt="thumb"
											className="w-[82px] h-[47px] rounded"
										/>
										<span className="truncate w-full text-sm">
											{lecture.title}
										</span>
									</div>
								);
							})}
							{selectedLectures.length === 0 && (
								<div className="text-center text-gray-400 py-8">
									No lecture selected.
								</div>
							)}
						</div>
					</div>
				</div>
				{/* Footer */}
				<div className="flex border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2 justify-end gap-2 mt-4">
					<button
						className=" px-4 py-2 rounded text-sm bg-[#D4E3FF]"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="bg-[#0360AB] text-white px-4 py-1 rounded text-sm"
						onClick={() => {
							// Pass the first selected lecture's title (or empty string if none)
							const lecture = mockLectures.find(l => l.id === selectedLectures[0]);
							onSelectLecture(lecture ? lecture.title : "" , lecture?.id);
						}}
					>
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

export default SelectLecturePopup;