import React, { useState, useEffect, useRef } from "react";
import image1 from "../assets/Bank_pic.png";
import Filters from "../components/Filters";
import { IoSearch } from "react-icons/io5";
import UploadLecturePopupFlow from "./popups/UploadLecturePopupFlow";
import Stats from "./stats";
import { useApi } from "../hooks/useApi";
import { LoadingAnimation } from "../pages/QuizBlocksScreen";
import LectureDetailsPanel from "./LectureDetailsPanel";
import toast, { Toaster } from 'react-hot-toast';

interface Lecture {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  view_count: number;
  download_count: number;
  requires_premium: number;
  is_active: number;
  resource_type: string;
  file_url: string;
  file_name: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

const AllLectures: React.FC = () => {
  const { apiFetch } = useApi();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fetch lectures from API
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/api/admin/all-lectures');
        
        // Handle 304 Not Modified - still parse the response
        if (res.status === 304 || res.ok) {
          const response = await res.json();
          
          // Handle nested response structure (data.lectures)
          const lecturesList = response.data?.lectures || response.lectures || [];
          
          if (lecturesList.length > 0) {
            setLectures(lecturesList);
          } else {
            toast.success('No lectures found');
          }
        } else {
          toast.error('Failed to load lectures');
        }
      } catch (error) {
        console.error('Error fetching lectures:', error);
        toast.error('Failed to load lectures');
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  // Close details panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDetailsShown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  // Extract unique values for filters
  const visibilityOptions = ["Active", "Inactive"];
  const accessOptions = ["Free", "Premium"];

  const filterOptions = [
    { label: "Status", value: "visibility", dropdown: true, options: visibilityOptions },
    { label: "Access", value: "access", dropdown: true, options: accessOptions }
  ];

  // Filter logic
  const filteredData = lectures.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = activeFilters.every(f => {
      if (f.type === "visibility") {
        return (f.value === "Active" && item.is_active === 1) || 
               (f.value === "Inactive" && item.is_active === 0);
      }
      if (f.type === "access") {
        return (f.value === "Premium" && item.requires_premium === 1) || 
               (f.value === "Free" && item.requires_premium === 0);
      }
      return true;
    });
    
    return matchesSearch && matchesFilters;
  });

  // Calculate stats
  const totalLectures = lectures.length;
  const totalViews = lectures.reduce((sum, l) => sum + l.view_count, 0);
  const totalDownloads = lectures.reduce((sum, l) => sum + l.download_count, 0);

  return (
    <div>
      <Toaster position="top-right" />
      
      <div className='flex gap-4 mt-4'>
        <Stats value={totalLectures.toLocaleString()} label="Lectures Uploaded" />
        <Stats value={totalViews.toLocaleString()} label="Total Views" />
        <Stats value={totalDownloads.toLocaleString()} label="Total Downloads" />
      </div>

      <div className='flex items-center gap-2 mb-2 mt-3'>
        <div className='w-full sm:w-[27%] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] max-w-xs'>
          <IoSearch className='mx-2 text-[#0F172A] opacity-50' />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            type="text"
            className='w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F] bg-transparent'
            placeholder='Search lectures'
          />
        </div>
        <Filters filterOptions={filterOptions} onFilterChange={setActiveFilters} />
        
      </div>

      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full my-4 text-left text-sm text-[#1A1C1E] border-collapse">
            <thead className="bg-[#F2F3FA] text-[#73777F] text-[15px] font-medium">
              <tr>
                <th className="px-4 py-2">Lecture Title</th>
                <th className="px-4 py-2">Views</th>
                <th className="px-4 py-2">Downloads</th>
                <th className="px-4 py-2">Access</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date Created</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td colSpan={6} className="h-3"></td>
              </tr>
              {filteredData.map(item => (
                <tr 
                  key={item.id} 
                  className="cursor-pointer bg-[#FFFFFF] hover:bg-[#F0F0F0] transition-colors"
                  onClick={() => {
                    setSelectedLecture(item);
                    setIsDetailsShown(true);
                  }}
                >
                  <td className="flex items-center gap-4 pb-2 px-4 py-2">
                    <img 
                      src={item.thumbnail || image1} 
                      alt="" 
                      className="w-[76px] h-[48px] object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-xs text-[#73777F] truncate">{item.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.view_count.toLocaleString()}</td>
                  <td className="px-4 py-2">{item.download_count.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.requires_premium 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {item.requires_premium ? "Premium" : "Free"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.is_active 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && !loading && (
            <div className="text-center text-[#73777F] py-8">
              No lectures found.
            </div>
          )}
        </div>
      )}

      {isOpen && <UploadLecturePopupFlow onClose={onClose} />}
      
      {isDetailsShown && selectedLecture && (
        <LectureDetailsPanel
          lecture={selectedLecture}
          onClose={() => setIsDetailsShown(false)}
          ref={menuRef}
        />
      )}
    </div>
  );
};

export default AllLectures;
