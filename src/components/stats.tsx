type StatsProps = {
  value: string | number | React.ReactNode;
  label: string;
  className?: string;
};

const Stats: React.FC<StatsProps> = ({ value, label, className = '' }) => (
  <div className={`rounded-[16px] border-[1px] py-4 px-5 space-y-1 border-[#C3C6CF] w-1/5  bg-[#F8F9FF] ${className}`}>
    <div className="text-xl font-[500] text-[#004883] text-[24px]  ">{value}</div>
    <div className="text-[11px] font-[500] text-[#73777F] ">{label}</div>
  </div>
);


export default Stats;