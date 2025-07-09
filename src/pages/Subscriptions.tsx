import Stats from "../components/stats";
import addIcon from "../assets/add icon.png";
import Pfp from "../assets/Users pfp.png";
import { IoFilterOutline } from "react-icons/io5";
import QuizzesTable from "../components/QuizzesTable";
import PopUp from "../components/popups/PopUp";
import { useState } from "react";

const Subscriptions = () => {
  const data = [
    {
      id: 1,
      image: Pfp,
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 2,
      image: Pfp,
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 3,
      image: Pfp,
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 4,
      image: Pfp,
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Success",
      date: "Oct 8, 2025",
    },
    {
      id: 5,
      image: Pfp,
      title: "Yemisi Olaoba",
      plan: "Premium",
      status: "Failed",
      date: "Oct 8, 2025",
    },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [titleValue, setTitleValue] = useState("");
  const maxLength = 100;

  return (
    <div className="space-y-5">
      <div className="space-y-8">
        <h1 className="text-[#004883] font-[500]">Subscription</h1>
        <div className=" flex items-center gap-3">
          <Stats
            value={
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowPopup(true);
                }}
              >
                <img src={addIcon} style={{}} />
              </button>
            }
            label="Add new plan"
            className="flex flex-col w-30 cursor-pointer h-21  items-center gap-2 justify-center"
          />
          <Stats value={"#0"} label="Free Plan" />
          <Stats value={"5,000"} label="Monthly Premium" />
          <Stats value={"5,000"} label="Yearly Premium" />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="text-xl flex flex-col bg-[#F8F9FF] gap-4 text-[#1A1C1E] text-[24px] border p-3 border-[#C3C6CF] rounded-[4px] w-1/8 ">
          <div className="text-[11px] font-[400]">
            Avg. monthly <br /> subscription
          </div>
          <div className="text-[16px] font-[500] ">#30,000</div>
        </div>

        <div className="text-xl flex flex-col bg-[#F8F9FF] gap-4 text-[#1A1C1E] text-[24px] border p-3 border-[#C3C6CF] rounded-[4px] w-1/8 ">
          <div className="text-[11px] font-[400]">
            Total subscriptions <br /> this month
          </div>
          <div className="text-[16px] font-[500] ">30,000</div>
        </div>

        <div className="text-xl flex flex-col bg-[#F8F9FF] gap-4 text-[#1A1C1E] text-[24px] border p-3 border-[#C3C6CF] rounded-[4px] w-1/8 ">
          <div className="text-[11px] font-[400]">Subscription rate </div>
          <div className="text-[16px] font-[500] ">73.4%</div>
        </div>

        <div className="text-xl flex flex-col bg-[#F8F9FF] gap-4 text-[#1A1C1E] text-[24px] border p-3 border-[#C3C6CF] rounded-[4px] w-1/8 ">
          <div className="text-[11px] font-[400]">Subscription rate </div>
          <div className="text-[16px] font-[500] ">73.4%</div>
        </div>
      </div>

      {/*Filter Section */}
      <div className="relative">
        <button
          className="bg-[#F2F3FA] border-[1px] cursor-pointer border-[#C3C6CF] rounded-[8px] px-[12px] h-[32px] flex items-center gap-2 text-[#43474E] text-[13px] min-w-[100px]"
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
            tableheads={["User", "Plan", "Status", "Date"]}
            ids={["title", "plan", "status", "date"]}
            initialRowsPerPage={40}
            renderCell={{
              title: (
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
                    <img
                      src={rowData.image}
                      alt={rowData.title}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "right",
                      }}
                    />
                  )}
                  {/* This <span> holds the user's name */}
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {rowData.title}
                  </span>
                </div>
              ),
            }}
          />
        </div>
      </div>

      {showPopup && (
        <PopUp
          title="Create New Plan"
          onClose={() => {
            // Handle close logic here
            setShowPopup(false);
          }}
          children={
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col relative gap-2">
                <label className="text-sm font-medium text-[#1A1C1E]">
                  Title
                </label>
                <textarea
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  placeholder="e.g monthly plan"
                  className="border w-[478px] h-[80px] border-[#C3C6CF] rounded-[8px] p-2 text-sm"
                />
                <div className="absolute bottom-2 right-3 text-xs text-[#73777F]">
                  {titleValue.length}/{maxLength}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#1A1C1E]">
                  Price
                </label>
                <textarea
                  placeholder="An amount in naira"
                  className="border w-[478px] h-[40px] border-[#C3C6CF] rounded-[8px] p-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#1A1C1E]">
                  Validity Period
                </label>

                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="border cursor-pointer w-[478px] h-[40px] border-[#C3C6CF] rounded-[8px] p-2 text-sm "
                  style={{ color: selectedValue ? "#000" : "#73777F" }}
                  name="text"
                  id=""
                >
                  <option value="" disabled>
                    How long will the subscription last?
                  </option>
                  <option value="1 week">1 week</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months </option>
                  <option value="3 months">3 months</option>
                  <option value="1 year">1 year</option>
                  <option value="6 months">6 months</option>
                </select>
              </div>
            </div>
          }
          footer={
            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="bg-[#0360AB] text-white rounded-[8px] px-4 py-2 cursor-pointer hover:bg-[#035fabea]"
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
