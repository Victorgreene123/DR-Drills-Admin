import React, { useEffect, useState } from 'react';
import Stats from '../components/stats';
import { FaUserCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DashboardSection from '../components/dashboardSection';

import { useApi } from '../hooks/useApi';


const Dashboard: React.FC = () => {

        const { apiFetch } = useApi();
        const [active_users , setActiveusers] = useState<number>(0);
        const [newsubscriptions , setNewSubscriptions] = useState<number>(0);
        const [userDistribution, setuserDistribution] = useState<any>({
            free_users: 0,
            premium_users: 0
        })
        const [activity , setActivity] = useState<any []>([

            {
                        
            time: "2025-09-16T14:36:04.000Z",
            action_type: "view",
            description: "GET action performed on /quiz/all",
            name: "Medical School Admin",
            role: "super_admin"
        
            }
        ]);
        const [topCourses , setTopCourses] = useState<any>();
        const [topLectures , setTopLectures] = useState<any>();
        const [topQuizzes , setTopQuizzes] = useState<any>();
        const [topSchools , setTopSchools] = useState<any>();


        useEffect(() => {
            const loaddata = async () =>{
                    try {
        const res = await apiFetch("/api/admin/dashboard");
        const data = await res.json();
        const {
            active_users , 
            new_subscriptions , 
            users_distribution , 
            activityLog , 
            topCourses , 
            topLectures , 
            topQuizzes , 
            topSchools
        } = data;
        setActiveusers(active_users);
        setNewSubscriptions(new_subscriptions);
        setuserDistribution(users_distribution);
        setActivity(activityLog);
        setTopCourses(topCourses);
        setTopLectures(topLectures);
        setTopQuizzes(topQuizzes);
        setTopSchools(topSchools);

        
        console.log(data);
      } catch (err) {
        console.error(err);
      }
            }
            loaddata();
        })



    // Example mock user data

    // Calculate counts for each type
    const premiumCount = userDistribution.premium_users;
    const freeCount = userDistribution.free_users;

    // Pie chart data based on mock users
    const pieData = [
        { name: 'Premium', value: premiumCount, color: '#165BAA' },
        { name: 'Free', value: freeCount, color: '#FEC7B4' },
    ];

    // Pagination state for activity log
    const [page, setPage] = React.useState(0);
    const pageSize = 5;
    const totalPages = Math.ceil(activity.length / pageSize);

    const pagedData = activity.slice(page * pageSize, (page + 1) * pageSize);

    // Mock data for Top Lectures


    return (
        <div className='space-y-4 '>
            <h1 className='text-[#004883] font-[500]'>Dashboard</h1>
            <div className=' flex items-center gap-3'>
                <Stats value={active_users} label='Active users' />
                <Stats value={newsubscriptions} label='New subscriptions' />

            </div>
            <div className='flex items-center gap-3'>
                <div className='w-[68%] border-[1px] bg-white border-[#C3C6CF] rounded-[5px] py-3 min-h-[340px] flex flex-col justify-between'>
                    <div className='w-full flex-1'>
                        <div className="grid grid-cols-[2.5fr_1.5fr_1fr] gap-2  px-3  pb-2">
                            <p className='font-semibold'>Activity Log</p>
                            <p className=''>Name</p>
                            <p className=''>Role</p>
                        </div>
                        {
                            pagedData && 
                            pagedData.map((item, index) => (
                                <div key={index} className="grid grid-cols-[2.5fr_1.5fr_1fr] gap-2 px-3 py-2 border-t-[1px] border-[#C3C6CF]">
                                    <p className='text-[#1A1C1E] text-[14px] flex items-center gap-2'>
                                        <span>{item.time}</span>
                                        <span className='text-[12px] border-[1px] border-[#C3C6CF] p-1 rounded-md'>{item.action_type}</span>
                                        <span>{item.description}</span>
                                    </p>
                                    <p className='text-[#1A1C1E] text-[14px] flex items-center gap-2'>
                                        <FaUserCircle className='text-[#276EF1] text-[24px]' />
                                        <span className='text-[14px]'>{item.name}</span>
                                    </p>
                                    <p>
                                        {item.role}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    {/* Pagination controls for activity log */}
                    <div className="flex justify-start mt-2 px-3">
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#C3C6CF] bg-white text-[#0360AB] mr-2 disabled:opacity-40"
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#C3C6CF] bg-white text-[#0360AB] disabled:opacity-40"
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
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
            
                <div className='w-[68%]  flex items-center gap-3'>
            
            <DashboardSection title='Top Lectures' className='w-[50%] relative' >
                <div className="py-1 ">
                    {
                    topLectures && 
                    topLectures.map((lecture:any, idx:number) => (
                        <div key={idx} className="flex items-center px-2 w-full gap-3 py-2">
                            <img
                                src={lecture.thumbnail}
                                alt="thumb"
                                className="w-[82px] h-[47px] rounded flex-shrink-0"
                            />
                            <div className='w-[70%]'>
                                <span className="block truncate text-sm max-w-full" style={{ lineHeight: "1.2" }}>
                                    {lecture.name}
                                </span>
                                <span className="block">
                                    {lecture.view_count} Views
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title='Top Quizzes' className='w-1/2 relative'>
    
                <div className="py-2 space-y-3">
                    {
                        topQuizzes && 
                    topQuizzes.map((quiz:any, idx:number) => (
                        <div key={idx} className="flex items-start gap-3">
                            <img
                                src={quiz.thumbnail}
                                alt="thumb"
                                className="w-[82px] h-[47px] rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-medium text-[#1A1C1E] truncate">{quiz.title}</div>
                                {quiz.subtitle && (
                                    <div className="text-xs text-[#73777F] truncate">{quiz.subtitle}</div>
                                )}
                                                                <span className="block">
                                    {quiz.attempts} Attempts
                                </span>
                                

                            </div>
                        </div>
                    ))}
                </div>
            </DashboardSection>


                </div>
                  <div className='w-[68%]  flex items-center gap-3'>
            
            <DashboardSection title='Top ranking schools' className='w-[55%]' >
              <div className=' w-full space-y-1 py-2'>
                {
                    topSchools && topSchools.map((school:any, idx:number) => (
                        <div key={idx} className='px-2 flex items-center justify-between gap-3'>

                                    <p>{school.name}</p>
                                    <p>{school.total}</p>
                            </div>
                    ))
                }

                </div>

                </DashboardSection>

            <DashboardSection title='Your users’ top courses' className='w-1/2'>

              <div className=' w-full space-y-1 py-2'>
                {
                    topCourses && topCourses.map((course:any, idx:number) => (
                        <div key={idx} className='px-2 flex items-center justify-between gap-3'>

                                    <p>{course.course_name}</p>
                                    <p>{course.total}</p>
                            </div>
                    ))
                
                }

                </div>
            </DashboardSection>


                </div>
        </div>
    );
};

export default Dashboard;