import React from "react"
import Stats from "./stats";
import DashboardSection from "./dashboardSection";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useApi } from "../hooks/useApi";

interface ContentMetricsData {
  content_metrics: {
    total_engagement: string;
    total_lectures: string;
    total_quizzes: string;
    total_watch_hours: string;
    avg_screen_time: string;
    avg_retention: string;
  };
  uploaded_content: {
    lectures: string;
    lecture_banks: string;
    lecture_blocks: string;
    quizzes: string;
    questions: string;
    quiz_blocks: string;
  };
  top_courses: Array<{
    name: string;
    engagement: string;
  }>;
  top_tags: Array<{
    name: string;
    engagement: string;
  }>;
  all_topics: Array<{
    name: string;
    engagement: string;
  }>;
  all_tags: Array<{
    name: string;
    engagement: string;
  }>;
}

const ContentMetrics: React.FC = () => {
  const { apiFetch } = useApi();
  const [chartView, setChartView] = React.useState(1);
  const [metricsData, setMetricsData] = React.useState<ContentMetricsData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          "/api/admin/content-metrics",
          { method: "GET" }
        );
        const response = await res.json();
        
        if (response.success && response.data) {
          setMetricsData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch content metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Generate mock hourly data (API doesn't provide this yet)
  const getChartData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      users: Math.floor(Math.random() * 300) + 100,
      hours: `${11 + i}:00`
    }));
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="text-[#73777F]">Loading content metrics...</div>
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
      <div className="my-3 flex items-center gap-3 ">
        <Stats value={metricsData.content_metrics.total_engagement} label="Total engagements" />
        <Stats value={metricsData.content_metrics.total_watch_hours} label="Total watch hours" />
        <Stats value={metricsData.content_metrics.avg_screen_time} label="Avg. screentime" />
        <Stats value={metricsData.content_metrics.avg_retention} label="Avg. retention" />
        <Stats value={metricsData.content_metrics.total_lectures} label="Total Lectures" />
        <Stats value={metricsData.content_metrics.total_quizzes} label="Total Quizzes" />
      </div>

      <div className="grid w-full lg:grid-cols-2 gap-[2%] mb-6">
        <DashboardSection title='Uploaded content' className='w-full'>
          <div className='w-full space-y-1 py-2'>
            <div className='px-2 flex items-center justify-between gap-3'>
              <p>Lectures</p>
              <p>{parseInt(metricsData.uploaded_content.lectures).toLocaleString()}</p>
            </div>
            <div className='px-2 flex items-center justify-between gap-3'>
              <p>Lecture banks</p>
              <p>{parseInt(metricsData.uploaded_content.lecture_banks).toLocaleString()}</p>
            </div>
            <div className='px-2 flex items-center justify-between gap-3'>
              <p>Lecture blocks</p>
              <p>{parseInt(metricsData.uploaded_content.lecture_blocks).toLocaleString()}</p>
            </div>
            <div className='px-2 flex items-center justify-between gap-3'>
              <p>Quizzes</p>
              <p>{parseInt(metricsData.uploaded_content.quizzes).toLocaleString()}</p>
            </div>
            <div className='px-2 flex items-center justify-between gap-3'>
              <p>Questions</p>
              <p>{parseInt(metricsData.uploaded_content.questions).toLocaleString()}</p>
            </div>
            <div className='px-2 flex items-center justify-between gap-3'>
              <p>Quiz blocks</p>
              <p>{parseInt(metricsData.uploaded_content.quiz_blocks).toLocaleString()}</p>
            </div>
          </div>
        </DashboardSection>

        <DashboardSection title='Top Courses by Engagement' className='w-full'>
          <div className='w-full space-y-1 py-2'>
            {metricsData.top_courses.map((course, index) => (
              <div key={index} className='px-2 flex items-center justify-between gap-3'>
                <p>{course.name}</p>
                <p>{parseInt(course.engagement).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </DashboardSection>
      </div>

      <div className="grid w-full lg:grid-cols-2 gap-[2%] mb-6">
        <DashboardSection title='Top Tags' className='w-full'>
          <div className='w-full space-y-1 py-2'>
            {metricsData.top_tags.map((tag, index) => (
              <div key={index} className='px-2 flex items-center justify-between gap-3'>
                <p className="flex items-center gap-2">
                  <span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">
                    {tag.name}
                  </span>
                </p>
                <p>{parseInt(tag.engagement).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection title='All Topics' className='w-full'>
          <div className='w-full space-y-1 py-2'>
            {metricsData.all_topics.map((topic, index) => (
              <div key={index} className='px-2 flex items-center justify-between gap-3'>
                <p>{topic.name}</p>
                <p>{parseInt(topic.engagement).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </DashboardSection>
      </div>

      <div className="w-full mb-6">
        <DashboardSection title='All Tags' className='w-full'>
          <div className='w-full space-y-1 py-2'>
            <div className="flex flex-wrap gap-2 px-2">
              {metricsData.all_tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#F2F3FA] rounded px-3 py-1.5">
                  <span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">
                    {tag.name}
                  </span>
                  <span className="text-sm text-[#73777F]">{parseInt(tag.engagement).toLocaleString()}</span>
                </div>
              ))}
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
            data={getChartData()}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hours" />
            <YAxis/>
            <Bar dataKey="users" fill="#0360AB" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ContentMetrics;