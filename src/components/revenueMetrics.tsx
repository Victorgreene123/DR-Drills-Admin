import React from "react";
import Stats from "./stats";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
  Pie,
  PieChart
} from "recharts";
import { useApi } from "../hooks/useApi";

interface RevenueMetricsData {
  revenue_metrics: {
    active_subscriptions: string;
    new_subscriptions: string;
    recurring_subscriptions: string;
    avg_recurring_revenue: string;
    growth_rate_mom: string;
  };
  revenue_over_time: {
    period: string;
    data: Array<{
      date: string;
      value: number;
    }>;

  };
  revenue_by_plan: Array<{
    plan_name: string;
    users: string;
    revenue: string;
    percentage: string;
  }>;
  user_distribution: Array<{
    user_type: string;
    user_count: string;
    percentage: string;
  }>;
}

const RevenueMetrics: React.FC = () => {
  const { apiFetch } = useApi();
  const [metricsData, setMetricsData] = React.useState<RevenueMetricsData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          "/api/admin/revenue-metrics",
          { method: "GET" }
        );
        const response = await res.json();
        
        if (response.success && response.data) {
          setMetricsData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch revenue metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Prepare pie chart data from user distribution
  const pieData = metricsData
    ? metricsData.user_distribution.map((item, index) => ({
        name: item.user_type,
        value: parseInt(item.user_count),
        color: index === 0 ? '#FEC7B4' : index === 1 ? '#165BAA' : '#A5D6A7',
      }))
    : [];

  // Prepare line chart data
  const chartData = metricsData?.revenue_over_time.data.length
    ? metricsData.revenue_over_time.data
    : [
        { date: "No data", value: 0 }
      ];

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="text-[#73777F]">Loading revenue metrics...</div>
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
        <Stats value={metricsData.revenue_metrics.active_subscriptions} label="Active Subscriptions" />
        <Stats value={metricsData.revenue_metrics.new_subscriptions} label="New Subscriptions" />
        <Stats value={metricsData.revenue_metrics.recurring_subscriptions} label="Recurring subs" />
        <Stats value={metricsData.revenue_metrics.avg_recurring_revenue} label="Avg. recurring revenue" />
        <Stats value={metricsData.revenue_metrics.growth_rate_mom} label="Growth Rate (MoM)" />
      </div>

      <div className="w-full bg-[#FFFFFF] rounded-[10px] border-[1px] border-[#C3C6CF] p-2 px-6">
        <div>
          <h2 className="text-[#1A1C1E] text-[18px] font-[600]">Revenue over Time</h2>
          <p className="text-[#73777F] text-[14px]">
            Showing revenue over the {metricsData.revenue_over_time.period.replace('_', ' ')}
          </p>
        </div>

        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#006B5D" strokeWidth={4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="my-5 flex items-start justify-between w-full w-[70%] gap-[2%] ">
        <div className="w-full bg-[#FFFFFF] w-[58%] rounded-[10px] border-[1px] border-[#C3C6CF] p-2 px-6">
          <h2 className="font-[600] text-[16px] ">Revenue by Plan</h2>

          <table className="w-full">
            <thead className="text-[#43474E] text-[14px] w-full border-b-[1px] border-[#C3C6CF] ">
              <tr>
                <th className="font-[400] py-2 text-left">Plan name</th>
                <th className="font-[400] py-2 text-left">Users </th>
                <th className="font-[400] py-2 text-left">Revenue</th>
                <th className="font-[400] py-2 text-left">% of total</th>
              </tr>
            </thead>
            <tbody>
              {metricsData.revenue_by_plan.map((plan, index) => (
                <tr key={index} className="text-[#1A1C1E] text-[14px] w-full border-b-[1px] border-[#C3C6CF]">
                  <td className="py-2">{plan.plan_name}</td>
                  <td className="py-2">{parseInt(plan.users).toLocaleString()}</td>
                  <td className="py-2">{plan.revenue}</td>
                  <td className="py-2">{plan.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='w-[40%] border-[1px] border-[#C3C6CF] rounded-[12px] h-[320px] p-0 bg-white overflow-hidden'>
          <div className="border-b border-[#E5E7EB] px-4 py-2 text-center font-semibold text-[#1A1C1E] text-[15px]">
            User Distribution
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
            <div className="flex flex-col items-center justify-center gap-2 mt-4 mb-2 text-xs">
              {metricsData.user_distribution.map((item, index) => (
                <div key={index} className="flex items-center gap-1 w-full justify-between px-4">
                  <div className="flex items-center gap-1">
                    <span 
                      className="w-3 h-3 rounded inline-block" 
                      style={{ backgroundColor: pieData[index]?.color }}
                    ></span>
                    <span>{item.user_type}</span>
                  </div>
                  <span className="font-semibold">{item.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueMetrics;