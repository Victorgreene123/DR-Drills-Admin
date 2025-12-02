import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import DashboardSection from "../components/dashboardSection";
import Stats from "./stats";
import { useApi } from "../hooks/useApi";

interface UserMetricsData {
  metrics: {
    active_users: number;
    new_users: number;
    new_subscriptions: number;
    user_churn_rate: string;
    avg_screentime: string;
    total_users: number;
  };
  users_distribution: {
    free_users: number;
    premium_users: number;
    premium_growth: number;
  };
  most_active_hours: Array<{
    day: string;
    activity: number;
  }>;
  top_schools: Array<{
    name: string;
    user_count: number;
  }>;
  top_courses: Array<{
    name: string;
    user_count: number;
  }>;
  user_levels: Array<{
    level: string;
    percentage: string;
  }>;
}

const UserMetrics: React.FC = () => {
  const { apiFetch } = useApi();
  const [chartView, setChartView] = React.useState(1);
  const [metricsData, setMetricsData] = React.useState<UserMetricsData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          "/api/admin/user-metrics",
          { method: "GET" }
        );
        const response = await res.json()
        
        if (response.success && response.data) {
          setMetricsData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Format screentime helper
  const formatScreentime = (hours: string) => {
    const h = parseFloat(hours);
    const wholeHours = Math.floor(h);
    const minutes = Math.round((h - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  // Prepare pie chart data
  const pieData = metricsData
    ? [
        { name: 'Premium', value: metricsData.users_distribution.premium_users, color: '#165BAA' },
        { name: 'Free', value: metricsData.users_distribution.free_users, color: '#FEC7B4' },
      ]
    : [];

  // Get selected day's activity data
  const getSelectedDayData = () => {
    if (!metricsData) return [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const selectedDay = days[chartView - 1];
    const dayData = metricsData.most_active_hours.find(d => d.day === selectedDay);
    
    // Generate hourly mock data based on the day's activity level
    const activity = dayData?.activity || 0;
    return Array.from({ length: 10 }, (_, i) => ({
      users: Math.floor(activity * (0.7 + Math.random() * 0.6)),
      hours: `${11 + i}:00`
    }));
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="text-[#73777F]">Loading metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!metricsData) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="text-[#73777F]">No data available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full gap-3 ">
        <Stats value={metricsData.metrics.active_users.toString()} label="Active Users" />
        <Stats value={metricsData.metrics.new_users.toLocaleString()} label="New Users" />
        <Stats value={metricsData.metrics.new_subscriptions.toLocaleString()} label="New Subscriptions" />
        <Stats value={`${metricsData.metrics.user_churn_rate}%`} label="User Churn Rate" />
        <Stats value={formatScreentime(metricsData.metrics.avg_screentime)} label="Avg. screentime" />
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
              data={getSelectedDayData()}
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
              Trending up by <span className="font-semibold">{metricsData.users_distribution.premium_growth}%</span> this month
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
          <DashboardSection title='Top ranking schools' className='w-[55%]'>
            <div className=' w-full space-y-1 py-2'>
              {metricsData.top_schools.slice(0, 4).map((school, index) => (
                <div key={index} className='px-2 flex items-center justify-between gap-3'>
                  <p>{school.name}</p>
                  <p>{school.user_count.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection title='Your users’ top courses' className='w-1/2'>

            <div className=' w-full space-y-1 py-2'>
              {metricsData.top_courses.slice(0, 4).map((course, index) => (
                <div key={index} className='px-2 flex items-center justify-between gap-3'>
                  <p>{course.name}</p>
                  <p>{course.user_count.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection title='Your users’ levels' className='w-1/2'>

            <div className=' w-full space-y-1 py-2'>
              {metricsData.user_levels.slice(0, 4).map((level, index) => (
                <div key={index} className='px-2 flex items-center justify-between gap-3'>
                  <p>Year {level.level}</p>
                  <p>{level.percentage}%</p>
                </div>
              ))}
            </div>
          </DashboardSection>
        </div>
      </div>
    </div>
  );
};

export default UserMetrics;