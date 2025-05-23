type StatsProps = {
  value: string | number;
  label: string;
};

const Stats: React.FC<StatsProps> = ({ value, label }) => (
  <div className='rounded-[16px] border-[1px] p-3 space-y-1 border-[#C3C6CF] w-1/5  bg-[#F8F9FF] p-3'>
    <div className="text-xl font-[500] text-[#004883] text-[24px]  ">{value}</div>
    <div className="text-[11px]  text-[#73777F] ">{label}</div>
  </div>
);


export default Stats;