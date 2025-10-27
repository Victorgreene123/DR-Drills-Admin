import React, { useEffect, useState } from "react";
import thumbnailmain from "../assets/thumbnail-main.jpg";
import { FaPlus } from "react-icons/fa";
import AddLectures from "./popups/AddLecturePopup";
import CreateLectureBankPopup from "./popups/CreateLectureBankPopup";
import { useApi } from "../hooks/useApi";
import  { LoadingAnimation } from "../pages/QuizBlocksScreen";
const LectureBanks:React.FC = () => {

    const [selectedBank, setSelectedBank] = React.useState<number | null>(null);
          const { apiFetch } = useApi();
  
    const [isOpen, setIsOpen] = React.useState(false);
    const [isCreateLectureClicked , setIsCreateLectureClicked]= useState(false)

    const [isLoading, setIsLoading] = useState(true);
    const AllLectures = [
      { id: 1, title: "Introduction to Anatomy", thumbnail: thumbnailmain , description: "An overview of human anatomy covering basic concepts and terminology."},
      { id: 2, title: "Skeletal System Overview", thumbnail: thumbnailmain , description: "Detailed study of the human skeletal system, including bone structure and function."},
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
      { id: 1, title: "Introduction to Anatomy", thumbnail: thumbnailmain , description: "An overview of human anatomy covering basic concepts and terminology."},
      { id: 2, title: "Skeletal System Overview", thumbnail: thumbnailmain , description: "Detailed study of the human skeletal system, including bone structure and function."},
      { id: 3, title: "Muscular System Basics", thumbnail: thumbnailmain , description: "Introduction to the muscular system, muscle types, and their roles in movement."},
    ],
    course: "Anatomy",
    tags: ["Anatomy", "Skeletal System", "Muscular System"]
  },
  

]);

const loadBanks =  async () => {
    try {
      const res = await apiFetch("/api/admin/lecture-banks");
      const data = await res.json();

      if (!data.success){
        throw new Error('Unexpeccted Error Occured')
      }

      const {data: blocks} = data;
      const mappedBlocks = blocks.map((item: any , index: number) => {
          return {
              id: index,
              thumbnail: thumbnailmain,
              name : item.name,
              description: "A comprehensive collection of anatomy lectures covering all major systems. Includes detailed diagrams and 3D models.",
              lectures: item.data.map((lec: any) => ({
                  id: lec.id,
                  title: lec.name,
                  thumbnail: lec.thumbnail || thumbnailmain,
                  description: lec.description || "",
              })),
              course: item.course || "General",
              tags: item.tags || ["Anatomy", "Skeletal System", "Muscular System"],
          }
      })
      setLectureBanksAndDetails(mappedBlocks)
      setSelectedBank(mappedBlocks[0]?.id || null);
    } catch (error) {
      console.error("An Error Occures" , error)
    }
    finally{
      setIsLoading(false);
    }

}

useEffect(() => {
    loadBanks();
}
, []);


const addToLectureBank = (ids: number[]) => {
  console.log("Adding");

  setLectureBanksAndDetails(prevBanks => {
    return prevBanks.map(bank => {
      if (bank.id === selectedBank) {
        const newLecturesToAdd = ids
          .map(id => AllLectures.find(l => l.id === id))
          .filter(Boolean) as { id: number, title: string, thumbnail: string , description: string }[];

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
        console.log("Rendering details for bank:", bank);

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
                            <div>
                            <h3 className="text-[14px] font-regular">{lecture.title}</h3>
                            <p className="text-[#73777F] text-[12px]"> {lecture.description}</p>
                            </div>
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


        {
                                isLoading ? 
                      <LoadingAnimation />
                      
                      :
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

           }

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