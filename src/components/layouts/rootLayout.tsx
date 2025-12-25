import React, { useState } from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';
import UserFeedbackPanel from '../userFeedback';
import MobileBlocker from '../MobileBlocker';



const RootLayout: React.FC = () => {
  const [showFeedback , setShowFeedback] = useState(false)
  const toggleFeedback = () => {
    console.log("Toggle Feedback cllicked")
    setShowFeedback(!showFeedback)
  }
    return (
    <MobileBlocker>
      <div className="w-full h-screen max-h-screen overflow-y-hidden">
        <Navbar onOpenFeedback={toggleFeedback}/>
        <div className="w-full flex">
          <div className="h-[100vh] min-w-[15%] w-[15%]">
            {/* Sidebar content */}
            <Sidebar />
          </div>
          <div className={`${showFeedback ? "max-w-[60%] w-[60%]" : "min-w-[85%] w-[85%]"} p-10  overflow-y-auto h-[92vh]`}>
            {/* Main content */}
            <Outlet />
          </div>
          {
            showFeedback && <UserFeedbackPanel onClose={toggleFeedback}/>
          }
        </div>



      </div>
    </MobileBlocker>
  );
};

export default RootLayout;
