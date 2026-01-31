import React, { useEffect, useState } from 'react';
import Stats from '../components/stats';
import { IoSearch } from 'react-icons/io5';
import UploadQuizPopUpFlow from '../components/popups/UploadQuizPopUpFlow';
import QuizzesTable from '../components/QuizzesTable';
import QuizBlocksScreen, { LoadingAnimation } from './QuizBlocksScreen';
import Filters from '../components/Filters'; // ✅ import reusable Filters
import { useApi } from '../hooks/useApi';

interface Quiz {
              id: number;
            title: string;
            course: string;
            questions: number;
            negative: string;
            type: string;
            source: string;
            year: number;
            visibility: string;
}
const Quizzes: React.FC = () => {
  const [view, setView] = useState(1);
  const toggleView = () => setView(view === 1 ? 2 : 1);
  const [showPop, setShowPop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { apiFetch } = useApi();
  const [loading, setLoading] = useState(false);
  const [totalPages , setTotalPages] = useState(1);
  const [currentPage , setCurrentPage] = useState(1);
  const [quizzesPerPage , setQuizzesPerPage] = useState(10);
  const [data , setData] = useState<Quiz[]>([])

  // const data = [
  //   { id: 1, title: "Anatomy Quiz 1", course: "Anatomy", questions: 50, negative: "-0.5", type: "MCQ", source: "University of Lagos", year: 2023, uploaded: "1 August 2023", tags: ["Anatomy", "Bones", "Intro"], avgMonthlyVisits: "12,000", totalVisits: "120,000", averageScore: "75%", visibility: "Published" },
  //   { id: 2, title: "Physiology Final", course: "Physiology", questions: 40, negative: "-1", type: "Essay", source: "Harvard", year: 2022, uploaded: "15 May 2022", tags: ["Physiology", "Finals"], avgMonthlyVisits: "8,000", totalVisits: "80,000", averageScore: "68%", visibility: "Draft" },
  //   { id: 3, title: "Pharmacology Midterm", course: "Pharmacology", questions: 30, negative: "-0.25", type: "MCQ", source: "Oxford", year: 2024, uploaded: "10 March 2024", tags: ["Pharmacology", "Midterm"], avgMonthlyVisits: "10,000", totalVisits: "100,000", averageScore: "80%", visibility: "Published" },
  //   { id: 4, title: "Biochemistry Basics", course: "Biochemistry", questions: 25, negative: "-0.1", type: "MCQ", source: "MIT", year: 2023, uploaded: "20 January 2023", tags: ["Biochemistry", "Basics"], avgMonthlyVisits: "5,000", totalVisits: "50,000", averageScore: "85%", visibility: "Published" },
  //   { id: 5, title: "Microbiology Quiz Block", course: "Microbiology", questions: 60, negative: "-0.2", type: "MCQ", source: "Stanford", year: 2023, uploaded: "5 February 2023", tags: ["Microbiology", "Block"], avgMonthlyVisits: "15,000", totalVisits: "150,000", averageScore: "90%", visibility: "Draft" },
  // ];

  //  {
  //           "id": 12,
  //           "title": "Robbins Pathology Review Quiz 12",
  //           "time_allowed": 45,
  //           "question_type": "multiple_choice",
  //           "is_draft": 0,
  //           "premium": 0,
  //           "question_count": 11,
  //           "visit_count": 7,
  //           "created_at": "2025-09-15T11:23:17.000Z",
  //           "updated_at": "2025-09-15T11:23:17.000Z",
  //           "school_names": "Ahmadu Bello University College of Medicine, Johns Hopkins School of Medicine",
  //           "course_names": "Pediatrics",
  //           "topic_names": null,
  //           "thumbnail_url": null
  //       },

  const fetchData = async (page:number = 1) => {
     try {
      setLoading(true);
      console.log("Fetching QUiz data page :" , page)
      const res = await apiFetch('/api/admin/quiz/all');
      const result = await res.json();
      if (res.status !== 200) {
        throw new Error('Failed to fetch quizzes');
      }
      const {data , pagination} = result
      const mappedData = data.map((item: any) => { 
          return {
            id: item.id,
            title: item.title,
            course: item.course_names,
            questions: item.question_count,
            negative: "0.4",
            type: item.question_type,
            source: item.school_names,
            year: Number(new Date(item.created_at).getFullYear()),
            visibility: item.is_draft === 1 ? "Published" : "Draft"

          }
      });
      setTotalPages(pagination.totalPages);
      setQuizzesPerPage(pagination.quizzesPerPage)
      setData(mappedData);
      // setData(result); // Uncomment and implement state if needed
     } catch (error) {
      console.error('Error fetching quizzes:', error);
     }
     finally{
      setLoading(false);
     }
  };

  const changePage = (page: number) =>{
      setCurrentPage(page);
      fetchData(page);
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const courseOptions = ["Anatomy", "Physiology", "Pharmacology", "Biochemistry", "Microbiology"];
  const visibilityOptions = ["Published", "Draft"];
  const yearOptions = Array.from(new Set(data.map(q => q.year))).sort((a, b) => b - a).map(String);
  const typeOptions = Array.from(new Set(data.map(q => q.type)));

  const filterOptions = [
    { label: "Course", value: "course", dropdown: true, options: courseOptions },
    { label: "Visibility", value: "visibility", dropdown: true, options: visibilityOptions },
    { label: "Year", value: "year", dropdown: true, options: yearOptions },
    { label: "Type", value: "type", dropdown: true, options: typeOptions },
    { label: "Drafts", value: "Drafts", dropdown: false }
  ];

  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  // ✅ Filtering logic
  const filteredData = data.filter((quiz) => {
    if (activeFilters.length === 0 && searchTerm.trim() === '') return true;

    // Search filter
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());

    // Separate year filters
    const yearFilters = activeFilters.filter(f => f.type === "year").map(f => f.value);
    const otherFilters = activeFilters.filter(f => f.type !== "year");

    if (yearFilters.length > 0 && !yearFilters.includes(String(quiz.year))) return false;

    const matchesFilters = otherFilters.every((filter) => {
      if (filter.type === "course") return quiz.course === filter.value;
      if (filter.type === "visibility") return quiz.visibility === filter.value;
      if (filter.type === "type") return quiz.type === filter.value;
      if (filter.type === "Drafts") return quiz.visibility === "Draft";
      return true;
    });

    return matchesFilters && matchesSearch;
  });

  return (
    <div>
      <div className='space-y-4 relative'>
        <h1 className='text-[#004883] font-[500] text-[24px]'>Quizzes</h1>
        <div className='border-b-[1px] border-[#C3C6CF] flex w-[70%]'>
          <div className={`text-[16px] cursor-pointer font-[500] p-2 px-3 ${view === 1 ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]" : " text-[#73777F] bg-white"}`} onClick={toggleView}>All Quizzes</div>
          <div className={`text-[16px] cursor-pointer p-2 px-3 font-[500] ${view === 2 ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]" : " text-[#73777F] bg-white"}`} onClick={toggleView}>Quiz Blocks</div>
        </div>
      </div>

      <div className='space-y-4 mt-4'>
        <div className='flex gap-4 mt-4'>
          <Stats value="3,200,000,000" label="Questions Uploaded" />
          <Stats value="320" label="Quizzes Uploaded" />
          <Stats value="3,200,000,000" label="Quiz Blocks" />
        </div>


        <div className="flex flex-wrap items-center gap-4 mt-2 w-full">
          <div className='w-full sm:w-[27%] relative bg-[#F2F3FA] border-[1px] flex items-center border-[#C3C6CF] rounded-[8px] h-[32px] max-w-xs'>
            <IoSearch className='mx-2 text-[#0F172A] opacity-50' />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full flex items-center outline-none border-none pl-8 rounded-[8px] h-full absolute top-0 text-[14px] text-[#73777F]'
              placeholder='Search for Content or User'
            />
          </div>

          {/* ✅ Reusable Filters component */}
          <Filters filterOptions={filterOptions} onFilterChange={setActiveFilters} />
            

        </div>
      </div>


      <div>
        {view === 1 ? (

          <div>
            {
              loading ?
              (
                <div className='w-full'>

                  <LoadingAnimation />


                </div>
              ) : 
           ( <QuizzesTable
              data={filteredData}
              tableheads={["Quiz Title", "Course", "Source", "Type", "Questions", "Year", "Visibility"]}
              ids={["title", "course", "source", "type", "questions", "year", "visibility"]}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={changePage}
              onRefresh={() => fetchData(currentPage)}
              rowsPerPage={quizzesPerPage}
              
            />)
}
          </div>
        ) : (
          <QuizBlocksScreen />
        )}
      </div>

      {showPop && (
        <UploadQuizPopUpFlow isOpen={showPop} onClose={() => setShowPop(false)} />
      )}
    </div>
  );
};

export default Quizzes;
