import Stats from "../components/stats";
import QuizzesTable from "../components/QuizzesTable";
import addIcon from "../assets/add icon.png";
import MailIcon from "../assets/mailIcon.png";
import RightArrowIcon from "../assets/rightArrowIcon.png";
import NotificationsIcon from "../assets/notificationsIcon.png";
import Items from "../assets/items icon.png";
import Filters from "../components/Filters"; // ← Reusable + Fixed!
import { useState } from "react";
import PopUp from "../components/popups/PopUp";
import { FiChevronRight } from "react-icons/fi";

const Campaigns = () => {
  const data = [
    {
      id: 1,
      image: MailIcon,
      livePosts: "Introductory Anatomy: All the basics you’ll ever need.",
      type: "Email",
      recipients: "Premium users",
      status: "Published",
      timeDate: "8:00AM / Oct 8, 2025",
      clicks: "5",
      img: Items,
    },
    {
      id: 2,
      image: RightArrowIcon,
      livePosts: "New Quiz Block Released!",
      type: "In-app",
      recipients: "All users",
      status: "Published",
      timeDate: "2:30PM / Oct 7, 2025",
      clicks: "42",
      img: Items,
    },
    {
      id: 3,
      image: NotificationsIcon,
      livePosts: "Free Trial Ending Soon",
      type: "Push",
      recipients: "Free users",
      status: "Published",
      timeDate: "9:15AM / Oct 6, 2025",
      clicks: "128",
      img: Items,
    },
    // ... more varied data
  ];

  const [showPopup1, setShowPopup1] = useState<number | null>(null);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [showRecipientsPopup, setShowRecipientsPopup] = useState(false);
  const [selectedCampaignType, setSelectedCampaignType] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // FILTER + SEARCH STATE (same as all other pages)
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  // Dynamic filter options from real data
  const typeOptions = Array.from(new Set(data.map(c => c.type)));        // ["Email", "In-app", "Push"]
  const recipientsOptions = Array.from(new Set(data.map(c => c.recipients)));
  const statusOptions = Array.from(new Set(data.map(c => c.status)));

  const filterOptions = [
    { label: "Type", value: "type", dropdown: true, options: typeOptions },
    { label: "Recipients", value: "recipients", dropdown: true, options: recipientsOptions },
    { label: "Status", value: "status", dropdown: true, options: statusOptions },
  ];

  // Same filtering logic as Quizzes/Users/Subscriptions
  const filteredData = data.filter((campaign) => {
    if (activeFilters.length === 0 && searchTerm.trim() === "") return true;

    const matchesSearch = campaign.livePosts.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = activeFilters.every((filter) => {
      if (filter.type === "type") return campaign.type === filter.value;
      if (filter.type === "recipients") return campaign.recipients === filter.value;
      if (filter.type === "status") return campaign.status === filter.value;
      return true;
    });

    return matchesSearch && matchesFilters;
  });

  const recipientTypes = [
    "All users",
    "Free users",
    "Premium users",
    "Unfrequent users",
    "Power users",
    "New sign ups",
  ];

  const campaignTypes = ["Email", "In-App notification", "Push notification"];

  return (
    <div className="space-y-5">
      <div className="space-y-10">
        <h1 className="text-[#004883] font-[500] text-2xl">Campaigns</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Stats value="12" label="Live Campaigns" className="w-48" />
          <Stats value="70%" label="Engagement" className="w-48" />
        </div>

        <button
          onClick={() => setShowPopup2(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D4E3FF] border border-[#0360AB] text-[#004883] rounded-lg hover:bg-[#c0d7ff] transition"
        >
          <img src={addIcon} alt="add" className="w-5 h-5" />
          New Campaign
        </button>

        {/* FILTER + SEARCH BAR */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full sm:w-80 h-10 pl-10 pr-4 bg-[#F2F3FA] border border-[#C3C6CF] rounded-lg text-sm outline-none"
            />
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Reusable Filters - NOW WORKS 100% */}
          <Filters
            filterOptions={filterOptions}
            onFilterChange={setActiveFilters}
          />
        </div>

        {/* Table with filtered data */}
        <div className="mt-6">
          <QuizzesTable
            data={filteredData}
            tableheads={["Live Posts", "Type", "Recipients", "Status", "Time/Date", "Clicks"]}
            ids={["livePosts", "type", "recipients", "status", "timeDate", "clicks"]}
            initialRowsPerPage={40}
            renderCell={{
              livePosts: (rowData) => (
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F2F3FA] rounded">
                    <img src={rowData.image} alt="" className="w-8 h-8" />
                  </div>
                  <span className="text-sm truncate max-w-md">{rowData.livePosts}</span>
                </div>
              ),
              clicks: (rowData) => (
                <div className="flex items-center justify-between">
                  <span className="text-sm">{rowData.clicks}</span>
                  <button
                    onClick={() => setShowPopup1(showPopup1 === rowData.id ? null : rowData.id)}
                    className="ml-4"
                  >
                    <img src={Items} alt="menu" className="w-5 h-5 cursor-pointer" />
                  </button>

                  {showPopup1 === rowData.id && (
                    <div className="absolute right-4 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Edit</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600">Delete</button>
                    </div>
                  )}
                </div>
              ),
              type: (rowData) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  rowData.type === "Email" ? "bg-blue-100 text-blue-800" :
                  rowData.type === "In-app" ? "bg-purple-100 text-purple-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {rowData.type}
                </span>
              ),
            }}
          />
        </div>
      </div>

      {/* Create Campaign Popup - unchanged */}
      {showPopup2 && (
        <PopUp
          title="Create New Campaign"
          onClose={() => setShowPopup2(false)}
          children={
            <div className="flex flex-col gap-6 py-4">
              {/* Campaign Type */}
              <div className="relative px-10">
                <button
                  onClick={() => setShowCampaignPopup(!showCampaignPopup)}
                  className="w-full flex justify-between items-center p-3 border border-[#C3C6CF] rounded-lg hover:bg-gray-50"
                >
                  <span className={`text-sm ${selectedCampaignType ? "text-[#1A1C1E]" : "text-[#73777F]"}`}>
                    {selectedCampaignType || "Campaign Type"}
                  </span>
                  <FiChevronRight className="text-[#1A1C1E]" />
                </button>
                {showCampaignPopup && (
                  <div className="absolute top-full left-10 right-10 mt-1 bg-white border border-[#C3C6CF] rounded-lg shadow-lg z-50">
                    {campaignTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedCampaignType(type);
                          setShowCampaignPopup(false);
                        }}
                        className="w-full text-left p-3 hover:bg-[#F1F5F9] text-sm"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Recipients */}
              <div className="relative px-10">
                <button
                  onClick={() => setShowRecipientsPopup(!showRecipientsPopup)}
                  className="w-full flex justify-between items-center p-3 border border-[#C3C6CF] rounded-lg hover:bg-gray-50"
                >
                  <span className={`text-sm ${selectedRecipients ? "text-[#1A1C1E]" : "text-[#73777F]"}`}>
                    {selectedRecipients || "Recipients"}
                  </span>
                  <FiChevronRight className="text-[#1A1C1E]" />
                </button>
                {showRecipientsPopup && (
                  <div className="absolute top-full left-10 right-10 mt-1 bg-white border border-[#C3C6CF] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {recipientTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedRecipients(type);
                          setShowRecipientsPopup(false);
                        }}
                        className="w-full text-left p-3 hover:bg-[#F1F5F9] text-sm"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <hr className="mx-10 border-[#C3C6CF]" />

              <div className="px-10">
                <label className="block text-sm font-medium text-[#1A1C1E] mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm"
                  placeholder="e.g. New Quiz Block Available!"
                />
              </div>

              <div className="px-10">
                <label className="block text-sm font-medium text-[#1A1C1E] mb-2">Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm resize-none"
                  placeholder="Write your message here..."
                />
              </div>
            </div>
          }
          footer={
            <button
              onClick={() => setShowPopup2(false)}
              className="bg-[#0360AB] hover:bg-[#035fabea] text-white px-6 py-2 rounded-lg"
            >
              Send Campaign
            </button>
          }
        />
      )}
    </div>
  );
};

export default Campaigns;