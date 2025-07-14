import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import badge from "../assets/bxs_badge.png";
import { GoDotFill } from "react-icons/go";
import thumbnail from "../assets/thumbnail-1.png";
import { FaChevronRight } from "react-icons/fa6";
import { RiSendPlane2Line } from "react-icons/ri";
import { GrDownload } from "react-icons/gr";
import { BiTrash } from "react-icons/bi";
import PreviewQuizOverlay from "./PreviewQuizOverlay";

interface QuizzesTableProps {
  data: Array<Record<string, any>>;
  ids: string[];
  tableheads: string[];
  initialRowsPerPage?: number;
  renderCell?: Record<string, (row: Record<string, any>) => React.ReactNode>;
}

// Mock preview data for quiz questions

// Preview Quiz Overlay Component

const QuizzesTable: React.FC<QuizzesTableProps> = ({
  data,
  ids,
  tableheads,
  initialRowsPerPage = 10,
  renderCell = {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>();
  const [showPreview, setShowPreview] = useState(false);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIdx, startIdx + rowsPerPage);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const renderDetails = (id: any) => {
    const dataItem = data.find((item) => item.id === id);
    if (!dataItem) return null;
    return (
      <div className="absolute top-1/8 right-20 h-[438px] w-[410px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col">
        <div className="w-full p-2 bg-[#F8F9FF] border-t-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
          <h2 className="text-center font-semibold text-[18px]">
            Quiz Details
          </h2>
          <button
            onClick={() => setIsDetailsShown(false)}
            className="w-8 absolute top-2 right-5 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>
        {/* Main scrollable content */}
        <div
          className="flex-1 w-full py-6 px-4 flex flex-col overflow-y-auto"
          style={{ minHeight: 0 }}
        >
          <div className="w-full gap-4 flex items-start">
            <div className="flex-1 items-start">
              <h2 className="text-[#1A1C1E] text-[18px] font-semibold mb-1">
                {dataItem.title}
              </h2>
              <span className="bg-[#ECEDF4] rounded-[4px] py-[2px] font-[400] px-[8px] text-xs">
                {dataItem.course}
              </span>
            </div>
            <img src={badge} alt="" className="w-10 h-10" />
          </div>
          <div className="mt-2 text-[#73777F] text-[14px] flex flex-wrap gap-2 items-center">
            <span>{dataItem.questions} questions</span>
            <GoDotFill />
            <span>Negative: {dataItem.negative ?? "-0.5"}</span>
            <GoDotFill />
            <span>{dataItem.type}</span>
          </div>
          <div className="text-[#73777F] text-[14px] flex flex-wrap gap-2 items-center mt-1">
            <span>{dataItem.source}</span>
            <GoDotFill />
            <span>{dataItem.year}</span>
          </div>
          <div className="text-[#73777F] text-[14px] mt-2">
            Uploaded: {dataItem.uploaded ?? "1 August 2026"}
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {(dataItem.tags || []).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#DFE2EB] text-[#43474E] px-2 py-1 rounded text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Stats */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
              <span className="text-[12px] text-[#73777F]">
                Avg. monthly Visits:
              </span>
              <span className="text-[16px] font-semibold text-[#1A1C1E]">
                {dataItem.avgMonthlyVisits ?? "30,000"}
              </span>
            </div>
            <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
              <span className="text-[12px] text-[#73777F]">Total Visits</span>
              <span className="text-[16px] font-semibold text-[#1A1C1E]">
                {dataItem.totalVisits ?? "30,000"}
              </span>
            </div>
            <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
              <span className="text-[12px] text-[#73777F]">Average Score</span>
              <span className="text-[16px] font-semibold text-[#1A1C1E]">
                {dataItem.averageScore ?? "70%"}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded bg-[#F8F9FF] text-[#1A1C1E] font-medium">
              Leader Board
              <FaChevronRight />
            </button>
          </div>
          {/* Practice Suggestions */}
          <div className="mt-2">
            <h3 className="text-[14px] font-[500]  ">Fast Track</h3>
            <div className="flex items-center gap-2 my-2">
              <img
                src={thumbnail}
                alt="user"
                className="w-[82px] h-[47px]  rounded"
              />
              <span className="text-xs text-[#73777F]">
                Introduction to Paris - 101
              </span>
            </div>
            <div className="mb-2">
              <h3 className="text-[14px] font-[500] ">Quiz Blocks</h3>

              <div className="bg-[#F2F3FA] rounded px-3 py-2 mb-2">
                <div className="font-medium text-xs text-[#1A1C1E]">
                  Practice Introductory Biochemistry anatomy with these
                </div>
                <div className="text-[11px] text-[#73777F]">5 quizzes</div>
              </div>
              <div className="bg-[#F2F3FA] rounded px-3 py-2">
                <div className="font-medium text-xs text-[#1A1C1E]">
                  Practice Introductory Biochemistry anatomy with these
                </div>
                <div className="text-[11px] text-[#73777F]">5 quizzes</div>
              </div>
            </div>
          </div>
          <div className="p-2 space-y-2 mt-2">
            <div className="flex items-center gap-3 text-[14px]">
              <RiSendPlane2Line className="text-[#73777F] " />
              <p className="text-black ">Publish quiz</p>
            </div>

            <div className="flex items-center gap-3 text-[14px]">
              <GrDownload className="text-[#73777F]" />
              <p className="text-black ">Download CSV</p>
            </div>

            <div className="flex items-center gap-3 text-[14px]">
              <BiTrash className="text-[#73777F]" />
              <p className="text-black ">Delete quiz</p>
            </div>
          </div>
        </div>
        {/* Fixed footer for actions */}
        <div className="flex flex-col gap-2 py-4 px-4 border-t border-[#C3C6CF] bg-white sticky bottom-0">
          <button className="w-full py-2 rounded bg-[#D4E3FF] text-[#0360AB] font-medium">
            Edit Quiz details
          </button>
          <button
            className="w-full py-2 rounded bg-[#0360AB] text-white font-medium"
            onClick={() => setShowPreview(true)}
          >
            Preview Quiz
          </button>
        </div>
        {showPreview && (
          <PreviewQuizOverlay onClose={() => setShowPreview(false)} />
        )}
      </div>
    );
  };

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
          {currentData.map((row, rowIdx) => (
            <tr
              key={ids[startIdx + rowIdx] || rowIdx}
              className={
                rowIdx % 2 === 0
                  ? "cursor-pointer bg-white "
                  : "cursor-pointer bg-[#FAFAFA] hover:bg-[#F0F0F0] transition"
              }
              onDoubleClick={() => {
                setSelectedQuiz(row["id"]);
                setIsDetailsShown(true);
              }}
            >
              {ids.map((id, colIdx) => (
                <td
                  key={colIdx}
                  className="px-4 py-3 border-r border-[#E0E0E0] last:border-r-0 whitespace-nowrap"
                >
                  {renderCell[id] //instead of the former way of rendering cells,
                    ? //  if a custom render function exists for this cell, it runs the same as the previous way.
                      renderCell[id](row)
                    : row[id] ?? "--"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 px-4">
        <div className="flex flex-wrap gap-2">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
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
        <div className="flex items-center gap-2">
          <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            className="text-sm border border-gray-300 rounded px-2 py-1"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {[initialRowsPerPage, 5, 10, 15, 20, 25].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isDetailsShown && renderDetails(selectedQuiz)}
    </div>
  );
};

export default QuizzesTable;
