import Stats from "../components/stats";
import addIcon from "../assets/add icon.png";
import MailIcon from "../assets/mailIcon.png";
import RightArrowIcon from "../assets/rightArrowIcon.png";
import NotificationsIcon from "../assets/notificationsIcon.png";
import Items from "../assets/items icon.png";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";

import CampaignsTable from "../components/CampaignsTable";
import { FaEllipsisV } from "react-icons/fa";
import { useApi } from "../hooks/useApi";
import toast, { Toaster } from 'react-hot-toast';
import { LoadingAnimation } from "./QuizBlocksScreen";
import EditCampaignPopup from "../components/popups/EditCampaignPopup";
import CreateCampaignPopup from "../components/popups/CreateCampaignPopup";

interface Campaign {
  id: number;
  avatar: string;
  admin_id: number;
  title: string;
  type: string;
  published: number;
  recipients: string;
  created_at: string;
  clicks: number;
  body: string;
  link: string;
}

const Campaigns = () => {
  const { apiFetch } = useApi();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup1, setShowPopup1] = useState<number | null>(null);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [deleting, setDeleting] = useState<number | null>(null);

  // FILTER + SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  // Fetch campaigns
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/all-campaign');
      const response = await res.json();
      
      if (response.campaigns) {
        setCampaigns(response.campaigns);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  // Delete campaign
  const handleDelete = async (campaignId: number) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;

    try {
      setDeleting(campaignId);
      const res = await apiFetch(`/api/admin/campaign/${campaignId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Campaign deleted successfully');
        setCampaigns(campaigns.filter(c => c.id !== campaignId));
        setShowPopup1(null);
      } else {
        const result = await res.json();
        toast.error(result.message || 'Failed to delete campaign');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('An error occurred while deleting');
    } finally {
      setDeleting(null);
    }
  };

  // Open edit popup
  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowEditPopup(true);
    setShowPopup1(null);
  };

  // Get campaign type icon
  const getCampaignIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email': return MailIcon;
      case 'in-app':
      case 'in_app': return RightArrowIcon;
      case 'push': return NotificationsIcon;
      default: return Items;
    }
  };

  // Map data for table
  const tableData = campaigns.map(c => ({
    ...c,
    image: getCampaignIcon(c.type),
    livePosts: c.title,
    status: c.published ? "Published" : "Draft",
    timeDate: new Date(c.created_at).toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    img: Items,
  }));

  // Dynamic filter options from real data
  const typeOptions = Array.from(new Set(campaigns.map(c => c.type)));
  const recipientsOptions = Array.from(new Set(campaigns.map(c => c.recipients.replace(/_/g, ' '))));
  const statusOptions = ["Published", "Draft"];

  const filterOptions = [
    { label: "Type", value: "type", dropdown: true, options: typeOptions },
    { label: "Recipients", value: "recipients", dropdown: true, options: recipientsOptions },
    { label: "Status", value: "status", dropdown: true, options: statusOptions },
  ];

  // Filter logic
  const filteredData = tableData.filter((campaign) => {
    if (activeFilters.length === 0 && searchTerm.trim() === "") return true;

    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = activeFilters.every((filter) => {
      if (filter.type === "type") return campaign.type === filter.value;
      if (filter.type === "recipients") return campaign.recipients.replace(/_/g, ' ') === filter.value;
      if (filter.type === "status") return campaign.status === filter.value;
      return true;
    });

    return matchesSearch && matchesFilters;
  });



  // Calculate stats
  const liveCampaigns = campaigns.filter(c => c.published === 1).length;
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalCampaigns = campaigns.length;
  const engagement = totalCampaigns > 0 ? ((totalClicks / totalCampaigns) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-5">
      <Toaster position="top-right" />
      
      <div className="space-y-10">
        <h1 className="text-[#004883] font-[500] text-2xl">Campaigns</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Stats value={liveCampaigns.toString()} label="Live Campaigns" className="w-48" />
          <Stats value={`${engagement}%`} label="Engagement" className="w-48" />
          <Stats value={totalClicks.toLocaleString()} label="Total Clicks" className="w-48" />
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
          {loading ? (
            <LoadingAnimation />
          ) : (
            <CampaignsTable
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
                  <div className="flex items-center justify-between relative">
                    <span className="text-sm">{rowData.clicks}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPopup1(showPopup1 === rowData.id ? null : rowData.id);
                      }}
                      className="ml-4 p-1 hover:bg-gray-100 rounded"
                      disabled={deleting === rowData.id}
                    >
                      <FaEllipsisV />
                    </button>

                    {showPopup1 === rowData.id && (
                      <div 
                        ref={(el) => {
                          if (el) {
                            const handleClickOutside = (e: MouseEvent) => {
                              if (!el.contains(e.target as Node)) {
                                setShowPopup1(null);
                              }
                            };
                            document.addEventListener('mousedown', handleClickOutside);
                            return () => document.removeEventListener('mousedown', handleClickOutside);
                          }
                        }}
                        className="absolute right-0 top-8 w-40 bg-white shadow-xl rounded-lg border border-gray-200 z-50 py-1"
                      >
                        <button 
                          onClick={() => handleEdit(campaigns.find(c => c.id === rowData.id)!)} // Directly call handleEdit
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-sm text-left"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(rowData.id)}
                          disabled={deleting === rowData.id}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 text-left disabled:opacity-50"
                        >
                          {deleting === rowData.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Deleting...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Delete</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ),
                type: (rowData) => (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    rowData.type === "email" ? "bg-blue-100 text-blue-800" :
                    rowData.type === "in-app" || rowData.type === "in_app" ? "bg-purple-100 text-purple-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {rowData.type.replace(/_/g, '-')}
                  </span>
                ),
                status: (rowData) => (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rowData.status === "Published" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {rowData.status}
                  </span>
                ),
                recipients: (rowData) => (
                  <span className="capitalize">{rowData.recipients.replace(/_/g, ' ')}</span>
                ),
              }}
            />
          )}
        </div>
      </div>

      {/* Create Campaign Popup */}
      <CreateCampaignPopup
        isOpen={showPopup2}
        onClose={() => setShowPopup2(false)}
        onSuccess={() => {
          fetchCampaigns();
        }}
      />

      {/* Edit Campaign Popup (separate component) */}
      <EditCampaignPopup
        isOpen={showEditPopup}
        campaign={editingCampaign}
        onClose={() => {
          setShowEditPopup(false);
          setEditingCampaign(null);
        }}
        onSuccess={() => {
          fetchCampaigns();
        }}
      />
    </div>
  );
};

export default Campaigns;