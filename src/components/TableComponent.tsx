import React, { useState } from "react";

interface DataTableProps {
  data: Array<Record<string, any>>;
  ids: string[];
  tableheads: string[];
  initialRowsPerPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  ids,
  tableheads,
  initialRowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIdx, startIdx + rowsPerPage);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
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
                  ? "cursor-pointer bg-white"
                  : "cursor-pointer bg-[#FAFAFA] hover:bg-[#F0F0F0] transition"
              }
            >
              {ids.map((id, colIdx) => (
                <td
                  key={colIdx}
                  className="px-4 py-3 border-r border-[#E0E0E0] last:border-r-0 whitespace-nowrap"
                >
                  {id === "title" ? (
                    <span
                      className="block truncate max-w-[200px]"
                      title={row[id]}
                    >
                      {row[id] ?? "--"}
                    </span>
                  ) : (
                    row[id] ?? "--"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 px-4">
        {/* Page numbers */}
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

        {/* Rows per page dropdown */}
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
    </div>
  );
};

export default DataTable;
