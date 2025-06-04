import React, { useState, useRef, useEffect } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import uploadquiz from "../../assets/uploadquiz.png";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import SelectLecturePopup from "./SelectLecturePopup";
import SelectQuizBlockPopup from "./SelectQuizBlockPopup";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import preview from "../../assets/preview.png"

interface UploadQuizPopUpFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadQuizPopUpFlow: React.FC<UploadQuizPopUpFlowProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"upload" | "details">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDropped, setIsDropped] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Course");
  const [courseSearchTerm, setCourseSearchTerm] = useState<string>("");

 

  // const [isFastTrackOpen, setIsFastTrackOpen] = useState(false);
  // const [selectedFastTrack, setSelectedFastTrack] = useState("Fast track");
  // const [fastTrackSearchTerm, setFastTrackSearchTerm] = useState<string>("");
  // console.log("Fast Track Search Term: ", fastTrackSearchTerm);
  const [isUserRestrictionOpen, setIsUserRestrictionOpen] = useState(false);
  const [selectedUserRestriction, setSelectedUserRestriction] = useState("All Users");

  const [isLecturePopupOpen, setIsLecturePopupOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
  console.log("Selected Lecture: ", selectedLecture);
  const [lecturesSelected , setlectures ] = useState<any>([])

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

  const [quizMode, setQuizMode] = useState(true);
  const [examMode, setExamMode] = useState(false);

  
  
  const [day , selectedDay] = useState<number | null>()
  const [year , selectedYear] = useState<String | null>()
  const [month , selectedMonth] = useState<String | null>()
  const [datemetric , setDateMetric] = useState<String | null>(null)

  const filteredCourses = courses.filter((item) =>
    item.toLowerCase().includes(courseSearchTerm.toLowerCase())
  );

  const [title, setTitle] = useState<string>("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const years = [
      "2025",
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
  ]
  const days = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
  ]

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const allTags = [
    "Anatomy", "Biology", "Pharmacology", "Physiology", "Neuro", "Pathology", "Genetics"
  ];

  useEffect(() =>{
    console.log(lecturesSelected)

  } , [lecturesSelected])

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
  }, [tagInput, tags, lecturesSelected]);

  if (!isOpen) return null;
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      uploadFile(file);
    }
  };

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  const file = input.files?.[0];

  if (!file) {
    console.log("No file selected");
    return;
  }

  console.log("Selected file:", file);

  if (validateFile(file)) {
    uploadFile(file);
  }

  // Use setTimeout to reset the input after processing
  setTimeout(() => {
    input.value = "";
  }, 0);
};



  const validateFile = (file: File) => {
    const validTypes = ["text/csv"];
    if (!validTypes.includes(file.type)) {
      alert("Only CSV files are allowed.");
      return false;
    }
    return true;
  };

  const uploadFile = (file: File) => {
    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      setSelectedFile(file);
      setIsUploading(false);
      setStep("details");
    }, 2000);
  };

  const [isQuizBlockPopupOpen, setIsQuizBlockPopupOpen] = useState(false);
  const [selectedQuizBlocks, setSelectedQuizBlocks] = useState<{ id: number; name: string }[]>([]);

  const quizBlocksList = [
    { id: 1, name: "Block A" },
    { id: 2, name: "Block B" },
    { id: 3, name: "Block C" }
  ];
  
  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-[16px] max-h-[85vh] overflow-y-auto w-[800px] shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-1 border-b border-[#C3C6CF] rounded-t-[16px] bg-[#F8F9FF] sticky top-0 z-10">
          <h2 className="text-[19px] font-semibold text-[#1A1C1E]">
            Upload Quiz
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* Upload Step */}
        {step === "upload" && (
          <div
            className="px-5 py-4 min-h-[200px] flex items-center justify-center border-dashed border-[2px] border-[#C3C6CF] rounded-[12px] mx-6 my-4 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="space-y-2 text-center">
              <img src={uploadquiz} alt="" className="flex mx-auto" />
              <h3 className="text-[16px] font-[400] text-[#1A1C1E]">
                Drag and drop your CSV files here
              </h3>
              <div className="flex items-center justify-center gap-2">
                <div className="w-[120px] border-[1px] border-[#73777F]" />
                <p className="text-[14px] text-[#73777F]">or</p>
                <div className="w-[120px] border-[1px] border-[#73777F]" />
              </div>
              <button
                className="bg-[#0360AB] rounded-[8px] w-[200px] h-[32px] text-[#FFFFFF] mx-auto mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? "Uploading..." : "Select from device"}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {/* Details Step */}
        {step === "details" && selectedFile && (
          <div className="px-6 py-4 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                {/* Title */}
                <label className="text-[#1A1C1E] font-[500] mb-2 ">Title</label>
                <div className="relative p-2 h-[56px]">
                  <textarea
                    className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                    placeholder="Title"
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

                {/* Source Dropdown (static) */}
                <div>
                  
                    <p className="text-[#1A1C1E] font-[500] ">Source</p>
                     <input className="w-full outline-none relative border border-[#C3C6CF] rounded-[6px] text-xs px-2 py-1 h-[28px] flex items-center justify-between  min-h-[28px]" placeholder="University of Lagos">
                 
                </input>
                   
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

                {/* Date Inputs */}
                <div className="flex items-center gap-2 ">
                  <label className="text-[#1A1C1E] font-[500] ">Date</label>
                  <div className="flex items-center relative p-1 rounded-[4px] border-[1px] border-[#C3C6CF] gap-2 ">
                      <div onClick={() => setDateMetric("Year")} className="cursor-pointer hover:bg-[#F1F5F9] hover:rounded-[4px] px-3 py-1 ">
                        <p>{year ? year : "Year"}</p>
                      </div>
                      
                       <div onClick={() => setDateMetric("Month")} className="cursor-pointer hover:bg-[#F1F5F9] hover:rounded-[4px] px-3 py-1 ">
                        <p>{month ? month : "Month"}</p>
                      </div>
                      
                       <div onClick={() => setDateMetric("Day")} className="cursor-pointer hover:bg-[#F1F5F9] hover:rounded-[4px] px-3 py-1 ">
                        <p>{day ? day : "Day"}</p>
                      </div>
                       
                      {
                        datemetric !== null && ( 
                        <div className="absolute shadow-lg top-full p-1 w-full left-0 z-[1000] rounded-[4px] border-[1px] border-[#73777F] ">
                        <ul className=" max-h-32 overflow-y-auto">

                            {
                              datemetric === "Year" && (
                                years.map((item) => <li className="bg-white hover:bg-[#ECEDF4] py-2  px-2" key={item} onClick={() => {
                                  selectedYear(item)
                                  setDateMetric(null)
                                }}>{item}</li> )
                              )
                            }

                            {
                              datemetric === "Month" && (
                                months.map((item) => <li className="bg-white hover:bg-[#ECEDF4] py-2  px-2" key={item} onClick={() => {
                                  selectedMonth(item)
                                  setDateMetric(null)
                                }}>{item}</li> )
                              )
                            }

                                {
                              datemetric === "Day" && (
                                days.map((item) => <li className="bg-white hover:bg-[#ECEDF4] py-2  px-2" key={item} onClick={() => {
                                  selectedDay(item)
                                  setDateMetric(null)
                                }}>{item}</li> )
                              )
                            }
                          
                           
                        </ul>
                    </div>)
}
                    </div>
                    
                </div>

              </div>

              {/* CSV Preview */}
              <div className="space-y-2 w-[60%] mx-auto">
                <div className="border border-[#C3C6CF] rounded p-2">
                  <img
                    src={preview}
                    alt="Uploaded file"
                    className="rounded"
                  />
                  <p className="mt-2 text-xs font-medium">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-[#73777F]">Creating link...</p>
                </div>
              </div>
            </div>

          <div className="w-1/2 space-y-1">
              <label className="block text-xs text-[#1A1C1E] font-[500]">Mode</label>
              <p className="text-black font-[400] text-[10px]">Select how users interact with the quiz</p>
              <div className="flex gap-3">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExamMode((v) => !v)}
                >
                  {examMode ? (
                    <MdCheckBox className="text-[#0360AB] text-[20px]" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="text-[#0360AB] text-[20px]" />
                  )}
                  <span>Exam Mode</span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setQuizMode((v) => !v)}
                >
                  {quizMode ? (
                    <MdCheckBox className="text-[#0360AB] text-[20px]" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="text-[#0360AB] text-[20px]" />
                  )}
                  <span>Quiz Mode</span>
                </div>
              </div>
          </div>

            {/* Quiz Block Dropdown */}
            <div className="w-1/2 space-y-1">
              <label className="block text-xs font-[500] text-[#1A1C1E]">Quiz Block</label>
              <p className="text-black font-[400] text-[10px]">Add your quiz to one or more quiz blocks to organize your content for viewers</p>
              <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                <div
                  className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]"
                  onClick={() => setIsQuizBlockPopupOpen(true)}
                >
                  <p>
                    {selectedQuizBlocks.length > 0
                      ? selectedQuizBlocks.map((b) => b.name).join(", ")
                      : "Select Quiz Block"}
                  </p>
                  <FaChevronRight className="text-[#73777F] text-xs" />
                </div>
              </div>
            </div>

            {/* Fast Track Dropdown */}
            <div className="w-1/2 space-y-1">
              <label className="block text-xs text-[#1A1C1E] font-[500]">Fast track</label>
              <p className="text-black font-[400] text-[10px]">Use this quiz as a post-lecture quiz in a lecture</p>
              
              <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                 
                  <div className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]" onClick={() => setIsLecturePopupOpen(true)}>
                    <p> {lecturesSelected.length > 0 ? `${lecturesSelected.length} Lectures Added` : "Select Lecture"}</p>
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

            
          </div>
        )}

        {
          step !== "upload" && (
            <div className="flex justify-end gap-4 mt-3 p-2 bg-[#F8F9FF] w-full sticky bottom-0 z-10">
              <button className="px-3 py-1 text-xs bg-[#D4E3FF] rounded  text-[#0360AB] h-[28px]">
                Save as Draft
              </button>
              <button className="px-3 py-1 text-xs rounded bg-[#0360AB] text-white h-[28px]">
                Publish
              </button>
            </div>
          )
        }
           
      </div>
   

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
        <SelectQuizBlockPopup
          quizBlocks={quizBlocksList}
          selectedBlocks={selectedQuizBlocks}
          isOpen={isQuizBlockPopupOpen}
          onClose={() => setIsQuizBlockPopupOpen(false)}
          onSelectBlock={(block) => {
            setSelectedQuizBlocks((prev) => {
              const exists = prev.some((b) => b.id === block.id);
              if (exists) {
                return prev.filter((b) => b.id !== block.id);
              }
              return [...prev, block];
            });
          }}
        />
      )}
    </div>
  );
};

export default UploadQuizPopUpFlow;
