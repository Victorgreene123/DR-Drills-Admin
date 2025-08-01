import React from 'react';
import AllLectures from '../components/allLectures';
import LectureBanks from '../components/lectureBanks';
import LectureBlocks from '../components/lectureBlocks';

const Lectures: React.FC = () => {
      const [view, setView] = React.useState(1);

      const renderView = () =>{
            switch (view) {
                case 1:
                    return(
                        <AllLectures />
                    )
                    
                    break;
                case 2:
                    return (
                        <LectureBanks/>
                    )
                    break;
                case 3:
                    return (
                        <LectureBlocks />
                    )
                    break;
            
                default:
                    break;
            }
      }
    
    return (
        <div>
               <h1 className="text-3xl font-bold mb-6 text-[#004883]">Lectures</h1>
                 <div className="border-b-[1px] my-3 border-[#C3C6CF] flex  w-[64%] justify-between items-center">
                   <div className="flex items-center">
                     <div
                       className={`text-[16px] cursor-pointer font-[500] p-2 px-3 ${
                         view === 1
                           ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                           : " text-[#73777F] bg-white "
                       } `}
                       onClick={() => setView(1)}
                     >
                       All Lectures
                     </div>
                     <div
                       className={`text-[16px] cursor-pointer  p-2 px-3 font-[500] ${
                         view === 2
                           ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                           : " text-[#73777F] bg-white "
                       } `}
                       onClick={() => setView(2)}
                     >
                       Lecture Banks
                     </div>
                     <div
                       className={`text-[16px] cursor-pointer  p-2 px-3 font-[500] ${
                         view === 3
                           ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                           : " text-[#73777F] bg-white "
                       } `}
                       onClick={() => setView(3)}
                     >
                       Lecture Blocks
                     </div>
                   </div>
           
                 
                  
                 </div>

                 
                   

                <div className="space-y-3">

                    {
                        renderView()
                    }

                </div>

                 
        </div>
    );
};

export default Lectures;