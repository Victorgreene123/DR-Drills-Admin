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

  const [showPopup, setShowPopup] = useState(false);

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

        <div className="flex items-center justify-center gap-2 cursor-pointer w-[143px] h-[40px] bg-[#D4E3FF] border text-[#004883] font-normal border-[#0360AB] rounded-[8px] p-2">
          <div>
            <p>New Campaign</p>
          </div>

          <div>
            <img src={addIcon} alt="saddIcon" />
          </div>
        </div>

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
                      <button onClick={() => setShowPopup(true)}>
                        <img
                          src={rowData.img}
                          alt={rowData.clicks}
                          style={{
                            objectFit: "cover",
                            objectPosition: "right",
                          }}
                        />
                      </button>
                    )}

                    {
                      showPopup && (
                        <div className="w-[200px] absolute bottom-0 top-7 right-2 h-[74px] shadow-2xl rounded-[8px] p-2 bg-white  border-[#73777F] ">
                          <div className="hover:bg-[#F1F5F9]  rounded-[8px] py-2 pr-2 pl-4">Delete</div>
                          <div className="hover:bg-[#F1F5F9]  rounded-[8px] py-2 pr-2 pl-4">Edit details</div>
                        </div>
                      ) 
                    }
                  </div>
                ),
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Campaigns;
