import React, { useEffect, useRef, useState } from "react";
import badge from "../assets/bxs_badge.png";

import thumbnail from "../assets/thumbnail-1.png";

import { useApi } from "../hooks/useApi";
import SubscriptionDetailsPanel from "./subscriptiondetails";

interface SubscriptionsTableProps {
  data: Array<Record<string, any>>;
  ids: string[];
  tableheads: string[];
  currentPage: number; // ✅ controlled from parent
  totalPages: number; // ✅ from API
  onPageChange: (page: number) => void;
  initialRowsPerPage?: number // ✅ parent handles pagination
  
  renderCell?: Record<string, (row: Record<string, any>) => React.ReactNode>;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  data,
  ids,
  tableheads,
  currentPage,
  totalPages,
  onPageChange,
  renderCell = {},
}) => {
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [leaderboard, ] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [isSubscriptionDetailsShown, setIsSubscriptionDetailsShown] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>();
  // const [showPreview, setShowPreview] = useState(false);

  const { apiFetch } = useApi();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  const fetchSubscriptionDetails = async (id: any) => {
    try {
      setLoadingDetails(true);
      const res = await apiFetch(`/api/admin/subscription-history/${id}`);
      const data = await res.json();
      setSubscriptionDetails(data?.data || data);
    } catch (error) {
      console.error("Error fetching subscription details");
    } finally {
      setLoadingDetails(false);
    }
  };

  

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsSubscriptionDetailsShown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full my-4 text-left text-sm text-[#1A1C1E] border-collapse">
        <thead className="bg-[#F2F3FA] text-[#73777F] text-[15px] font-medium">
          <tr>
            {tableheads.map((head, idx) => (
              <th key={idx} className="px-4 py-2 border-r border-[#73777F]">
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
                  ? "cursor-pointer bg-white"
                  : "cursor-pointer bg-[#FAFAFA] hover:bg-[#F0F0F0]"
              }
              onClick={() => {
                setSelectedSubscription(row["id"]);
                setSubscriptionDetails(null);
                setIsSubscriptionDetailsShown(true);

                fetchSubscriptionDetails(row["id"]);

              }}
            >
              {ids.map((id, colIdx) => (
                <td
                  key={colIdx}
                  className="px-4 py-3 border-r border-[#E0E0E0]"
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 px-4">
        <div className="flex flex-wrap gap-2">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === page
                  ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Subscription Details */}
      {isSubscriptionDetailsShown && (
        <SubscriptionDetailsPanel
          id={selectedSubscription}
          data={data}
          details={subscriptionDetails}
          loadingDetails={loadingDetails}
          onClose={() => setIsSubscriptionDetailsShown(false)}
          
          badge={badge}
          thumbnail={thumbnail}
          leaderboard={leaderboard}
          ref={menuRef}
        />
      )}


    </div>
  );
};


export default SubscriptionsTable;
