import React from "react";
import Stats from "./stats";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
  Pie,
  PieChart
} from "recharts";


const RevenueMetrics:React.FC = () => {
    const data = [
  { date: "Apr 6", value: 12 },
  { date: "Apr 11", value: 18 },
  // ... more data points ...
  { date: "Jun 30", value: 15 },
  { date: "Jul 7", value: 25 },
  { date: "Jul 14", value: 5 },
  { date: "Jul 21", value: 20 },
  { date: "Jul 28", value: 18 },
  { date: "Aug 4", value: 9},
  { date: "Aug 11", value: 13 },
  { date: "Aug 18", value: 16 },
  { date: "Aug 25", value:22 },

  
];
  const users = [
        { id: 1, name: "John", type: "Premium" },
        { id: 2, name: "Jane", type: "Free" },
        { id: 3, name: "Alice", type: "Premium" },
        { id: 4, name: "Bob", type: "Premium" },
        { id: 5, name: "Eve", type: "Free" },
        { id: 6, name: "Sam", type: "Premium" },
        // ...add more users as needed
    ];
    const premiumCount = users.filter(u => u.type === "Premium").length;
    const freeCount = users.filter(u => u.type === "Free").length;

    // Pie chart data based on mock users
    const pieData = [
        { name: 'Premium', value: premiumCount, color: '#165BAA' },
        { name: 'Free', value: freeCount, color: '#FEC7B4' },
    ];


    return(
            <div className= "w-full ">
                <div className="my-3 flex items-center gap-3 ">
                    <Stats value="450" label="Active Subscriptions" />
                    <Stats value="300" label="New Subscriptions" />
                    <Stats value="234,564" label="Recurring subs" />
                    <Stats value="250,000" label="Avg. recurring revenue" />
                    <Stats value="248,960h" label="Growth Rate (MoM)" />




                </div>

                <div className="w-full bg-[#FFFFFF] rounded-[10px] border-[1px] border-[#C3C6CF] p-2 px-6">
                    <div>
                        <h2 className="text-[#1A1C1E] text-[18px] font-[600]">Revenue over Time</h2>
                        <p className="text-[#73777F] text-[14px]">Showing revenue over the past month</p>
                    </div>

                      <ResponsiveContainer width="100%" height={330}>
    <LineChart data={data}>
      <CartesianGrid stroke="#444" strokeDasharray="3 3" />
      <XAxis dataKey="date" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#006B5D" width={4} dot={false} />
    </LineChart>
  </ResponsiveContainer>
                </div>

                <div className="my-5 flex items-start justify-between w-full w-[70%] gap-[2%] ">

                <div className="w-full bg-[#FFFFFF] w-[58%] rounded-[10px] border-[1px] border-[#C3C6CF] p-2 px-6">
                    <h2 className="font-[600] text-[16px] ">Revenue by Plan</h2>

                    <table className="w-full">
                        <thead className="text-[#43474E] text-[14px] w-full border-b-[1px]  border-[#C3C6CF] ">
                            <th className="font-[400] py-2 text-left">Plan name</th>
                            <th className="font-[400] py-2 text-left">Users </th>
                            <th className="font-[400] py-2 text-left">Revenue</th>
                            <th className="font-[400] py-2 text-left">% of total</th>
                        </thead>
                        <tbody>
                            <tr className="text-[#1A1C1E] text-[14px] w-full border-b-[1px]  border-[#C3C6CF]">
                                    <td className="py-2">Monthly Premium </td>
                                    <td className="py-2">147,987</td>
                                    <td className="py-2">$250.00</td>
                                    <td className="py-2">$250.00</td>
                            </tr>
                             <tr className="text-[#1A1C1E] text-[14px] w-full border-b-[1px]  border-[#C3C6CF]">
                                    <td className="py-2">Yearly Premium </td>
                                    <td className="py-2">6,986</td>
                                    <td className="py-2">$250.00</td>
                                    <td className="py-2">$250.00</td>
                            </tr> <tr className="text-[#1A1C1E] text-[14px] w-full border-b-[1px]  border-[#C3C6CF]">
                                    <td className="py-2">Free Premium </td>
                                    <td className="py-2">147,987</td>
                                    <td className="py-2">$250.00</td>
                                    <td className="py-2">$250.00</td>
                            </tr>
                        </tbody>
                    </table>


                    </div>
                   <div className='w-[40%] border-[1px] border-[#C3C6CF] rounded-[12px] h-[320px] p-0 bg-white overflow-hidden'>
                                          <div className="border-b border-[#E5E7EB] px-4 py-2 text-center font-semibold text-[#1A1C1E] text-[15px]">
                                              Free/Premium users
                                          </div>
                                          <div className="flex flex-col items-center justify-center py-4">
                                              {/* Pie chart using recharts */}
                                              <div className="w-[120px] h-[120px]">
                                                  <ResponsiveContainer width="100%" height="100%">
                                                      <PieChart>
                                                          <Pie
                                                              data={pieData}
                                                              dataKey="value"
                                                              nameKey="name"
                                                              cx="50%"
                                                              cy="50%"
                                                              innerRadius={40}
                                                              outerRadius={60}
                                                              paddingAngle={0}
                                                              startAngle={90}
                                                              endAngle={-270}
                                                          >
                                                              {pieData.map((entry) => (
                                                                  <Cell key={entry.name} fill={entry.color} />
                                                              ))}
                                                          </Pie>
                                                      </PieChart>
                                                  </ResponsiveContainer>
                                              </div>
                                              {/* Legend */}
                                              <div className="flex items-center justify-center gap-4 mt-4 mb-2 text-xs">
                                                  <div className="flex items-center gap-1">
                                                      <span className="w-3 h-3 rounded bg-[#165BAA] inline-block"></span>
                                                      <span>Premium</span>
                                                  </div>
                                                  <div className="flex items-center gap-1">
                                                      <span className="w-3 h-3 rounded bg-[#FEC7B4] inline-block"></span>
                                                      <span>Free</span>
                                                  </div>
                                              </div>
                                              <div className="text-xs text-[#1A1C1E] flex items-center gap-1">
                                                  Trending up by <span className="font-semibold">5.2%</span> this month
                                                  <svg width="16" height="16" className="inline ml-1" viewBox="0 0 16 16">
                                                      <path d="M2 10l4-4 3 3 5-5" stroke="#165BAA" strokeWidth="2" fill="none" />
                                                      <circle cx="2" cy="10" r="1" fill="#165BAA" />
                                                      <circle cx="6" cy="6" r="1" fill="#165BAA" />
                                                      <circle cx="9" cy="9" r="1" fill="#165BAA" />
                                                      <circle cx="14" cy="4" r="1" fill="#165BAA" />
                                                  </svg>
                                              </div>
                                          </div>
                                      </div>
                      </div>
                      </div>
               


            
    )
}

export default RevenueMetrics;