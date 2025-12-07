import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import { useApi } from "../../hooks/useApi";
import { LoadingAnimation } from "../../pages/QuizBlocksScreen";
import toast from 'react-hot-toast';

interface LectureBank {
  id: number;
  name: string;
  description: string;
  thumbnail: string | null;
  course_id: number;
  school_id: number;
  created_at: string;
}

interface GroupedLectureBanks {
  name: string;
  data: LectureBank[];
}

interface AddLectureBankPopUpProps {
  blockId: string | number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddLectureBankPopUp: React.FC<AddLectureBankPopUpProps> = ({
  blockId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lectureBanks, setLectureBanks] = useState<GroupedLectureBanks[]>([]);
  const [allBanks, setAllBanks] = useState<LectureBank[]>([]);
  const { apiFetch } = useApi();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch lecture banks from API
  useEffect(() => {
    const fetchLectureBanks = async () => {
      try {
        setLoading(true);
        const res = await apiFetch("/api/admin/lecture-banks");
        const response = await res.json();

        if (response.success && response.data) {
          setLectureBanks(response.data);
          
          // Flatten all banks for easier searching
          const flattened: LectureBank[] = response.data.flatMap(
            (group: GroupedLectureBanks) => group.data
          );
          setAllBanks(flattened);
        }
      } catch (error) {
        console.error("Error fetching lecture banks:", error);
        toast.error("Failed to load lecture banks");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchLectureBanks();
      setSelectedId(null);
      setSearch("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter banks based on search
  const filteredGroups = lectureBanks
    .map((group) => ({
      ...group,
      data: group.data.filter((bank) =>
        bank.name.toLowerCase().includes(search.toLowerCase()) ||
        bank.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.data.length > 0);

  const handleChange = (id: number) => {
    setSelectedId(id);
  };

  const handleSubmit = async () => {
    if (!selectedId) {
      toast.error("Please select a lecture bank");
      return;
    }

    try {
      setSubmitting(true);
      
      // Get current count of banks in block to set the order
      const order = 1; // You can make this dynamic based on existing banks count
      
      const res = await apiFetch(
        `/api/admin/lecture/${blockId}/banks/${selectedId}?order=${order}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Lecture bank added successfully!");
        onSuccess?.();
        onClose();
      } else {
        toast.error(result.message || "Failed to add lecture bank");
      }
    } catch (error) {
      console.error("Error adding lecture bank:", error);
      toast.error("An error occurred while adding the lecture bank");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedBank = allBanks.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1100]">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-xl relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b-[1px] border-[#C3C6CF] bg-[#F8F9FF] p-4 pb-2 flex-shrink-0">
          <h2 className="text-[18px] text-[#1A1C1E] font-semibold">
            Select Lecture Bank
          </h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* Content - Fixed height with scrolling */}
        <div className="flex flex-1 p-4 gap-4 overflow-hidden">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingAnimation />
            </div>
          ) : (
            <>
              {/* Left Side - Lecture Banks List */}
              <div className="w-1/2 pr-4 border-r-[1px] border-[#C3C6CF] flex flex-col">
                <div className="mb-3 flex-shrink-0">
                  <div className="w-full relative bg-[#F2F3FA] border-[1px] border-[#C3C6CF] rounded-[8px] h-[35px] flex items-center">
                    <IoSearch className="mx-2 text-xl text-[#0F172A] opacity-50" />
                    <input
                      type="text"
                      aria-label="Search Lecture Banks"
                      className="w-full outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F] bg-transparent"
                      placeholder="Search Lecture Banks"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1">
                  <div role="radiogroup" aria-label="Lecture Banks">
                    {filteredGroups.map((group) => (
                      <div key={group.name} className="mb-4">
                        {/* Course Name Header */}
                        <div className="sticky top-0 bg-[#F2F3FA] px-2 py-1.5 text-xs font-semibold text-[#73777F] uppercase tracking-wide border-b border-[#C3C6CF]">
                          {group.name}
                        </div>

                        {/* Lecture Banks in this course */}
                        {group.data.map((bank) => (
                          <label
                            key={bank.id}
                            className={`flex items-start gap-3 py-3 px-2 cursor-pointer rounded transition ${
                              selectedId === bank.id
                                ? "bg-[#E8F1FF]"
                                : "hover:bg-[#F2F3FA]"
                            } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <input
                              type="radio"
                              name="lecture-bank"
                              value={bank.id}
                              checked={selectedId === bank.id}
                              onChange={() => handleChange(bank.id)}
                              disabled={submitting}
                              className="w-4 h-4 mt-0.5 accent-[#0360AB] flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-[#1A1C1E] truncate">
                                {bank.name}
                              </div>
                              <div className="text-xs text-[#73777F] line-clamp-2 mt-0.5">
                                {bank.description}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>

                  {filteredGroups.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      No lecture banks found.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Selected Bank Details */}
              <div className="w-1/2 pl-4 flex flex-col">
                <h3 className="text-[18px] font-semibold mb-2 flex-shrink-0">
                  Selected Lecture Bank
                </h3>
                <p className="text-[#0360AB] text-[16px] font-medium mb-2 flex-shrink-0">
                  {selectedBank ? selectedBank.name : "None selected"}
                </p>

                <div className="overflow-y-auto flex-1 border-t-[1px] border-[#C3C6CF] pt-3">
                  {selectedBank ? (
                    <div className="space-y-4">
                      {/* Thumbnail */}
                      {selectedBank.thumbnail && (
                        <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={selectedBank.thumbnail}
                            alt={selectedBank.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Details */}
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                            Name
                          </div>
                          <div className="text-sm text-[#1A1C1E]">
                            {selectedBank.name}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                            Description
                          </div>
                          <div className="text-sm text-[#1A1C1E]">
                            {selectedBank.description}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-[#73777F] uppercase mb-1">
                            Created
                          </div>
                          <div className="text-sm text-[#1A1C1E]">
                            {new Date(selectedBank.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      No lecture bank selected.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex justify-end gap-3 p-4 border-t-[1px] border-[#C3C6CF] flex-shrink-0">
          <button
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2 rounded-[4px] border border-[#C3C6CF] text-[#1A1C1E] hover:bg-[#F2F3FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedBank || submitting}
            className={`px-6 py-2 rounded-[4px] text-white transition flex items-center gap-2 ${
              selectedBank && !submitting
                ? "bg-[#0360AB] hover:bg-[#035fabea]"
                : "bg-[#9fb4d6] cursor-not-allowed"
            }`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </>
            ) : (
              "Add to Block"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLectureBankPopUp;
