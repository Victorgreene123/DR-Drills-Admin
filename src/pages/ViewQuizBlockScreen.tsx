import React, { useEffect, useState } from "react";
// import Stats from "../components/stats";
import { useLocation, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import AddQuizzesToBlockModal from "../components/quizblocks/AddQuizzesToBlockModal";
import { formatReadableDate } from "../utils/formatDate";
import { useApi } from "../hooks/useApi";
import { LoadingAnimation } from "./QuizBlocksScreen";





interface Quiz {
  id: number;
  title: string;
  description: string;
  quiz_block_id: number;
  time_allowed: number;
  question_type: string;
  passing_score: number;
  mode: string;
  thumbnail: string;
  date_from: string | null;
  date_to: string | null;
  negative_marking: number;
  question_count: number;
  date: string | null;
  source: string | null;
  is_draft: number;
  premium: number;
  created_by: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  course_name: string;
  topic_name: string;
  attempt_count: number;
}

type QuizBlock = Quiz[]


const ViewQuizBlockScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // state={{ title: block.title, quizzesCount: block.quizzesCount, tags: block.tags }}
  // Retrieve state from navigation (if passed via react-router's location.state)
    const location = useLocation();
    const navigationState = location.state as { title?: string; quizzesCount?: number; tags: string[] } | null;
  const [quizBlock ,setQuizBlock] = useState<QuizBlock>()



    const {apiFetch} = useApi()
    const [loading, setLoading] = useState(true)
  
    const fetchBlockDetails = async () => {
        try {
          const res = await apiFetch(`/api/admin/quiz-block/${id}`)
          const result = await res.json();
        if (res.status !== 200) {
          throw new Error('Failed to fetch lecture block');
        }
        const {data } = result
        setQuizBlock(data)
  
        } catch (error: any) {
          console.error("An Error Occured" , error)
        }
        finally{
          setLoading(false)
        }
    }

  const [showPopup , setShowPopup] = useState(false);
  const [selected , setSelected] = useState<any[]>([]); // selected quizzes for the modal
  const closePopup = () => {
    setShowPopup(false)
  }

    useEffect(() => {
      fetchBlockDetails()
    }, [])
  
    if (loading){
      return <LoadingAnimation />
    }
  
    if (!quizBlock && !loading) {
      return <div className="p-6">Quiz block not found.</div>;
    }

  



  return (
    <div className="p-6">
      <div className="flex items-start w-full justify-between">
             <div className="w-[50%]">
              <div className="text-sm text-[#0360AB] mb-2">Quizzes / Quiz Blocks</div>
      <div className="font-semibold text-2xl mb-2">{navigationState?.title}</div>
      <div className="text-[#73777F] mb-2">
        {navigationState?.title}
      </div>
      <div className="flex items-center gap-2 mb-2">
        {/* <span className="rounded-full bg-[#F2F3FA] px-2 py-1 text-xs flex items-center gap-1">
          <span role="img" aria-label="avatar">{quizBlock.avatar}</span> {quizBlock.course}
        </span> */}
        <span className="text-xs text-[#73777F]">• {navigationState?.quizzesCount} quizzes</span>
      </div>
      <hr className="text-[#c3c6cf] my-2"/>
      <div className="flex flex-wrap gap-2 mb-4">
        {navigationState?.tags.map(tag => (
          <span key={tag} className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 mt-3">
        <button className="bg-[#D4E3FF] border-[1px] border-[#004883]  text-[#004883] px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => setShowPopup(true)}>
          Add Quizzes 
          <FaPlus />
        </button>


        
      </div>

        
        
      </div> 
          {/* <Stats value={quizBlock.totalVisits} label="Total Visits" /> */}

      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full  rounded">
          <thead>
            <tr className="bg-[#F2F3FA] text-[#73777F] text-sm">
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F] ">Quiz Title</th>
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F]">Course</th>
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F]">Source</th>
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F]">Type</th>
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F]">Questions</th>
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F]">Date</th>
              <th className="px-4 py-2 text-left">Visibility</th>
            </tr>
          </thead>
          <tbody className="py-2">
            {quizBlock?.map(q => (
              <tr key={q.id} className="border-b border-b-[#c3c6cf] last:border-b-0">
                <td className="px-2 py-2">{q.title}</td>
                <td className="px-4 py-2">{q.course_name}</td>
                <td className="px-2 py-2">{q.source}</td>
                <td className="px-4 py-2">{q.question_type}</td>
                <td className="px-4 py-2">{q.question_count}</td>
                <td className="px-4 py-2">{formatReadableDate(q.created_at) }</td>
                <td className="px-4 py-2">{q.is_draft ? "Draft" : "Public"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        showPopup && (
          <AddQuizzesToBlockModal
            onClose={() => closePopup()}
            selected={selected}
            setSelected={setSelected}
          />
        )
      }
    </div>
  );
};

export default ViewQuizBlockScreen;
