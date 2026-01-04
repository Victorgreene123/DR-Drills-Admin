import React, { useEffect, useRef, useState } from "react";
import badge from "../assets/bxs_badge.png";

import thumbnail from "../assets/thumbnail-1.png";

import PreviewQuizOverlay from "./PreviewQuizOverlay";
import { useApi } from "../hooks/useApi";
import QuizDetailsPanel from "./quizdetails";

interface QuizzesTableProps {
  data: Array<Record<string, any>>;
  ids: string[];
  tableheads: string[];
  currentPage: number; // ✅ controlled from parent
  totalPages: number; // ✅ from API
  onPageChange: (page: number) => void; // ✅ parent handles pagination
  rowsPerPage?: number;
  renderCell?: Record<string, (row: Record<string, any>) => React.ReactNode>;
}

const QuizzesTable: React.FC<QuizzesTableProps> = ({
  data,
  ids,
  tableheads,
  currentPage,
  totalPages,
  onPageChange,
  // rowsPerPage = 10,
  renderCell = {},
}) => {
  const [details, setDetails] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any []>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);


  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>();
  const [showPreview, setShowPreview] = useState(false);
  const {apiFetch }= useApi()

  // ✅ Pagination is now controlled externally
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
const fetchQuizDetails = async (id: any) => {
  try {
    setLoadingDetails(true);
    const res = await apiFetch(`/api/admin/quiz/details/${id}`);
    const data = await res.json();
    setDetails(data?.data);

  } catch (error) {
    console.error("An error has occurred");
  } finally {
    setLoadingDetails(false);
  }
};

const fetchLeaderboard = async (id: any) => {
  try {
    // setLoadingDetails(true);
    const res = await apiFetch(`/api/admin/quiz/leaderboard/${id}`);
    const data = await res.json();
    console.log(data)
    setLeaderboard(data?.data.leaderboard);
  } catch (error) {
    console.error("An error has occurred");
  } 
}

const menuRef = useRef<HTMLDivElement | null>(null);
    
    
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsDetailsShown(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);






  // {
  //   "success": true,
  //   "data": {
  //       "id": 12,
  //       "title": "Robbins Pathology Review Quiz 12",
  //       "description": "Practice quiz for medical students",
  //       "time_allowed": 45,
  //       "question_type": "multiple_choice",
  //       "passing_score": 80,
  //       "mode": "exam",
  //       "thumbnail": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300",
  //       "date_from": null,
  //       "date_to": null,
  //       "negative_marking": 0,
  //       "question_count": 10,
  //       "date": null,
  //       "source": null,
  //       "premium": 0,
  //       "is_draft": 0,
  //       "is_active": 1,
  //       "created_at": "2025-09-15T11:23:17.000Z",
  //       "updated_at": "2025-09-15T11:23:17.000Z",
  //       "block_name": "Medical Quiz Block 2",
  //       "block_id": 2,
  //       "creator_firstname": "Astrid",
  //       "creator_surname": "Kuhn",
  //       "actual_question_count": 11,
  //       "total_attempts": 7,
  //       "average_score": "60.0000",
  //       "tags": [
  //           {
  //               "id": 4,
  //               "name": "anatomy"
  //           },
  //           {
  //               "id": 6,
  //               "name": "pharmacology"
  //           }
  //       ],
  //       "schools": [
  //           {
  //               "id": 2,
  //               "name": "Johns Hopkins School of Medicine"
  //           },
  //           {
  //               "id": 9,
  //               "name": "Ahmadu Bello University College of Medicine"
  //           }
  //       ],
  //       "courses": [
  //           {
  //               "course_id": 10,
  //               "course_name": "Pediatrics"
  //           }
  //       ],
  //       "topics": [],
  //       "user_attempts": [],
  //       "preview_questions": [
  //           {
  //               "id": 108,
  //               "text": "Which structure passes through the foramen ovale?",
  //               "question_type": "multiple_choice",
  //               "image_url": null,
  //               "points": 4,
  //               "explanation": "Cicuta debitis pariatur. Perferendis ciminatio tres curtus caecus atque crebro animadverto.",
  //               "year": null,
  //               "order": 1,
  //               "options": [
  //                   {
  //                       "id": 241,
  //                       "option_text": "Option A",
  //                       "order": 1
  //                   },
  //                   {
  //                       "id": 242,
  //                       "option_text": "Option B",
  //                       "order": 2
  //                   },
  //                   {
  //                       "id": 243,
  //                       "option_text": "Option C",
  //                       "order": 3
  //                   },
  //                   {
  //                       "id": 244,
  //                       "option_text": "Option D",
  //                       "order": 4
  //                   },
  //                   {
  //                       "id": 245,
  //                       "option_text": "Option E",
  //                       "order": 5
  //                   }
  //               ]
  //           },
  //           {
  //               "id": 109,
  //               "text": "Which muscle is the primary flexor of the forearm?",
  //               "question_type": "multiple_choice",
  //               "image_url": null,
  //               "points": 4,
  //               "explanation": "Benevolentia et ocer. Agnosco xiphias clamo abeo vulgo.",
  //               "year": null,
  //               "order": 2,
  //               "options": [
  //                   {
  //                       "id": 246,
  //                       "option_text": "Option A",
  //                       "order": 1
  //                   },
  //                   {
  //                       "id": 247,
  //                       "option_text": "Option B",
  //                       "order": 2
  //                   },
  //                   {
  //                       "id": 248,
  //                       "option_text": "Option C",
  //                       "order": 3
  //                   },
  //                   {
  //                       "id": 249,
  //                       "option_text": "Option D",
  //                       "order": 4
  //                   },
  //                   {
  //                       "id": 250,
  //                       "option_text": "Option E",
  //                       "order": 5
  //                   }
  //               ]
  //           },
  //           {
  //               "id": 110,
  //               "text": "Which muscle is the primary flexor of the forearm?",
  //               "question_type": "multiple_choice",
  //               "image_url": null,
  //               "points": 1,
  //               "explanation": "Cupio adamo capio saepe quo debeo. Tollo vado combibo consuasor vilitas demonstro calco.",
  //               "year": null,
  //               "order": 3,
  //               "options": [
  //                   {
  //                       "id": 251,
  //                       "option_text": "Option A",
  //                       "order": 1
  //                   },
  //                   {
  //                       "id": 252,
  //                       "option_text": "Option B",
  //                       "order": 2
  //                   },
  //                   {
  //                       "id": 253,
  //                       "option_text": "Option C",
  //                       "order": 3
  //                   },
  //                   {
  //                       "id": 254,
  //                       "option_text": "Option D",
  //                       "order": 4
  //                   },
  //                   {
  //                       "id": 255,
  //                       "option_text": "Option E",
  //                       "order": 5
  //                   }
  //               ]
  //           }
  //       ],
  //       "user_has_access": true
  //   }
// }




  return (
    <div className="overflow-x-auto">
      <table className="w-full my-4 text-left text-sm text-[#1A1C1E] border-collapse">
        <thead className="bg-[#F2F3FA] text-[#73777F] text-[15px] font-medium">
          <tr>
            {tableheads.map((head, idx) => (
              <th
                key={idx}
                className="px-4 py-2 border-r border-[#73777F] last:border-r-0 whitespace-nowrap"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={ids[rowIdx] || rowIdx}
              className={
                rowIdx % 2 === 0
                  ? "cursor-pointer bg-white "
                  : "cursor-pointer bg-[#FAFAFA] hover:bg-[#F0F0F0] transition"
              }
onClick={() => {
  setSelectedQuiz(row["id"]);
  setDetails(null); // ✅ Clear previous quiz data
  setIsDetailsShown(true);
  fetchQuizDetails(row["id"]);
  fetchLeaderboard(row["id"]);
}}


            >
              {ids.map((id, colIdx) => (
                <td
                  key={colIdx}
                  className="px-4 py-3 border-r border-[#E0E0E0] last:border-r-0 whitespace-nowrap hover:text-[#004883]"
                >
                  {renderCell[id]
                    ? renderCell[id](row)
                    : row[id] ?? "--"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Updated Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 px-4">
        <div className="flex flex-wrap gap-2">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === page
                  ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {isDetailsShown && (
  <QuizDetailsPanel
    id={selectedQuiz}
    data={data}
    details={details}
    loadingDetails={loadingDetails}
    onClose={() => setIsDetailsShown(false)}
    onPreview={() => setShowPreview(true)}
    badge={badge}
    thumbnail={thumbnail}
    leaderboard={leaderboard}
        ref={menuRef}
  />  
)}

{showPreview && (
      <div className="w-auto" >

      
        <PreviewQuizOverlay onClose={() => setShowPreview(false)}  data={details?.questions} />
          </div>
      )}

    </div>
  );
};

export default QuizzesTable;
