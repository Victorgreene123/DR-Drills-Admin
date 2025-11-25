import React, { useEffect, useRef, useState } from "react";
import badge from "../assets/bxs_badge.png";

import thumbnail from "../assets/thumbnail-1.png";

import PreviewQuizOverlay from "./PreviewQuizOverlay";
import { useApi } from "../hooks/useApi";
import QuizDetailsPanel from "./quizdetails";

interface SubscriptionsTableProps {
  data: Array<Record<string, any>>;
  ids: string[];
  tableheads: string[];
  currentPage?: number; // ✅ controlled from parent
  totalPages?: number; // ✅ from API
  onPageChange?: (page: number) => void;
  initialRowsPerPage?: number // ✅ parent handles pagination
  
  renderCell?: Record<string, (row: Record<string, any>) => React.ReactNode>;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  data,
  ids,
  tableheads,
  currentPage,
  totalPages = 1,
  onPageChange = () => console.log("Page Change"),
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

      
        <PreviewQuizOverlay onClose={() => setShowPreview(false)}  data={details?.preview_questions} />
          </div>
      )}

    </div>
  );
};

export default SubscriptionsTable;
