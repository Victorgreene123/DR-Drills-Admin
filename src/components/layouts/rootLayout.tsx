import React from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';



const RootLayout: React.FC = () => {
  return (
    <div className="w-full h-screen max-h-screen overflow-y-hidden">
      <Navbar />
      <div className="w-full flex">
        <div className="h-[80vh] min-w-[15%] w-[15%]">
          {/* Sidebar content */}
          <Sidebar />
        </div>
        <div className=" min-w-[85%]  overflow-y-auto h-[92vh]">
          {/* Main content */}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
