import React, { useState } from "react";
import pfp from '../assets/pfp.jpg'
import { FaArrowLeft, FaChevronRight } from "react-icons/fa6";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";




const Settings:React.FC = () =>{
  const renderProfile = () =>{
    return (
      <div>

       <h1 className="text-[#1A1C1E] text-[16px] font-[500] ">Profile</h1>
            <div className="w-[93%] bg-white py-1 flex items-center mt-2 mx-2 gap-2  ">
        <img src={pfp} className="w-[64px] h-[64px] rounded-full object-cover" alt="" />
        <div>
            <h2 className="text-[16px] text-[#1A1C1E]">Orisajo Toluwanimi</h2>
            <p className="text-[11px] rounded-[4px] text-[#004883] px-[4px] text-center py-[2px] bg-[#D4E3FF] border-[1px] border-[#D4E3FF] ">Admin</p>
        </div>

      </div>

                      <div className='w-[75%] border-[1px] mt-2 bg-white border-[#C3C6CF] rounded-[5px] py-3 min-h-[200px] flex flex-col justify-between'>
                          <div className='w-full flex-1'>
                              <div className="grid grid-cols-[2.5fr_1.5fr_1fr] gap-2  px-3  pb-2">
                                  <p className='font-semibold'>Activity Log</p>
                              
                              </div>
                              {
                                  MockData.map((item, index) => (
                                      <div key={index} className="gap-2 px-3 py-2 border-t-[1px] border-[#C3C6CF]">
                                          <p className='text-[#1A1C1E] text-[14px] flex items-center gap-2'>
                                              <span>{item.time}</span>
                                              <span className='text-[12px] border-[1px] border-[#C3C6CF] p-1 rounded-md'>{item.type}</span>
                                              <span>{item.activity}</span>
                                          </p>
                                      
                                         
                                      </div>
                                  ))
                              }
                          </div>
                         
                      </div>
        </div>
    )
  }
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
 
      

    ];
        const [view, setView]  = useState("Admin");
    const [permission , setPermission] = useState(false);

    const AllPermissions = [
      {
          title : "Lectures",
          Authorized : true,
      },
      {
        title : "Quizzes",
        Authorized : true,

      },
            {
        title : "Users",
        Authorized : true,

      },
      {
        title : "Subscriptions",
        Authorized : false,

      },
      {
        title : "Analytics",
        Authorized : true,

      },
      {
        title : "Campaigns",
        Authorized : true,

      },

      
    ]


  const renderRoles = () =>{


        return(
          <div>
             <h1 className="text-[#1A1C1E] text-[16px] font-[500] ">Roles and Permissions</h1>
              <div className='border-b-[1px] border-[#C3C6CF] flex w-full mt-2'>
          <div className={`text-[16px] cursor-pointer font-[500] p-1 px-3 ${view === "Admin" ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]" : " text-[#73777F] bg-white"}`} onClick={() => setView("Admin")}>Admin</div>
          <div className={`text-[16px] cursor-pointer p-1 px-3 font-[500] ${view === "content" ? "text-[#1A1C1E] bg-[#F2F3FA] border-b-[2px] border-[#0360AB]" : " text-[#73777F] bg-white"}`} onClick={() => setView("content")}>Content manager</div>
        </div>

          <div className="py-3">
            

            {
              view == "content" ? permission == true ? (
                    <div>
                        <div className="flex items-center gap-3 cursor-pointer "  onClick= {() => setPermission(false)}>
                    <FaArrowLeft className="" color="#73777F" size={12}/>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">Permissions</h1>
                        </div>
                      <ul className="mt-3">
                      {
                        AllPermissions.map((item,index) => {
                            return (
                              <li className={`flex items-center justify-between w-full p-[8px] ${index % 2 == 0 && "bg-[#F8F9FF]"}`}>
                                {item.title}
                                {item.Authorized ? (
                                                    <MdCheckBox
                                                      className="text-[#0360AB] text-[22px]"
                                                      // onClick={() => }
                                                    />
                                                  ) : (
                                                    <MdCheckBoxOutlineBlank
                                                      className="bg-white text-[22px]"
                                                      // onClick={() => }
                                                    />
                                                  )}
                              </li>
                            )
                        })
                      }
                      </ul>

                    </div>

              ) : (
                <div>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600]">Add member</h1>
                    <div className="flex items-center gap-3">
                      <input type="text" placeholder="Type email or username" className="py-2 outline-none px-3 w-[350px] border-[1px] border-[#C3C6CF] rounded-md"></input>
                      <button className="bg-[#D4E3FF] rounded-[8px] py-[10px] px-[16px] text-[#004883]">
                        Add
                      </button>
                    </div>

                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">Description</h1>
                    <p className="text-[#43474E] text-[14px]">
                        A content manager is in charge of adding and editing every form of content on the app from lectures and  quizzes to banks and blocks.
                    </p>

                    <div className="flex items-center justify-between w-full mt-2 cursor-pointer" onClick={() => setPermission(true)}>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">Permissions</h1>

                    
                      <FaChevronRight size={12} className="cursor-pointer"/>
                    


                    </div>
                    <div className="flex items-center justify-between w-full mt-2 cursor-pointer" onClick={() => setPermission(true)}>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">7 Members</h1>

                    
                      <FaChevronRight size={12} className="cursor-pointer"/>
                    


                    </div>


                </div>

              ) : ""
            }



            {
              view == "Admin" ? permission == true ? (
                    <div>
                        <div className="flex items-center gap-3 cursor-pointer "  onClick= {() => setPermission(false)}>
                    <FaArrowLeft className="" color="#73777F" size={12}/>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">Permissions</h1>
                        </div>
                      <ul className="mt-3">
                      {
                        AllPermissions.map((item,index) => {
                            return (
                              <li className={`flex items-center justify-between w-full p-[8px] ${index % 2 == 0 && "bg-[#F8F9FF]"}`}>
                                {item.title}
                                {item.Authorized ? (
                                                    <MdCheckBox
                                                      className="text-[#0360AB] text-[22px]"
                                                      // onClick={() => }
                                                    />
                                                  ) : (
                                                    <MdCheckBoxOutlineBlank
                                                      className="bg-white text-[22px]"
                                                      // onClick={() => }
                                                    />
                                                  )}
                              </li>
                            )
                        })
                      }
                      </ul>

                    </div>

              ) : (
                <div>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600]">Add member</h1>
                    <div className="flex items-center gap-3">
                      <input type="text" placeholder="Type email or username" className="py-2 outline-none px-3 w-[350px] border-[1px] border-[#C3C6CF] rounded-md"></input>
                      <button className="bg-[#D4E3FF] rounded-[8px] py-[10px] px-[16px] text-[#004883]">
                        Add
                      </button>
                    </div>

                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">Description</h1>
                    <p className="text-[#43474E] text-[14px]">
                        An Admin is in charge of adding and editing every form of content on the app from lectures and  quizzes to banks and blocks.
                    </p>

                    <div className="flex items-center justify-between w-full mt-2 cursor-pointer" onClick={() => setPermission(true)}>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">Permissions</h1>

                    
                      <FaChevronRight size={12} className="cursor-pointer"/>
                    


                    </div>
                    <div className="flex items-center justify-between w-full mt-2 cursor-pointer" onClick={() => setPermission(true)}>
                    <h1 className="text-[#1A1C1E] text-[14px] font-[600] mt-2">4 Members</h1>

                    
                      <FaChevronRight size={12} className="cursor-pointer"/>
                    


                    </div>


                </div>

              ) : ""
            }

            

          </div>
          
          </div>
        
        )

  }
    const [currentView , setCurrentView] = useState("profile");
    const renderView = () =>{
          switch (currentView) {
            case "roles":
              return renderRoles();
              
              
            case "profile":
              return renderProfile();
              
          
            default:
              return renderProfile();
          }
    }

    return (
        <div className="flex flex-col  min-h-screen ">
      <h1 className="text-[28px] leading-[32px] font-bold  text-[#004883]"> Settings  </h1>
      <p className="text-[#43474E] text-[14px]">Manage your workspace settings and set e-mail preferences</p>

      <div className="w-[70%] flex items-start  p-2 gap-4 mt-4">

        {/* Vertical Tabs for settings   */}
        <div className="w-[35%] ">

            {/* General , Profile and Roles and permissions  */}
            <ul className="flex flex-col gap-1 w-full   text-[#1A1C1E] text-[14px] font-[400]">

                <li className={`px-[10px] cursor-pointer py-[6px] rounded-[4px] hover:bg-[#F2F3FA] ${currentView == "profile" && "bg-[#F2F3FA]"}`} onClick={() => setCurrentView("profile")}>Profile</li>
                <li className={`px-[10px] cursor-pointer py-[6px] rounded-[4px] hover:bg-[#F2F3FA] ${currentView == "roles" && "bg-[#F2F3FA]"}`} onClick={() => setCurrentView("roles")}>Roles and permissions</li>
                
            </ul>

        </div>
        {/* END of Tabs  */}

        {/* Tab Content  */}
        <div className="border-l-[1px] h-[300px] border-[#C3C6CF] pl-6 w-full">
        {
          renderView()
        }
           
        </div>


      </div>

        </div>
    )
}

export default Settings;