import React from "react";

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, children, className }) => (
  <div className={`rounded-[16px] border border-[#C3C6CF] bg-white ${className ?? ""}`}>
    <div className="px-5 py-2 text-[16px] font-semibold text-[#1A1C1E]">
      {title}
    </div>
    <div className="px-3">
      {children}
    </div>
  </div>
);

export default DashboardSection;
