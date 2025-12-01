import Stats from "../components/stats";
import addIcon from "../assets/add icon.png";
import Pfp from "../assets/Users pfp.png";
import PopUp from "../components/popups/PopUp";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";
import SubscriptionsTable from "../components/SubscriptionsTable";
import { useApi } from "../hooks/useApi";
import { LoadingAnimation } from "./QuizBlocksScreen";

interface Subscription {
  id: string;
  email?: string;
  image: string;
  title: string ;
  plan: string;
  status: string;
  lastSeen? : string
  date : string;

}

interface SubscriptionSummary {
  freePlan: number;
  monthlyPremium: string ;
  yearlyPremium : string;
  avgMonthlySubscription: string;
  totalSubscriptionsThisMonth: number;
  subscriptionRate: string;

}

const Subscriptions = () => {
  const mockdata = [
    {
      id: 1,
      image: Pfp,
      email: "yemisiolaoba6@gmail.com",
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 2,
      image: Pfp,
      email: "yeiolaoba6@gmail.com",
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 3,
      image: Pfp,
      email: "olaoba69@gmail.com",
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 4,
      image: Pfp,
      email: "yemisiolaoba20@gmail.com",
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 5,
      image: Pfp,
      email: "siolaoba6@gmail.com",
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Failed",
      date: "Oct 8, 2025",
    },
  ];
  const { apiFetch } = useApi();
    const [loading, setLoading] = useState(false);
    const [totalPages , setTotalPages] = useState(1);
    const [currentPage , setCurrentPage] = useState(1);
    const [subscriptionsPerPage , setSubscriptionsPerPage] = useState(10);
    const [data , setData] = useState<Subscription[]>([])
    const [summary , setSummary] = useState<SubscriptionSummary>()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const maxLength = 100;


  const fetchData = async (page:number = 1) => {
       try {
        setLoading(true);
        console.log("Fetching Subscription data page :" , page)
        const res = await apiFetch('/api/admin/subscriptions');
        const result = await res.json();
        if (res.status !== 200) {
          throw new Error('Failed to fetch quizzes');
        }

        console.log(result);

//         {
//     "summary": {
//         "freePlan": 17,
//         "monthlyPremium": "6",
//         "yearlyPremium": "8",
//         "avgMonthlySubscription": "0.00",
//         "totalSubscriptionsThisMonth": 0,
//         "subscriptionRate": "0.0"
//     },
//     "subscriptions": []
// }
        const {subscriptions , pagination} = result
        setSummary(result.summary)
        const mappedData = subscriptions.map((item: any) => { 
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
        setSubscriptionsPerPage(pagination.quizzesPerPage)
        setData(mappedData);
        setData(result); // Uncomment and implement state if needed
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
      console.log(data)
      fetchData();
    }, []); // Empty dependency array to run only once on mount
  // Search + Filters state
  const [searchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  // ──────────────────────────────────────────────────────────────
  // Subscription-specific filter options
  // ──────────────────────────────────────────────────────────────
  const planOptions = Array.from(new Set(mockdata.map((s) => s.plan)));        // ["Premium"]
  const statusOptions = Array.from(new Set(mockdata.map((s) => s.status)));    // ["Success", "Failed"]

  const filterOptions = [
    { label: "Plan", value: "plan", dropdown: true, options: planOptions },
    { label: "Status", value: "status", dropdown: true, options: statusOptions },
  ];

  // ──────────────────────────────────────────────────────────────
  // Filtering logic (now works with subscription data)
  // ──────────────────────────────────────────────────────────────
  const filteredData = mockdata.filter((subscription) => {
    if (activeFilters.length === 0 && searchTerm.trim() === "") return true;

    // Search in user name
    const matchesSearch = subscription.title.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply active filters
    const matchesFilters = activeFilters.every((filter) => {
      if (filter.type === "plan") return subscription.plan === filter.value;
      if (filter.type === "status") return subscription.status === filter.value;
      return true;
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-5">
      <div className="space-y-8">
        <h1 className="text-[#004883] font-[500]">Subscription</h1>

        <div className="flex items-center gap-3">
          <button
            className="rounded-[16px] border-[1px] py-4 px-5 flex flex-col items-center cursor-pointer space-y-1 gap-2 h-21 w-30 border-[#C3C6CF] justify-center bg-[#F8F9FF]"
            onClick={() => setShowPopup(true)}
          >
            <img src={addIcon} alt="add" />
            <div className="text-[11px] font-[500] text-[#73777F]">Add new plan</div>
          </button>

          <Stats value={summary?.freePlan} label="Free Plan" />
          <Stats value={summary?.monthlyPremium} label="Monthly Premium" />
          <Stats value={summary?.yearlyPremium} label="Yearly Premium" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#F8F9FF] border border-[#C3C6CF] rounded-[4px] p-3 text-center">
          <div className="text-[11px] font-[400]">Avg. monthly<br />subscription</div>
          <div className="text-[16px] font-[500]">#{summary?.avgMonthlySubscription}</div>
        </div>
        <div className="bg-[#F8F9FF] border border-[#C3C6CF] rounded-[4px] p-3 text-center">
          <div className="text-[11px] font-[400]">Total subscriptions<br />this month</div>
          <div className="text-[16px] font-[500]">{summary?.totalSubscriptionsThisMonth}</div>
        </div>
        <div className="bg-[#F8F9FF] border border-[#C3C6CF] rounded-[4px] p-3 text-center">
          <div className="text-[11px] font-[400]">Subscription rate</div>
          <div className="text-[16px] font-[500]">{summary?.subscriptionRate}</div>
        </div>
       
      </div>

      {/* Filter + Table */}
      <div className="relative">
        <Filters
          filterOptions={filterOptions}
          onFilterChange={setActiveFilters}
          // searchTerm={searchTerm}
          // onSearchChange={setSearchTerm}   // assuming your Filters component supports search
        />

        {
                      loading ?
                      (
                        <div className='w-full'>
        
                          <LoadingAnimation />
        
        
                        </div>
                      ) : (
        <SubscriptionsTable
          onPageChange={changePage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={filteredData}  
          tableheads={["User", "Plan", "Status", "Date"]}
          ids={["title", "plan", "status", "date"]}
          initialRowsPerPage={subscriptionsPerPage}
          renderCell={{
            title: (rowData) => (
              <div className="flex items-center gap-4">
                {rowData.image && (
                  <img
                    src={rowData.image}
                    alt={rowData.title}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                <span className="truncate">{rowData.title}</span>
              </div>
            ),
            status: (rowData) => (
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  rowData.status === "Success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {rowData.status}
              </span>
            ),
          }}
        />)
}
      </div>

      {/* Create New Plan Popup */}
      {showPopup && (
        <PopUp
          title="Create New Plan"
          onClose={() => setShowPopup(false)}
          children={
            <div className="flex flex-col gap-6 w-[500px]">
              {/* Title */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-[#1A1C1E]">Title</label>
                <textarea
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  placeholder="e.g. Monthly Premium Plan"
                  className="border border-[#C3C6CF] rounded-lg p-3 text-sm resize-none h-20"
                  maxLength={maxLength}
                />
                <div className="absolute bottom-2 right-3 text-xs text-[#73777F]">
                  {titleValue.length}/{maxLength}
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#1A1C1E]">Price</label>
                <input
                  type="text"
                  placeholder="e.g. 5000"
                  className="border border-[#C3C6CF] rounded-lg p-3 text-sm"
                />
              </div>

              {/* Validity Period */}
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-medium text-[#1A1C1E]">Validity Period</label>
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="border border-[#C3C6CF] rounded-lg p-3 text-sm cursor-pointer"
                  style={{ color: selectedValue ? "#000" : "#73777F" }}
                >
                  <option value="" disabled>
                    How long will the subscription last?
                  </option>
                  <option value="1 week">1 week</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>
          }
          footer={
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#0360AB] hover:bg-[#035fabea] text-white px-6 py-2 rounded-lg transition"
            >
              Create
            </button>
          }
        />
      )}
    </div>
  );
};

export default Subscriptions;