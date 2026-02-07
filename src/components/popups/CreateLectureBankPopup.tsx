import React, { useEffect, useState } from 'react';
import PopUpContainer from './PopUp';
import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import SelectLecturePopup from './SelectLecturePopup';
import { useApi } from '../../hooks/useApi';
import { FaSpinner } from 'react-icons/fa6';


const CreateLectureBankPopup: React.FC<
{
    onClose: () => void;
}
> = ({ onClose }) => {

     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
      const [selectedCourse, setSelectedCourse] = useState("Course");
      const [selectedSchool, setSelectedSchool] = useState("School");

       const [courseSearchTerm, setCourseSearchTerm] = useState<string>("");
        const [isSchoolDropped, setIsSchoolDropped] = useState(false);
        const [schoolSearchTerm, setSchoolSearchTerm] = useState<string>("");

         const [isUserRestrictionOpen, setIsUserRestrictionOpen] = useState(false);
         const [selectedUserRestriction, setSelectedUserRestriction] = useState("All Users");
           const [isDropped, setIsDropped] = useState(false);
            // const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
            //  console.log("Selected Lecture: ", selectedLecture);
             const [lecturesSelected , setlectures ] = useState<any[]>([])

            const AddLectures = (lecture:string , lectureid:number , ) => {
                    const lecturebody = {
                        lectureid : lectureid,
                        name: lecture
                    }
                    
                    setlectures((prev: any[]) => {
                        const exists = prev.some((b) => b.lectureid === lecturebody.lectureid);
                      if (exists) {
                        return prev.filter((b) => b.lectureid !== lecturebody.lectureid);
                      }
                      return [...prev, lecturebody];
                    })

            }
        const [isAddLecturesOpen , setIsAddLectures] = useState(false)



          const {apiFetch} = useApi();
          const [loading, setLoading] = useState(false);
        
        
          
        

  const [courses, setCourses] = useState<{course_id:number, course_name:string, description?:string}[]>([]);
  const [schools, setSchools] = useState<{id:number, name:string}[]>([]);
  useEffect(() => {
    // Fetch courses
    (async () => {
      try {
        const res = await apiFetch('/api/courses/fetch');
        const data = await res.json();
        if (data && Array.isArray(data.courses)) {
          setCourses(data.courses.map((c:any) => ({ course_id: c.course_id, course_name: c.course_name, description: c.description })));
        }
      } catch (e) { /* Optionally handle error */ }
    })();
    // Fetch schools
    (async () => {
      try {
        const res = await apiFetch('/api/universities/fetch');
        const data = await res.json();
        if (data && Array.isArray(data.universities)) {
          setSchools(data.universities.map((s:any) => ({ id: s.id, name: s.name })));
        }
      } catch (e) { /* Optionally handle error */ }
    })();
  }, []);
        const userRestrictions = [
        "All Users",
        "Premium Users",
        "Admins Only"
      ];
      const filteredCourses = courses.filter((item) =>
        item.course_name.toLowerCase().includes(courseSearchTerm.toLowerCase())
      );
        const filteredSchools = schools.filter((item) =>
        item.name.toLowerCase().includes(schoolSearchTerm.toLowerCase())
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


         const handleSubmit = async () => {
        
            
            // Handle form submission logic here
            const newQuizBlock = {
              name: title,
              description: description,
              // isPublic: isPublic,
              thumbnail: null,
              tags : tags,
              course_id:  selectedCourse === "Course" ? 5 : courses.find(c => c.course_name === selectedCourse)?.course_id || 1,
              school_id: selectedSchool === "School" ? 1 : schools.find(c => c.name === selectedSchool)?.id || 1,
              resourceIds: lecturesSelected.map(q => q.lectureid)
            };
            console.log("Creating Quiz Block:", newQuizBlock);
        
            try {
              setLoading(true); 
              const response = await apiFetch('/api/admin/lecture-banks', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuizBlock),
              });
              if (response.ok) {
                console.log('Lecture Bank created successfully');
                onClose();
        
              }
            } catch (error) {
              console.error('Error creating Lecture Bank:', error);
            }
            finally{
              setLoading(false);
            }
          }
      

    return(
		<PopUpContainer title="Create New Lecture Bank" onClose={() => onClose()}>
<div className=" ">
              <div className="space-y-3">
                {/* Title */}
                <label className="text-[#1A1C1E] font-[500] mb-2 ">Title</label>
                <div className="relative p-2 h-[56px]">
                  <textarea
                    className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                    placeholder="Give your lecture bank a title"
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

                                {/* Description */}
                <label className="text-[#1A1C1E] font-[500] mb-2 ">Description</label>
                <div className="relative p-2 h-[56px]">
                  <textarea
                    className="w-full absolute top-0 left-0 border-[1px] border-[#C3C6CF] outline-none rounded h-full px-2 py-1 text-xs"
                    placeholder="Give your lecture bank a description"
                    style={{ resize: "none" }}
                    value={description}
                    onChange={
                      (e) => {
                          setDescription(e.target.value)
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
                                            key={item.course_id}
                                            onClick={() => {
                                              setSelectedCourse(item.course_name);
                                              setIsDropped(false);
                                              setCourseSearchTerm("");
                                            }}
                                          >
                                            {item.course_name}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                </div>

                                {/* School  */}
                                <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                                  {!isSchoolDropped ? (
                                    <div className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]" onClick={() => setIsSchoolDropped(true)}>
                                      <p>{selectedSchool}</p>
                                      <FaChevronDown className="text-[#73777F] text-xs" />
                                    </div>
                                  ) : (
                                    <div className="w-full h-[28px] relative">
                                      <IoSearch className="absolute top-1.5 left-2 text-[#73777F] text-[14px]" />
                                      <input
                                        type="text"
                                        className="absolute top-0 h-full w-full outline-none border-none left-0 pl-7 text-xs"
                                        placeholder="Search school"
                                        autoFocus
                                        onChange={e => setSchoolSearchTerm(e.target.value)}
                                        value={schoolSearchTerm}
                                      />
                                      <button onClick={() => setIsSchoolDropped(false)}>
                                        <FaChevronUp className="text-[#73777F] text-xs absolute top-2 right-2" />
                                      </button>
                                    </div>
                                  )}
                                  {isSchoolDropped && schools.length !== 0 && (
                                    <div className="absolute top-8 left-0 bg-white border border-[#C3C6CF] rounded shadow-lg w-full z-10">
                                      <ul className="p-1 max-h-32 overflow-y-auto">
                                        {filteredSchools.map((item) => (
                                          <li
                                            className="py-1 px-2 hover:bg-[#F2F3FA] cursor-pointer text-xs"
                                            key={item.id}
                                            onClick={() => {
                                              setSelectedSchool(item.name);
                                              setIsSchoolDropped(false);
                                              setSchoolSearchTerm("");
                                            }}
                                          >
                                            {item.name}
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

                            {/* Add Lectures Section  */}

                                    <div className="w-1/2 space-y-1">
                                      <label className="block text-xs font-[500] text-[#1A1C1E]">Select Lectures</label>
                                      <p className="text-black font-[400] text-[10px]">Attach a lecture to this lecture bank</p>
                                      <div className="w-full relative border border-[#C3C6CF] rounded-[6px] text-xs min-h-[28px]">
                                        <div
                                          className="px-2 py-1 flex items-center justify-between w-full cursor-pointer min-h-[28px]"
                                          onClick={() => setIsAddLectures(true)}
                                        >
                                          <p>
                                            {lecturesSelected.length > 0
                                              ? `${lecturesSelected.length} ${lecturesSelected.length > 1 ? "Lectures" : "Lecture"}  Selected`
                                              : "Select Lecture "}
                                          </p>
                                          <FaChevronRight className="text-[#73777F] text-xs" />
                                        </div>
                                      </div>
                                    </div>


                                  {/* Create Lecture Bank Button  */}

                        <div className="flex justify-end mt-4">
                          <button
                            className="px-4 py-2 bg-[#0360AB] text-white rounded text-xs"
                            onClick={handleSubmit}
                            disabled={loading}
                          >
                            {loading ? <FaSpinner className="animate-spin text-lg" />: 'Create Lecture Bank'}
                          </button>
                        </div>




                        </div>
                        </div>

                        {
                            isAddLecturesOpen && <SelectLecturePopup lectures={lecturesSelected} onClose={() => setIsAddLectures(false)} isOpen={isAddLecturesOpen} onSelectLecture={AddLectures}/>
                        }

                  
                    
        </PopUpContainer>

    )



}

export default CreateLectureBankPopup;