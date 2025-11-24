import React, { useState } from "react";
import Stats from "../components/stats";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import AddQuizzesToBlockModal from "../components/quizblocks/AddQuizzesToBlockModal";

const quizzes = [
  {
    id: 1,
    title: "Practice physiology with these",
    description: "Learn every detail about the Musculoskeletal system, from the anatomy, the physiology, the way digestive",
    avatar: "👩‍⚕️",
    course: "Anatomy",
    quizzesCount: 5,
    tags: ["Upper limb", "Axilla", "Blood supply of the upper limb", "Shoulder"],
    totalVisits: "32,400",
    quizzes: [
      {
        id: 1,
        title: "Introductory medical anatomy student first middle semester incourse objecti...",
        course: "Anatomy",
        source: "University of Lagos",
        type: "Multiple choice",
        questions: 305,
        year: 2015,
        visibility: "Draft",
      },
      {
        id: 2,
        title: "Physiology Final",
        course: "Physiology",
        source: "Harvard",
        type: "Essay",
        questions: 40,
        year: 2022,
        visibility: "Published",
      },
      {
        id: 3,
        title: "Pharmacology Midterm",
        course: "Pharmacology",
        source: "Oxford",
        type: "MCQ",
        questions: 30,
        year: 2024,
        visibility: "Published",
      },
    ],
  },
  {
    id: 2,
    title: "Learn with systems",
    description: "A block for system-based learning quizzes.",
    avatar: "🧑‍⚕️",
    course: "Physiology",
    quizzesCount: 3,
    tags: ["Systems", "Cardio", "Respiratory"],
    totalVisits: "12,000",
    quizzes: [
      {
        id: 4,
        title: "Cardio Quiz",
        course: "Physiology",
        source: "Stanford",
        type: "MCQ",
        questions: 50,
        year: 2023,
        visibility: "Published",
      },
      {
        id: 5,
        title: "Respiratory Quiz",
        course: "Physiology",
        source: "Yale",
        type: "Essay",
        questions: 35,
        year: 2021,
        visibility: "Draft",
      },
    ],
  },
  {
    id: 3,
    title: "New to Anatomy",
    description: "Start your anatomy journey here.",
    avatar: "📚",
    course: "Anatomy",
    quizzesCount: 2,
    tags: ["Intro", "Basics"],
    totalVisits: "8,500",
    quizzes: [
      {
        id: 6,
        title: "Anatomy Basics",
        course: "Anatomy",
        source: "MIT",
        type: "MCQ",
        questions: 25,
        year: 2023,
        visibility: "Published",
      },
    ],
  },
  // ...add more blocks as needed
];

const ViewQuizBlockScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const quizBlock = quizzes.find(qb => qb.id === Number(id));

  const [showPopup , setShowPopup] = useState(false);
  const [selected , setSelected] = useState<any[]>([]); // selected quizzes for the modal
  const closePopup = () => {
    setShowPopup(false)
  }

  if (!quizBlock) {
    return <div className="p-6">Quiz block not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-start w-full justify-between">
             <div className="w-[50%]">
              <div className="text-sm text-[#0360AB] mb-2">Quizzes / Quiz Blocks</div>
      <div className="font-semibold text-2xl mb-2">{quizBlock.title}</div>
      <div className="text-[#73777F] mb-2">
        {quizBlock.description}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="rounded-full bg-[#F2F3FA] px-2 py-1 text-xs flex items-center gap-1">
          <span role="img" aria-label="avatar">{quizBlock.avatar}</span> {quizBlock.course}
        </span>
        <span className="text-xs text-[#73777F]">• {quizBlock.quizzesCount} quizzes</span>
      </div>
      <hr className="text-[#c3c6cf] my-2"/>
      <div className="flex flex-wrap gap-2 mb-4">
        {quizBlock.tags.map(tag => (
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
          <Stats value={quizBlock.totalVisits} label="Total Visits" />

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
              <th className="px-4 py-2 text-left border-r-2 border-r-[#73777F]">Year</th>
              <th className="px-4 py-2 text-left">Visibility</th>
            </tr>
          </thead>
          <tbody className="py-2">
            {quizBlock.quizzes.map(q => (
              <tr key={q.id} className="border-b border-b-[#c3c6cf] last:border-b-0">
                <td className="px-2 py-2">{q.title}</td>
                <td className="px-4 py-2">{q.course}</td>
                <td className="px-2 py-2">{q.source}</td>
                <td className="px-4 py-2">{q.type}</td>
                <td className="px-4 py-2">{q.questions}</td>
                <td className="px-4 py-2">{q.year}</td>
                <td className="px-4 py-2">{q.visibility}</td>
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
