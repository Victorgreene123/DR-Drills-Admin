import React from "react"
import Stats from "./stats";
import DashboardSection from "./dashboardSection";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ContentMetrics:React.FC = () => {
    const [chartView, setChartView] = React.useState(1);

      

    return(
        <div className="w-full">
             
                            <div className="my-3 flex items-center gap-3 ">
                                <Stats value="450" label="Total engagements" />
                                <Stats value="300,000" label="Total watch hours" />
                                <Stats value="7h 58mm" label="Avg. screentime" />
                                <Stats value="250,000" label="Avg. retention" />
                                <Stats value="48,960h" label="Lecture engagement" />
                                <Stats value="248,960h" label="Quizzes engagement" />
            
            
            
            
                            </div>

                            <div className="grid w-full lg:grid-cols-2 gap-[2%]">
                                    <DashboardSection title='Uploaded content' className='w-[55%]' >
                                          <div className=' w-full space-y-1 py-2'>
                                                    <div className='px-2 flex items-center justify-between gap-3'>
                                                                <p>Lectures</p>
                                                                <p>240,656</p>
                                                        </div>
                                                        <div className='px-2 flex items-center justify-between gap-3'>
                                                                <p>Lecture banks</p>
                                                                <p>240,656</p>
                                                        </div><div className='px-2 flex items-center justify-between gap-3'>
                                                                <p>Lecture blocks</p>
                                                                <p>240,656</p>
                                                        </div><div className='px-2 flex items-center justify-between gap-3'>
                                                                <p>Quizzes</p>
                                                                <p>240,656</p>
                                                        </div>
                                                        <div className='px-2 flex items-center justify-between gap-3'>
                                                                <p>Questions</p>
                                                                <p>240,656</p>
                                                        </div><div className='px-2 flex items-center justify-between gap-3'>
                                                                <p>Quiz blocks</p>
                                                                <p>240,656</p>
                                                        </div>
                                            </div>
                            
                                            </DashboardSection>
                            </div>


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
                                        <YAxis/>
                                        <Bar dataKey="users" fill="#0360AB" barSize={30} />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>

                            

        </div>
    )

}

export default ContentMetrics;