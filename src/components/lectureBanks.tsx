import React, { useState } from "react";
import thumbnailmain from "../assets/thumbnail-main.jpg";
import { FaPlus } from "react-icons/fa";
import AddLectures from "./popups/AddLecturePopup";
import CreateLectureBankPopup from "./popups/CreateLectureBankPopup";
const LectureBanks:React.FC = () => {

    const [selectedBank, setSelectedBank] = React.useState<number | null>(1);

    const [isOpen, setIsOpen] = React.useState(false);
    const [isCreateLectureClicked , setIsCreateLectureClicked]= useState(false)


    const AllLectures = [
      { id: 1, title: "Introduction to Anatomy", thumbnail: thumbnailmain },
      { id: 2, title: "Skeletal System Overview", thumbnail: thumbnailmain },
      { id: 3, title: "Muscular System Basics", thumbnail: thumbnailmain },
      { id: 4, title: "Cardiovascular System", thumbnail: thumbnailmain },
      { id: 5, title: "Nervous System Fundamentals", thumbnail: thumbnailmain },
      { id: 6, title: "Digestive System Overview", thumbnail: thumbnailmain },
      { id: 7, title: "Respiratory System Basics", thumbnail: thumbnailmain },
      { id: 8, title: "Endocrine System Essentials", thumbnail: thumbnailmain },
      { id: 9, title: "Reproductive System Overview", thumbnail: thumbnailmain },
      { id: 10, title: "Urinary System Basics", thumbnail: thumbnailmain },
      { id: 11, title: "Integumentary System Essentials", thumbnail: thumbnailmain },
      { id: 12, title: "Lymphatic System Overview", thumbnail: thumbnailmain }
    ];
const [lectureBanksAndDetails, setLectureBanksAndDetails] = useState( [
  {
    id: 1,
    thumbnail: thumbnailmain,
    name: "Anatomy Lecture Bank",
    description: "A comprehensive collection of anatomy lectures covering all major systems. Includes detailed diagrams and 3D models.",
    lectures: [
      { id: 1, title: "Introduction to Anatomy", thumbnail: thumbnailmain },
      { id: 2, title: "Skeletal System Overview", thumbnail: thumbnailmain },
      { id: 3, title: "Muscular System Basics", thumbnail: thumbnailmain },
    ],
    course: "Anatomy",
    tags: ["Anatomy", "Skeletal System", "Muscular System"]
  },
  {
    id: 2,
    thumbnail: thumbnailmain,
    name: "Physiology Lecture Bank",
    description: "A detailed collection of physiology lectures focusing on body functions and processes. Includes interactive quizzes.",
    lectures: [
      { id: 4, title: "Cardiovascular System", thumbnail: thumbnailmain },
      { id: 5, title: "Nervous System Fundamentals", thumbnail: thumbnailmain },
      { id: 6, title: "Digestive System Overview", thumbnail: thumbnailmain },
    ],
    course: "Physiology",
    tags: ["Physiology", "Cardiovascular", "Nervous System"]
  },
  {
    id: 3,
    thumbnail: thumbnailmain,
    name: "Biochemistry Lecture Bank",
    description: "An extensive collection of biochemistry lectures covering metabolic pathways and biochemical processes.",
    lectures: [
      { id: 7, title: "Respiratory System Basics", thumbnail: thumbnailmain },
      { id: 8, title: "Endocrine System Essentials", thumbnail: thumbnailmain },
      { id: 9, title: "Reproductive System Overview", thumbnail: thumbnailmain },
    ],
    course: "Biochemistry",
    tags: ["Biochemistry", "Metabolism", "Biochemical Processes"]
  },
  {
    id: 4,
    thumbnail: thumbnailmain,
    name: "Advanced Anatomy Lecture Bank",
    description: "An advanced collection of anatomy lectures with in-depth analysis and case studies.",
    lectures: [
      { id: 10, title: "Urinary System Basics", thumbnail: thumbnailmain },
      { id: 11, title: "Integumentary System Essentials", thumbnail: thumbnailmain },
      { id: 12, title: "Lymphatic System Overview", thumbnail: thumbnailmain },
    ],
    course: "Advanced Anatomy",
    tags: ["Advanced Anatomy", "Case Studies", "In-Depth Analysis"]
  },
  {
    id: 5,
    thumbnail: thumbnailmain,
    name: "Pharmacology Lecture Bank",
    description: "Covers the fundamentals of pharmacology, drug actions, and clinical uses.",
    lectures: [
      { id: 13, title: "Introduction to Pharmacology", thumbnail: thumbnailmain },
      { id: 14, title: "Antibiotics Overview", thumbnail: thumbnailmain },
      { id: 15, title: "Cardiovascular Drugs", thumbnail: thumbnailmain },
    ],
    course: "Pharmacology",
    tags: ["Pharmacology", "Drugs", "Clinical Use"]
  },

]);


const addToLectureBank = (ids: number[]) => {
  console.log("Adding");

  setLectureBanksAndDetails(prevBanks => {
    return prevBanks.map(bank => {
      if (bank.id === selectedBank) {
        const newLecturesToAdd = ids
          .map(id => AllLectures.find(l => l.id === id))
          .filter(Boolean) as { id: number, title: string, thumbnail: string }[];

        const updatedLectures = [...bank.lectures, ...newLecturesToAdd];

        return { ...bank, lectures: updatedLectures };
      }
      return bank;
    });
  });
};


    const renderLectureBankDetails = () => {
        if (selectedBank === null) return null;
        const bank = lectureBanksAndDetails.find(b => b.id === selectedBank);
        if (!bank) return null;

        return (
            <div className="pt-4  px-1 bg-white ">
                <div className="flex items-start gap-4">
                    <img src={bank.thumbnail} alt={bank.name} className="w-[150px] h-[92px]  object-cover rounded-md mb-4" />
                <h2 className="text-[20px] font-semibold mb-2">{bank.name}</h2>
                </div>
                <p className="text-[#49454F] text-[12px] my-2">{bank.description}</p>
                <p className="text-[#334155] text-[14px] flex gap-2 mb-2">
                    {bank.course}
                    {"  .  "} 
                    {bank.lectures.length} Lectures

                </p>
                <div className="flex gap-2 mb-2">
                   
                    {bank.tags.map((tag, index) => (
                        <span key={index} className="bg-[#ECEDF4] text-[#43474E] p-1 rounded-md text-[12px]">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-start gap-5 mb-4">
                    <h3 className="text-[14px] font-[500] text-[#1A1C1E] mb-2">Lectures </h3>
                    <button className=' flex  text-[#0360AB] text-[14px]  flex items-center justify-center' onClick={() => {
                                    setIsOpen(true);
                                    
                                    console.log("PopUp initiated")
                    
                                }}>
                                    <FaPlus className='mr-2' />
                                    Add Lecture
                                    </button>
                </div>
                <div className="flex-col space-y-1">
                    {bank.lectures.map(lecture => (
                        <div key={lecture.id} className=" flex items-start gap-3 ">
                            <img src={lecture.thumbnail} alt={lecture.title} className="w-[120px] h-[75px] object-cover rounded-md mb-2" />
                            <h3 className="text-[14px] font-regular">{lecture.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderLectureBankList = () => {   
        return (
            <div className="bg-white ">
              
                <ul className="space-y-1">
                    {lectureBanksAndDetails.map(bank => (
                        <li
                            key={bank.id}
                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${selectedBank === bank.id ? "bg-[#F2F3FA]" : ""}`}
                            onClick={() => setSelectedBank(bank.id)}
                        >
                            <div className="flex items-center gap-3">
                                <img src={bank.thumbnail} alt={bank.name} className="w-[70px] h-[40px] object-cover rounded-md" />
                                <span className="text-[15px] text-black font-[400]">{bank.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return (
        <div className="w-full">



           <div className="flex items-start gap-[5%] mb-4">

                {/* Left SECTION - Lectur Bank List  */}
                <div className="w-[42.5%]">
                        <button className='bg-[#0360AB] flex  text-white rounded-md  h-[32px] flex items-center px-2  my-2' onClick={() => {
                                    setIsCreateLectureClicked(true);
                                    console.log("PopUp initiated")
                    
                                }}>
                                    <FaPlus className='mr-1' />
                                    New

                                    </button>
                    
                    {
                        renderLectureBankList()
                    }
                </div>

                {/* Right SECTION - Lecture Bank Details */}
                <div className="w-[52.5%]">
                    {renderLectureBankDetails()}
                </div>

           </div>

           {
            isOpen && <AddLectures isOpen={isOpen} onClose={() => setIsOpen(false)} onAdd={addToLectureBank}/>
           }

           {
            isCreateLectureClicked && <CreateLectureBankPopup onClose={() => setIsCreateLectureClicked(false)} />
           }

        </div>
    )
}

export default LectureBanks