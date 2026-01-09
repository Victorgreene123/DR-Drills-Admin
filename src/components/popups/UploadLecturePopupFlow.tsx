import React, { useEffect, useRef, useState } from 'react';
import type { DragEvent, ChangeEvent } from "react";
import uploadlecture from "../../assets/uploadlecture.png";
import { LiaTimesSolid } from 'react-icons/lia';
import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import SelectLecturePopup from './SelectLecturePopup';
// import SelectQuizBlockPopup from './SelectQuizBlockPopup';
import SelectQuizPopup from './SelectQuizPopup';
import { useApi } from "../../hooks/useApi";
import toast from "react-hot-toast";
import {
  uploadLectureVideo,
  formatFileSize,
  validateVideoFile,
} from "../../utils/uploadLectureVideo";
// import axios from "axios";

interface UploadLecturePopUpFlowProps {
  onClose: () => void;
}

const UploadLecturePopupFlow: React.FC<UploadLecturePopUpFlowProps> = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isDropped, setIsDropped] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Course");
  const [courseSearchTerm, setCourseSearchTerm] = useState<string>("");
    const [isUserRestrictionOpen, setIsUserRestrictionOpen] = useState(false);
    const [selectedUserRestriction, setSelectedUserRestriction] = useState("All Users");
  const [isLecturePopupOpen, setIsLecturePopupOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
  console.log("Selected Lecture: ", selectedLecture);
  const [lecturesSelected , setlectures ] = useState<any>([])
   const [isQuizBlockPopupOpen, setIsQuizBlockPopupOpen] = useState(false);
    const [selectedQuizBlocks, setSelectedQuizBlocks] = useState<{ id: number; name: string }[]>([]);
  const [selectedAdditionalFile, setSelectedAdditionalFile] = useState<File | null>(null);
  const { apiFetch } = useApi();

  // Cloudinary config - replace these with your keys/preset
  // const CLOUDINARY_CLOUD_NAME = (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME';
  // const CLOUDINARY_UPLOAD_PRESET = (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET || 'YOUR_UPLOAD_PRESET';

  // const uploadToCloudinary = async (file: File, onProgress?: (p: number) => void): Promise<string> => {
  //   const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
  //   const fd = new FormData();
  //   fd.append('file', file); 
  //   fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  //   const res = await axios.post(url, fd, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     onUploadProgress: (progressEvent) => {
  //       if (progressEvent.total && onProgress) {
  //         const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         onProgress(percent);
  //       }
  //     },
  //   });

  //   if (res.status >= 200 && res.status < 300) {
  //     return res.data.secure_url || res.data.url;
  //   }
  //   throw new Error('Upload failed');
  // };

  const courses = [
    "Anatomy",
    "Physiology",
    "Psychology",
    "Neurology",
    "Biomedics",
    "Biotechnology",
    "Devops Engineeering"
  ];
    const userRestrictions = [
    "All Users",
    "Premium Users",
    "Admins Only"
  ];
  const filteredCourses = courses.filter((item) =>
    item.toLowerCase().includes(courseSearchTerm.toLowerCase())
  );
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const allTags = [
      "Anatomy", "Biology", "Pharmacology", "Physiology", "Neuro", "Pathology", "Genetics"
    ];
    useEffect(() => {
       if (tagInput.trim() === "") {
         setTagSuggestions([]);
       } else {
         setTagSuggestions(
           allTags
             .filter(
               (t) =>
                 t.toLowerCase().includes(tagInput.toLowerCase()) &&
                 !tags.includes(t)
             )
             .slice(0, 5)
         );
       }
     }, [tagInput, tags]);
  


  const prevStep = () => setStep(prev => prev - 1);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      uploadFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      uploadFile(file);
    }
    // reset so same file can be selected again next time
    e.target.value = "";
  };

  const validateFile = (file: File) => {
    const validation = validateVideoFile(file, ["video/mp4"]);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file");
      return false;
    }
    return true;
  };

  const uploadFile = (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    console.log("Uploading file:", file.name);

    setTimeout(() => {
      setSelectedFile(file);
      setIsUploading(false);
      setStep(2);
      console.log("File ready for metadata entry!");
    }, 500);
  };

  const handleSubmit = async () => {
    // Validate form
    if (!selectedFile) {
      toast.error("Please select a video file");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a lecture title");
      return;
    }

    if (selectedCourse === "Course") {
      toast.error("Please select a course");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Prepare lecture metadata
      const lectureMeta = {
        fileName: selectedFile.name,
        name: title,
        description: subTitle,
        course: 1,
        // tags: tags,
        // user_restriction: selectedUserRestriction,
        // quiz_blocks: selectedQuizBlocks.map((b) => b.id),
        // additional_file_name: selectedAdditionalFile?.name || null,
      };

      // Upload lecture and video to Bunny.net
      const result = await uploadLectureVideo(
        selectedFile,
        lectureMeta,
        apiFetch,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      if (!result.success) {
        setUploadError(result.error || "Upload failed");
        toast.error(result.error || "Failed to upload lecture");
        return;
      }

      toast.success("Lecture created and video uploaded successfully!");
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setUploadError(errorMessage);
      toast.error(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div
            className="px-5 py-4 min-h-[200px] flex items-center justify-center border-dashed border-[2px] border-[#C3C6CF] rounded-[12px] mx-6 my-4"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <div className="space-y-2 text-center">
              <img src={uploadlecture} alt="" className="mx-auto" />
              <h3 className="text-[16px] font-[400] text-[#1A1C1E]">
                Drag and drop your video file here
              </h3>
              <div className="flex items-center justify-center gap-2">
                <div className="w-[120px] border-[1px] border-[#73777F]" />
                <p className="text-[14px] text-[#73777F]">or</p>
                <div className="w-[120px] border-[1px] border-[#73777F]" />
              </div>
              <button
                className="bg-[#0360AB] rounded-[8px] w-[200px] h-[32px] text-white mx-auto mt-4 disabled:opacity-50"
                onClick={() => !isUploading && fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Select from device"}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="video/mp4"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
        <div className="px-6 py-4 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                {/* Title */}
                <label className="text-[#1A1C1E] font-[500] mb-2 ">Title</label>
                <div className="relative p-2 h-[56px]">
                  <textarea
                    className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                    placeholder="Give your lecture a title"
                    style={{ resize: "none" }}
                    value={title}
                    onChange={
                      (e) => {
                          setTitle(e.target.value)
                      }
                    }
                    maxLength={100}
                  />
                  <p className="absolute bottom-0 text-[#73777F] text-[11px] right-2">{title.length}/100</p>
                </div>

                {/* SubTitle  */}
                {/* Title */}
                <label className="text-[#1A1C1E] font-[500] mb-2 ">Subtitle</label>
                <div className="relative p-2 h-[56px]">
                  <textarea
                    className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                    placeholder="A short decription of the lecture"
                    style={{ resize: "none" }}
                    value={subTitle}
                    onChange={
                      (e) => {
                          setSubTitle(e.target.value)
                      }
                    }
                    maxLength={100}
                  />
                  <p className="absolute bottom-0 text-[#73777F] text-[11px] right-2">{subTitle.length}/100</p>
                </div>
               
                {/* Course Dropdown */}
                                <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                                  {!isDropped ? (
                                    <div className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]" onClick={() => setIsDropped(true)}>
                                      <p>{selectedCourse}</p>
                                      <FaChevronDown className="text-[#73777F] text-xs" />
                                    </div>
                                  ) : (
                                    <div className="w-full h-[28px] relative">
                                      <IoSearch className="absolute top-1.5 left-2 text-[#73777F] text-[14px]" />
                                      <input
                                        type="text"
                                        className="absolute top-0 h-full w-full outline-none border-none left-0 pl-7 text-xs"
                                        placeholder="Search course"
                                        autoFocus
                                        onChange={e => setCourseSearchTerm(e.target.value)}
                                        value={courseSearchTerm}
                                      />
                                      <button onClick={() => setIsDropped(false)}>
                                        <FaChevronUp className="text-[#73777F] text-xs absolute top-2 right-2" />
                                      </button>
                                    </div>
                                  )}
                                  {isDropped && filteredCourses.length !== 0 && (
                                    <div className="absolute top-8 left-0 bg-white border border-[#C3C6CF] rounded shadow-lg w-full z-10">
                                      <ul className="p-1 max-h-32 overflow-y-auto">
                                        {filteredCourses.map((item) => (
                                          <li
                                            className="py-1 px-2 hover:bg-[#F2F3FA] cursor-pointer text-xs"
                                            key={item}
                                            onClick={() => {
                                              setSelectedCourse(item);
                                              setIsDropped(false);
                                              setCourseSearchTerm("");
                                            }}
                                          >
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                         {/* Tags Dropdown (static) */}
                <div className="w-full mb-2">
                  <label className="block text-xs font-[500] text-[#1A1C1E] mb-1">Tags</label>
                  <div className="relative border border-[#C3C6CF] rounded-[6px] px-2 py-1 min-h-[36px] flex flex-wrap items-center gap-1 bg-white">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#DFE2EB] text-[#43474E] px-2 py-1 rounded text-[11px] flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1 text-[16px] text-[#0360AB] hover:text-red-500"
                          onClick={() => setTags(tags.filter((t) => t !== tag))}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="flex-1 min-w-[80px] border-none outline-none text-xs px-1 bg-transparent"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          (e.key === "Enter" || e.key === ",") &&
                          tagInput.trim() !== "" &&
                          !tags.includes(tagInput.trim())
                        ) {
                          setTags([...tags, tagInput.trim()]);
                          setTagInput("");
                          e.preventDefault();
                        }
                      }}
                    />
                    {tagSuggestions.length > 0 && (
                      <ul className="absolute left-0 top-full bg-white border border-[#C3C6CF] rounded shadow-lg w-full z-10 max-h-32 overflow-y-auto">
                        {tagSuggestions.map((suggestion) => (
                          <li
                            key={suggestion}
                            className="px-2 py-1 hover:bg-[#F2F3FA] cursor-pointer text-xs"
                            onClick={() => {
                              setTags([...tags, suggestion]);
                              setTagInput("");
                            }}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                  {/* Quiz Block Dropdown */}
                                    <div className="w-1/2 space-y-1">
                                      <label className="block text-xs font-[500] text-[#1A1C1E]">Fast track</label>
                                      <p className="text-black font-[400] text-[10px]">Attach a practice quiz to this Lecture</p>
                                      <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                                        <div
                                          className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]"
                                          onClick={() => setIsQuizBlockPopupOpen(true)}
                                        >
                                          <p>
                                            {selectedQuizBlocks.length > 0
                                              ? `${selectedQuizBlocks.length} ${selectedQuizBlocks.length > 1 ? "Quizzes" : "Quiz"}  Selected`
                                              : "Select Quiz "}
                                          </p>
                                          <FaChevronRight className="text-[#73777F] text-xs" />
                                        </div>
                                      </div>
                                    </div>
                

                            {/* User Restriction Dropdown */}
                            <div className="w-1/2 space-y-1">
                              <label className="block text-xs text-[#1A1C1E] font-[500]">User Restriction</label>
                              
                              
                              <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                                 
                                  <div className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]" onClick={() => setIsUserRestrictionOpen(true)}>
                                    <p>{selectedUserRestriction}</p>
                                    <FaChevronRight className="text-[#73777F] text-xs" />
                                  </div>
                                 
                                
                                {isUserRestrictionOpen && (
                                  <div className="absolute top-8 left-0 bg-white border border-[#C3C6CF] rounded shadow-lg w-full z-[1500]">
                                    <ul className="p-1 max-h-32 overflow-y-auto">
                                      {userRestrictions.map((item) => (
                                        <li
                                          className="py-1 px-2 hover:bg-[#F2F3FA] cursor-pointer text-xs"
                                          key={item}
                                          onClick={() => {
                                            setSelectedUserRestriction(item);
                                            setIsUserRestrictionOpen(false);
                                          }}
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                        {/* Additional resources */}
<div className="w-1/2 space-y-1">
  <label className="block text-xs text-[#1A1C1E] font-[500]">Additional Learning Resource</label>

  <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
    <div className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]">
      <p>{selectedAdditionalFile ? selectedAdditionalFile.name : "Add documents"}</p>
      <FaChevronRight className="text-[#73777F] text-xs" />
    </div>
    <input
      type="file"
      accept="application/pdf"
      className="absolute inset-0 opacity-0 cursor-pointer"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedAdditionalFile(e.target.files[0]);
        }
      }}
    />
  </div>
</div>


                               
                            
            </div>

            <div className='px-6 py-4 '>

                <div className='w-full h-[300px] rounded-md border-[#73777F] border-[1px]  mt-4'>

                    {selectedFile ? (
                        <video
                        src={URL.createObjectURL(selectedFile)}
                        controls
                        className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-[#73777F]">
                        No video selected
                        </div>
                    )}
                
                </div>
                {
                    selectedFile && (
                    <div className='mt-2 text-xs text-[#73777F]'>   
                        {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </div>
                    )
                }

                {/* Video upload and progress */}
                {selectedFile && (
                  <div className="mt-3 space-y-2">
                    {/* Progress bar */}
                    {isUploading && (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#73777F]">Uploading...</span>
                          <span className="font-semibold text-[#0360AB]">
                            {uploadProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-[#E0E0E0] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#0360AB] h-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Error message */}
                    {uploadError && (
                      <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                        <p className="font-semibold">Upload failed:</p>
                        <p>{uploadError}</p>
                      </div>
                    )}

                    {/* Upload info */}
                    <p className="text-[10px] text-[#73777F]">
                      <strong>Note:</strong> Upload URL expires in 1 hour and is single-use.
                    </p>
                  </div>
                )}

            </div>

            </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-[16px] max-h-[85vh] overflow-y-auto w-[800px] shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-1 border-b border-[#C3C6CF] bg-[#F8F9FF] sticky top-0 z-[1100]">
          <h2 className="text-[19px] font-semibold text-[#1A1C1E]">Upload Lecture</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db]"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* Scrollable content area */}
    <div className="flex-1 overflow-y-auto">
      {renderStep()}
    </div>

        {/* Footer */}
        {step !== 1 && (
          <div className="flex justify-end gap-4 mt-3 p-2 bg-[#F8F9FF] sticky bottom-0 z-[1100]">
            <button onClick={prevStep} className="px-3 py-1 text-xs bg-[#D4E3FF] rounded text-[#0360AB] h-[28px]" disabled={isUploading}>
              Go to Previous
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 text-xs rounded bg-[#0360AB] text-white h-[28px] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedFile || isUploading || !title.trim()}
            >
              {isUploading ? `Publishing... ${uploadProgress}%` : "Publish"}
            </button>
          </div>
        )}

             {isLecturePopupOpen && (
                <SelectLecturePopup
                  isOpen={isLecturePopupOpen}
                  onClose={() => setIsLecturePopupOpen(false)}
                  lectures = {lecturesSelected}
                  onSelectLecture={(lecture: string, lectureid: any) => {
                    setSelectedLecture(lecture);
                    // setIsLecturePopupOpen(false); // <-- This line closes the popup immediately
                    setlectures((prevLectures: any[]) => {
                      let lectureObj = {
                        lectureTitle: lecture,
                        lectureid: lectureid
                      };
                      let isSelected = prevLectures.findIndex((item) => item.lectureid === lectureid);
                      if (isSelected !== -1) {
                        return prevLectures.filter((item) => item.lectureid !== lectureid);
                      }
                      return [...prevLectures, lectureObj];
                    });
                    console.log(lecturesSelected);
                  }}
                />
              )}
        
              {isQuizBlockPopupOpen && (
                <SelectQuizPopup
                //   quizBlocks={quizBlocksList}
                //   selectedBlocks={selectedQuizBlocks}
                  isOpen={isQuizBlockPopupOpen}
                  selectedQuiz={selectedQuizBlocks}
                  onClose={() => setIsQuizBlockPopupOpen(false)}
                  onSelectQuiz={(quiz , quizid) => {
                    const quizitem= {
                        id : quizid,
                        name: quiz
                    }
                    setSelectedQuizBlocks((prev) => {
                      const exists = prev.some((b) => b.id === quizitem.id);
                      if (exists) {
                        return prev.filter((b) => b.id !== quizitem.id);
                      }
                      return [...prev, quizitem];
                    });
                  }}
                />
              )}
      </div>
    </div>
  );
};

export default UploadLecturePopupFlow;
