import Stats from "../components/stats";
import { IoFilterOutline } from "react-icons/io5";
// import { FaChevronDown } from "react-icons/fa";
import QuizzesTable from "../components/QuizzesTable";
import addIcon from "../assets/add icon.png";
import Items from "../assets/items icon.png";
import MailIcon from "../assets/mailIcon.png";
import RightArrowIcon from "../assets/rightArrowIcon.png";
import NotificationsIcon from "../assets/notificationsIcon.png";
import { useState } from "react";
import PopUp from "../components/popups/PopUp";
import { FiChevronRight } from "react-icons/fi";

const Campaigns = () => {
  const data = [
    {
      id: 1,
      image: MailIcon,
      livePosts: "Introductory Anatomy: All the basics you’ll every need. ",
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
      livePosts: "Introductory Anatomy: All the basics you’ll every need. ",
      type: "In-app",
      recipients: "Premium users",
      status: "Published",
      timeDate: "8:00AM / Oct 8, 2025",
      clicks: "5",
      img: Items,
    },
    {
      id: 3,
      image: RightArrowIcon,
      livePosts: "Introductory Anatomy: All the basics you’ll every need. ",
      type: "In-app",
      recipients: "Premium users",
      status: "Published",
      timeDate: "8:00AM / Oct 8, 2025",
      clicks: "5",
      img: Items,
    },
    {
      id: 4,
      image: NotificationsIcon,
      livePosts: "Introductory Anatomy: All the basics you’ll every need. ",
      type: "Push",
      recipients: "Premium users",
      status: "Published",
      timeDate: "8:00AM / Oct 8, 2025",
      clicks: "5",
      img: Items,
    },
    {
      id: 5,
      image: NotificationsIcon,
      livePosts: "Introductory Anatomy: All the basics you’ll every need. ",
      type: "Push",
      recipients: "Premium users",
      status: "Published",
      timeDate: "8:00AM / Oct 8, 2025",
      clicks: "5",
      img: Items,
    },
    {
      id: 5,
      image: MailIcon,
      livePosts: "Introductory Anatomy: All the basics you’ll every need. ",
      type: "Email",
      recipients: "Premium users",
      status: "Published",
      timeDate: "8:00AM / Oct 8, 2025",
      clicks: "5",
      img: Items,
    },
  ];

  const [showPopup1, setShowPopup1] = useState(null);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [selectedCampaignType, setSelectedCampaignType] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState("");
  const [showRecipientsPopup, setShowRecipientsPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const recipientTypes = [
    "All users",
    "Free users",
    "Premium users",
    "Unfrequent users",
    "Power users",
    "New sign ups",
  ];

  const campaignTypes = ["Email", "In-App notification", "Push notification"];

  const handleCampaignTypeSelect = (type: string) => {
    setSelectedCampaignType(type as string);
    setShowCampaignPopup(false);
  };

  const handleRecipientsSelect = (type: string) => {
    setSelectedRecipients(type);
    setShowRecipientsPopup(false);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-10">
        <h1 className="text-[#004883] font-[500]">Campaigns</h1>
        <div className=" flex items-center gap-3">
          <Stats
            value={"12"}
            label="Live Campaigns"
            className="w-[188px] h-[84px]"
          />
          <Stats
            value={"70%"}
            label="Engagement"
            className="w-[188px] h-[84px]"
          />
        </div>

        <button className="flex items-center justify-center gap-2 cursor-pointer w-[143px] h-[40px] bg-[#D4E3FF] border text-[#004883] font-normal border-[#0360AB] rounded-[8px] p-2" onClick={() => setShowPopup2(true)}>
          <button
            className="cursor-pointer"
            
          >
            <p>New Campaign</p>
          </button>

          <div>
            <img src={addIcon} alt="saddIcon" />
          </div>
        </button>

        {/*Filter Section */}
        <div className="relative">
          <button
            className="bg-[#F2F3FA] cursor-pointer border-[1px] border-[#C3C6CF] rounded-[8px] px-[12px] h-[32px] flex items-center gap-2 text-[#43474E] text-[13px] min-w-[100px]"
            // onClick={() => {
            //   setShowFilterDropdown((v) => !v);
            //   setDropdownType(null);
            // }}
          >
            Add Filter
            <IoFilterOutline className="ml-1" />
          </button>

          <div>
            <QuizzesTable
              data={data}
              tableheads={[
                "Live Posts",
                "Type",
                "Recipients",
                "Status",
                "Time/Date",
                "Clicks",
              ]}
              ids={[
                "livePosts",
                "type",
                "recipients",
                "status",
                "timeDate",
                "clicks",
              ]}
              initialRowsPerPage={40}
              renderCell={{
                livePosts: (
                  rowData //This is where the title is modified to accept a pfp
                ) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    {rowData.image && (
                      <div className="px-9 py-5 bg-[#F2F3FA]">
                        <img
                          src={rowData.image}
                          alt={rowData.livePosts}
                          style={{
                            objectFit: "cover",
                            objectPosition: "right",
                          }}
                        />
                      </div>
                    )}
                    {/* This <span> holds the user's name */}
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                      }}
                    >
                      {rowData.livePosts}
                    </span>
                  </div>
                ),
                clicks: (
                  rowData //This is where the title is modified to accept a pfp
                ) => (
                  <div className="flex relative justify-between items-center">
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                      }}
                    >
                      {rowData.clicks}
                    </span>

                    {rowData.image && (
                      <button
                        onClick={() =>
                          setShowPopup1(
                            showPopup1 === rowData.id ? null : rowData.id
                          )
                        }
                      >
                        <img
                          src={rowData.img}
                          alt={rowData.clicks}
                          style={{
                            objectFit: "cover",
                            cursor: "pointer",
                            objectPosition: "right",
                          }}
                        />
                      </button>
                    )}

                    {showPopup1 === rowData.id && (
                      <div className="w-[200px] absolute bottom-0 top-2 right-3 h-[74px] shadow-2xl rounded-[8px] p-2 bg-white  border-[#73777F] ">
                        <div className="hover:bg-[#F1F5F9]  rounded-[8px] py-2 pr-2 pl-4">
                          Delete
                        </div>
                        <div className="hover:bg-[#F1F5F9]  rounded-[8px] py-2 pr-2 pl-4">
                          Edit details
                        </div>
                      </div>
                    )}
                  </div>
                ),
              }}
            />
          </div>
        </div>

        {showPopup2 && (
          <PopUp
            title="Create New Plan"
            onClose={() => {
              // Handle close logic here
              setShowPopup2(false);
            }}
            children={
              <div className="flex py-3 flex-col gap-4">
                  <div className="relative  px-10">
                    <button
                      onClick={() => setShowCampaignPopup(!showCampaignPopup)}
                      className="w-85 cursor-pointer flex items-center justify-between p-3 border border-[#C3C6CF] rounded-lg text-left hover:bg-gray-50"
                    >
                      <span
                        className={
                          selectedCampaignType
                            ? "text-[#1A1C1E]"
                            : "text-[#73777F]"
                            
                        }
                         style={{ fontSize: "14px",
                          color: selectedCampaignType ? "#1A1C1E" : "#43474E"
                          }}
                      >
                        {selectedCampaignType || "Campaign Type"}
                      </span>
                      <FiChevronRight size={20} className="text-[#1A1C1E]" />
                    </button>

                    {showCampaignPopup && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#C3C6CF] rounded-lg shadow-lg z-10">
                        {campaignTypes.map((type, index) => (
                          <button
                            key={index}
                            onClick={() => handleCampaignTypeSelect(type)}
                            className="w-full text-left p-3 hover:bg-[#F1F5F9] text-sm text-[#1A1C1E] border-b border-gray-100 last:border-b-0"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recipients */}
                  <div className="relative  px-10">
                    <button
                      onClick={() =>
                        setShowRecipientsPopup(!showRecipientsPopup)
                      }
                      className="w-85 cursor-pointer flex items-center justify-between p-3 border border-[#C3C6CF] rounded-lg text-left hover:bg-gray-50"
                    >
                      <span
                        className={
                          selectedRecipients
                            ? "text-[#1A1C1E]"
                            : "text-[#73777F]"
                        }
                        style={{ fontSize: "14px",
                          color: selectedCampaignType ? "#1A1C1E" : "#43474E"
                          }}
                      >
                        {selectedRecipients || "Recipients"}
                      </span>
                      <FiChevronRight size={20} className="text-[#1A1C1E]" />
                    </button>

                    {showRecipientsPopup && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#C3C6CF] rounded-lg shadow-lg z-10">
                        {recipientTypes.map((type, index) => (
                          <button
                            key={index}
                            onClick={() => handleRecipientsSelect(type)}
                            className="w-full text-left p-3 hover:bg-[#F1F5F9] text-sm text-[#1A1C1E] border-b border-gray-100 last:border-b-0"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <hr className="w-[575px] -ml-7 text-[#C3C6CF]" />

                  {/* Title */}
                  <div className=" px-10">
                    <label className="block text-sm font-medium text-[#1A1C1E] mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Body */}
                  <div className=" px-10">
                    <label className="block text-sm font-medium text-[#1A1C1E] mb-2">
                      Body
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={8}
                      className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
              </div>
            }
            footer={
              <button
                onClick={() => {
                  setShowPopup2(false);
                }}
                className="bg-[#0360AB] text-white rounded-[8px] px-4 py-2 cursor-pointer hover:bg-[#035fabea]"
              >
                Send
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Campaigns;
