import { forwardRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FaDownload, FaEye } from "react-icons/fa";
import { formatReadableDate } from "../utils/formatDate";
import { useApi } from "../hooks/useApi";

interface LectureDetailsPanelProps {
  lecture: any;
  onClose: () => void;
  onRefresh?: () => void;
}

const LectureDetailsPanel = forwardRef<HTMLDivElement, LectureDetailsPanelProps>(
  ({ lecture, onClose, onRefresh }, ref) => {
    const { apiFetch } = useApi();
    const [isDeleting, setIsDeleting] = useState(false);

    if (!lecture) return null;

    const handleDelete = async () => {
      if (!window.confirm("Are you sure you want to delete this lecture?")) return;

      try {
        setIsDeleting(true);
        const res = await apiFetch(`/api/admin/lecture/${lecture.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Lecture deleted successfully");
          onClose();
          if (onRefresh) onRefresh();
        } else {
          const errorData = await res.json();
          alert(`Error: ${errorData.message || "Failed to delete lecture"}`);
        }
      } catch (error) {
        console.error("Error deleting lecture:", error);
        alert("An error occurred while deleting the lecture.");
      } finally {
        setIsDeleting(false);
      }
    };

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
      <div
        ref={ref}
        className="absolute top-1/8 right-20 h-[85vh] w-[410px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col"
      >
        {/* Header */}
        <div className="w-full p-2 bg-[#F8F9FF] border-y-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
          <h2 className="text-center font-semibold text-[18px]">
            Lecture Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 absolute top-2 right-5 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* Thumbnail */}
        {lecture.thumbnail && (
          <div className="w-full h-48 bg-gray-100">
            <img
              src={lecture.thumbnail}
              alt={lecture.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Title & Description */}
          <div>
            <h3 className="text-[18px] font-semibold text-[#1A1C1E] mb-2">
              {lecture.title}
            </h3>
            <p className="text-[14px] text-[#73777F]">
              {lecture.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#73777F] text-xs mb-1">
                <FaEye />
                <span>Views</span>
              </div>
              <span className="text-[16px] font-semibold text-[#1A1C1E]">
                {lecture.view_count?.toLocaleString() || 0}
              </span>
            </div>
            <div className="bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#73777F] text-xs mb-1">
                <FaDownload />
                <span>Downloads</span>
              </div>
              <span className="text-[16px] font-semibold text-[#1A1C1E]">
                {lecture.download_count?.toLocaleString() || 0}
              </span>
            </div>
          </div>

          {/* File Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[14px]">File Information</h4>
            
            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                File Name
              </div>
              <div className="text-sm text-[#1A1C1E] break-all">
                {lecture.file_name}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                File Size
              </div>
              <div className="text-sm text-[#1A1C1E]">
                {formatFileSize(lecture.file_size)}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                Resource Type
              </div>
              <div className="text-sm text-[#1A1C1E] capitalize">
                {lecture.resource_type}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                Access Level
              </div>
              <div className="text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    lecture.requires_premium
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {lecture.requires_premium ? "Premium Only" : "Free Access"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                Status
              </div>
              <div className="text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    lecture.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {lecture.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[14px]">Timeline</h4>
            
            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                Created
              </div>
              <div className="text-sm text-[#1A1C1E]">
                {formatReadableDate(lecture.created_at)}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                Last Updated
              </div>
              <div className="text-sm text-[#1A1C1E]">
                {formatReadableDate(lecture.updated_at)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t">
            <a
              href={lecture.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#0360AB] text-white font-medium hover:bg-[#035fabea] transition"
            >
              <FaEye />
              View Lecture
            </a>
            {/* <button className="w-full px-4 py-2 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition">
              Edit Lecture
            </button> */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full px-4 py-2 rounded bg-red-100 text-red-800 font-medium hover:bg-red-200 transition disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Lecture"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default LectureDetailsPanel;
