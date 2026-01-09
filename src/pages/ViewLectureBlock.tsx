import React, { useEffect, useState } from "react";
// import Stats from "../components/stats";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import blockPic from "../assets/Bank Picture.png"
import { useApi } from "../hooks/useApi";
import { LoadingAnimation } from "./QuizBlocksScreen";
import AddLectureBankPopUp from "../components/popups/AddLectureBankPopUp";


interface Lecture {
  id: number;
  name: string;
  description: string;
  created_by: number;
  is_public: number;
  school_id?: number;
  thumbnail: string | null;
  course_id: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  order?: number;
}

interface LectureBlock {
  id: number;
  name: string;
  description: string;
  created_by: number;
  is_public: number;
  course_id: number;
  thumbnail: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  banks?: Lecture[];
}

const ViewLectureBlockScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lectureBlock , setLectureBlock ] = useState<LectureBlock>()
  const {apiFetch} = useApi()
  const [loading, setLoading] = useState(true)

  const fetchBlockDetails = async () => {
      try {
        const res = await apiFetch(`/api/admin/lecture-block/${id}`)
        const result = await res.json();
      if (res.status !== 200) {
        throw new Error('Failed to fetch lecture block');
      }
      const {data } = result
      setLectureBlock(data)

      } catch (error: any) {
        console.error("An Error Occured" , error)
      }
      finally{
        setLoading(false)
      }
  }

  const [showPopup , setShowPopup] = useState(false);
   // selected quizzes for the modal
  const closePopup = () => {
    setShowPopup(false)
  }

  useEffect(() => {
    fetchBlockDetails()
  }, [])

  if (loading){
    return <LoadingAnimation />
  }

  if (!lectureBlock && !loading) {
    return <div className="p-6">Lecture block not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-start w-full justify-between">
             <div className="w-[50%]">
              <div className="text-sm text-[#0360AB] mb-2">Lectures / Lecture Blocks</div>

      <div className="font-semibold text-2xl mb-2">{lectureBlock?.name}</div>
      <div className="text-[#73777F] mb-2">
        {lectureBlock?.description}
      </div>
      <div className="flex items-center gap-2 mb-2">
        {/* <span className="rounded-full bg-[#F2F3FA] p-1 text-xs flex items-center gap-1"> */}
          <img src={lectureBlock?.thumbnail || ""}  className="w-12 h-12 object-cover rounded-full"/> 
        {/* </span> */}
        <span className="text-xs text-[#73777F]">• {lectureBlock?.banks?.length} Lectures</span>
      </div>
      <hr className="text-[#c3c6cf] my-2"/>
      <div className="flex flex-wrap gap-2 mb-4">
        {/* {quizBlock.tags.map(tag => (
          <span key={tag} className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">{tag}</span>
        ))} */}
        <p>No Tags Available yet</p>
      </div>

      <div className="flex items-center justify-between mb-4 mt-3">
        <button className="bg-[#D4E3FF] border-[1px] border-[#004883]  text-[#004883] px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => setShowPopup(true)}>
          Add Lectures or Lecture Banks 
          <FaPlus />
        </button>
    
      </div>



        
        
      </div> 
      <div className="space-y-3">
          {/* <Stats value={quizBlock.totalVisits} label="Question Uploaded" />
          <Stats value={quizBlock.totalVisits} label="Total Visits" /> */}
        
      </div>
          
      </div>

      <div className="overflow-x-auto flex gap-3">
        {
          lectureBlock?.banks?.map((item) => (
            <div className="w-[175px] flex-shrink-0 ">
            <img src={item.thumbnail || blockPic}   className="h-[115px] w-full rounded-md"></img>
            <h4 >{item.description}</h4>
        </div>
          )

          )
        }
         
      </div>

      {
        showPopup && id && (
          <AddLectureBankPopUp
          isOpen={showPopup}
          
          blockId={id}
          // onAdd={() => setSelected}
            onClose={() => closePopup()}
            // selected={selected}
            // setSelected={setSelected}
          />
        )
      }
    </div>
  );
};

export default ViewLectureBlockScreen;
