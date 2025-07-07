import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import DashboardSection from "../components/dashboardSection";
import Stats from "./stats";


const UserMetrics: React.FC = () => {

  const [chartView, setChartView] = React.useState(1);
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

        <div className="w-full">

             <div className="flex w-full gap-3 ">
                    <Stats value="384" label="Active Users" />
                    <Stats value="1,200" label="New Users" />
                    <Stats value="2,500" label="New Subscriptions" />
                    <Stats value="20%" label="User Churn Rate" />
                    <Stats value="7h 8m" label="Avg. screentime" />
                  </div>

             <div className="w-full flex items-center gap-[2%] mb-6 ">
      <div className="w-[68%] border-[1px] border-[#C3C6CF] rounded-[12px] p-4 mt-6">
        <h2 className="text-[#43474E] font-[500] text-[16px] ">
          Most Active Hours
        </h2>
        <div className="border-b-[1px] my-3 border-[#C3C6CF] flex  w-[50%] justify-between items-center">
          <div className="flex items-center">
            <div
              className={`text-[16px] cursor-pointer font-[500] p-1 px-3 ${
                chartView === 1
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(1)}
            >
              Mon
            </div>
            <div
              className={`text-[16px] cursor-pointer  p-1 px-3 font-[500] ${
                chartView === 2
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(2)}
            >
              Tue
            </div>
            <div
              className={`text-[16px] cursor-pointer  p-1 px-3 font-[500] ${
                chartView === 3
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(3)}
            >
              Wed
            </div>
            <div
              className={`text-[16px] cursor-pointer  p-1 px-3 font-[500] ${
                chartView === 4
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(4)}
            >
              Thu
            </div>
            <div
              className={`text-[16px] cursor-pointer  p-1 px-3 font-[500] ${
                chartView === 5
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(5)}
            >
              Fri
            </div>
            <div
              className={`text-[16px] cursor-pointer  p-1 px-3 font-[500] ${
                chartView === 6
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(6)}
            >
              Sat
            </div>
            <div
              className={`text-[16px] cursor-pointer  p-1 px-3 font-[500] ${
                chartView === 7
                  ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]"
                  : " text-[#73777F] bg-white "
              } `}
              onClick={() => setChartView(7)}
            >
              Sun
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={600}
            height={300}
            data={[
              { users: 400, hours: "11:00" },
              { users: 300, hours: "12:00" },
              { users: 200, hours: "13:00" },
              { users: 278, hours: "14:00" },
              { users: 189, hours: "15:00" },
                { users: 239, hours: "16:00" },
                { users: 349, hours: "17:00" },
                { users: 200, hours: "18:00" },
                { users: 300, hours: "19:00" },
                { users: 400, hours: "20:00" },
                

            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hours" />
            <YAxis />
            <Bar dataKey="users" fill="#0360AB" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>


       <div className='w-[30%] border-[1px] border-[#C3C6CF] rounded-[12px] h-[320px] p-0 bg-white overflow-hidden'>
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

      <div>
            <div className='w-[90%]  flex items-center gap-3'>
            
            <DashboardSection title='Top ranking schools' className='w-[55%]' >
              <div className=' w-full space-y-1 py-2'>
                        <div className='px-2 flex items-center justify-between gap-3'>
                                    <p>University of Lagos</p>
                                    <p>240,656</p>
                            </div>
                            <div className='px-2 flex items-center justify-between gap-3'>
                                    <p>University of Lagos</p>
                                    <p>240,656</p>
                            </div><div className='px-2 flex items-center justify-between gap-3'>
                                    <p>University of Lagos</p>
                                    <p>240,656</p>
                            </div><div className='px-2 flex items-center justify-between gap-3'>
                                    <p>University of Lagos</p>
                                    <p>240,656</p>
                            </div>
                </div>

                </DashboardSection>

            <DashboardSection title='Your users’ top courses' className='w-1/2'>

              <div className=' w-full space-y-1 py-2'>
                        <div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Pharmacognosy</p>
                                    <p>240,656</p>
                            </div>
                            <div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Biochemistry</p>
                                    <p>240,656</p>
                            </div><div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Anatomy</p>
                                    <p>240,656</p>
                            </div><div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Physiology</p>
                                    <p>240,656</p>
                            </div>
                </div>
            </DashboardSection>

            <DashboardSection title='Your users’ top courses' className='w-1/2'>

              <div className=' w-full space-y-1 py-2'>
                        <div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Pre-med</p>
                                    <p>240,656</p>
                            </div>
                            <div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Year 1</p>
                                    <p>240,656</p>
                            </div><div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Year 2</p>
                                    <p>240,656</p>
                            </div><div className='px-2 flex items-center justify-between gap-3'>
                                    <p>Year 3</p>
                                    <p>240,656</p>
                            </div>
                </div>
            </DashboardSection>


                </div>
      </div>
      </div>
        )
}

export default UserMetrics