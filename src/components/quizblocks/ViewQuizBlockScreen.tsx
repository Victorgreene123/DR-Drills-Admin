import React from "react";
import Stats from "../stats";

const quizzes = [
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
  // ...repeat as needed
];

const ViewQuizBlockScreen: React.FC = () => {
  return (
    <div className="p-6">
      <div className="text-sm text-[#0360AB] mb-2">Quizzes / Quiz Blocks</div>
      <div className="font-semibold text-2xl mb-2">Practice physiology with these</div>
      <div className="text-[#73777F] mb-2">
        Learn every detail about the Musculoskeletal system ,from the anatomy, the physiology, the way digestive
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="rounded-full bg-[#F2F3FA] px-2 py-1 text-xs flex items-center gap-1">
          <span role="img" aria-label="avatar">👩‍⚕️</span> Anatomy
        </span>
        <span className="text-xs text-[#73777F]">• 5 quizzes</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">Upper limb</span>
        <span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">Axilla</span>
        <span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">Blood supply of the upper limb</span>
        <span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">Shoulder</span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <button className="bg-[#0360AB] text-white px-4 py-2 rounded flex items-center gap-2">
          Add Quizzes +
        </button>
        <div className="ml-auto">
          <Stats value="32,400" label="Total Visits" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-[#F2F3FA] text-[#73777F] text-sm">
              <th className="px-4 py-2 text-left">Quiz Title</th>
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Questions</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Visibility</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map(q => (
              <tr key={q.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{q.title}</td>
                <td className="px-4 py-2">{q.course}</td>
                <td className="px-4 py-2">{q.source}</td>
                <td className="px-4 py-2">{q.type}</td>
                <td className="px-4 py-2">{q.questions}</td>
                <td className="px-4 py-2">{q.year}</td>
                <td className="px-4 py-2">{q.visibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewQuizBlockScreen;
