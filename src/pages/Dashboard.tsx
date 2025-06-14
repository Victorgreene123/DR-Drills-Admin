import React from 'react';
import Stats from '../components/stats';
import { FaUserCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DashboardSection from '../components/dashboardSection';
import thumbnail1 from '../assets/thumbnail-1.png';


const Dashboard: React.FC = () => {
    const MockData = [
        {
            activity: "Edited quiz details",
            time : "12:34 AM",
            type : "Documentation",
            user: {
                name: "John Doe",
                role: "Admin",
            }
        },
        {
            activity: "Added new quiz",
            time : "1:00 PM",
            type : "Quiz Creation",
            user: {
                name: "Jane Smith",
                role: "Editor",
            }
        },
        {
            activity: "Reviewed quiz",
            time : "3:15 PM",
            type : "Quiz Review",
            user: {
                name: "Alice Johnson",
                role: "Reviewer",
            }
        },
        {
            activity: "Deleted quiz",
            time : "4:45 PM",
            type : "Quiz Deletion",
            user: {
                name: "Bob Brown",
                role: "Admin",
            }
        },
        {
            activity: "Published quiz",
            time : "5:30 PM",
            type : "Quiz Publish",
            user: {
                name: "Emily White",
                role: "Admin",
            }
        },
        {
            activity: "Archived quiz",
            time : "6:00 PM",
            type : "Quiz Archive",
            user: {
                name: "Michael Green",
                role: "Editor",
            }
        },
        {
            activity: "Updated quiz settings",
            time : "7:20 PM",
            type : "Settings Update",
            user: {
                name: "Sarah Blue",
                role: "Admin",
            }
        },
        {
            activity: "Created new quiz block",
            time : "8:10 PM",
            type : "Quiz Block Creation",
            user: {
                name: "David Black",
                role: "Editor",
            }
        },

    ];

    // Example mock user data
    const users = [
        { id: 1, name: "John", type: "Premium" },
        { id: 2, name: "Jane", type: "Free" },
        { id: 3, name: "Alice", type: "Premium" },
        { id: 4, name: "Bob", type: "Premium" },
        { id: 5, name: "Eve", type: "Free" },
        { id: 6, name: "Sam", type: "Premium" },
        // ...add more users as needed
    ];

    // Calculate counts for each type
    const premiumCount = users.filter(u => u.type === "Premium").length;
    const freeCount = users.filter(u => u.type === "Free").length;

    // Pie chart data based on mock users
    const pieData = [
        { name: 'Premium', value: premiumCount, color: '#165BAA' },
        { name: 'Free', value: freeCount, color: '#FEC7B4' },
    ];

    // Pagination state for activity log
    const [page, setPage] = React.useState(0);
    const pageSize = 6;
    const totalPages = Math.ceil(MockData.length / pageSize);

    const pagedData = MockData.slice(page * pageSize, (page + 1) * pageSize);

    // Mock data for Top Lectures
    const topLectures = [
        {
            img: thumbnail1,
            title: "Anatomical Naming conventions, Planes and Axes",
            views: 380,
        },
        {
            img: thumbnail1,
            title: "Introduction to Physiology",
            views: 312,
        },
        {
            img: thumbnail1,
            title: "Biochemistry Basics",
            views: 290,
        },
        {
            img: thumbnail1,
            title: "Neuroanatomy Overview",
            views: 250,
        },
        {
            img: thumbnail1,
            title: "Cell Biology Essentials",
            views: 210,
        },
    ];

    return (
        <div className='space-y-4 '>
            <h1 className='text-[#004883] font-[500]'>Dashboard</h1>
            <div className=' flex items-center gap-3'>
                <Stats value={"580"} label='Active users' />
                <Stats value={"204"} label='New subscriptions' />

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
                            pagedData.map((item, index) => (
                                <div key={index} className="grid grid-cols-[2.5fr_1.5fr_1fr] gap-2 px-3 py-2 border-t-[1px] border-[#C3C6CF]">
                                    <p className='text-[#1A1C1E] text-[14px] flex items-center gap-2'>
                                        <span>{item.time}</span>
                                        <span className='text-[12px] border-[1px] border-[#C3C6CF] p-1 rounded-md'>{item.type}</span>
                                        <span>{item.activity}</span>
                                    </p>
                                    <p className='text-[#1A1C1E] text-[14px] flex items-center gap-2'>
                                        <FaUserCircle className='text-[#276EF1] text-[24px]' />
                                        <span className='text-[14px]'>{item.user.name}</span>
                                    </p>
                                    <p>
                                        {item.user.role}
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
                    {topLectures.map((lecture, idx) => (
                        <div key={idx} className="flex items-center px-2 w-full gap-3 py-2">
                            <img
                                src={lecture.img}
                                alt="thumb"
                                className="w-[82px] h-[47px] rounded flex-shrink-0"
                            />
                            <div className='w-[70%]'>
                                <span className="block truncate text-sm max-w-full" style={{ lineHeight: "1.2" }}>
                                    {lecture.title}
                                </span>
                                <span className="block">
                                    {lecture.views} Views
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title='Top Quizzes' className='w-1/2 relative'>
                <div className="py-2 space-y-3">
                    {[
                        {
                            icon: "📝",
                            title: "introduction to physiology",
                            subtitle: "Unilag 2014 incourse incourse NNNNN",
                            tags: ["Anatomy", "Physiology", "Physiology", "+3"],
                        },
                        {
                            icon: <img src={"YOUR_IMAGE_SRC"} alt="quiz" className="w-8 h-8 rounded-full bg-[#E8F0FE] object-cover" />, // replace YOUR_IMAGE_SRC
                            title: "Head and neck osteology",
                            subtitle: "",
                            tags: ["Anatomy", "Anatomy", "Physiology"],
                        },
                        {
                            icon: "📝",
                            title: "introduction to physiology",
                            subtitle: "Unilag 2014 incourse incourse NNNNN",
                            tags: ["Anatomy", "Physiology", "Physiology", "+3"],
                        },
                        {
                            icon: "🥇",
                            title: "Head and neck osteology",
                            subtitle: "",
                            tags: ["Anatomy"],
                        },
                        {
                            icon: "🟩",
                            title: "Head and neck osteology",
                            subtitle: "",
                            tags: ["Anatomy", "Physiology", "Physiology"],
                        },
                    ].map((quiz, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E8F0FE] text-2xl flex-shrink-0 overflow-hidden">
                                {typeof quiz.icon === "string" ? quiz.icon : quiz.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-medium text-[#1A1C1E] truncate">{quiz.title}</div>
                                {quiz.subtitle && (
                                    <div className="text-xs text-[#73777F] truncate">{quiz.subtitle}</div>
                                )}
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {quiz.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-[#DFE2EB] text-[#43474E] px-2 py-0.5 rounded text-[11px]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardSection>


                </div>
                  <div className='w-[68%]  flex items-center gap-3'>
            
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


                </div>
        </div>
    );
};

export default Dashboard;