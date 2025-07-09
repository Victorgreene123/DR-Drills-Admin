import Stats from '../components/stats'
import { IoFilterOutline} from 'react-icons/io5';
// import { FaChevronDown } from "react-icons/fa";
import QuizzesTable from '../components/QuizzesTable';
import Pfp from '../assets/Users pfp.png'

const Users = () => {

   const data = [
      {
        id: 1,
        image: Pfp,
        title: "Yemisi Olaoba",
        email: "yemisiolaoba@gmail.com",
        plan: "Premium",
        lastSeen: "Oct 8, 2025"
      },
    {
      id: 2,
      image: Pfp,
      title: "Yemisi Olaoba",
      email: "yemisiolaoba@gmail.com",
      plan: "Premium",
      lastSeen: "Oct 8, 2025"
    },
    {
      id: 3,
      image: Pfp,
      title: "Yemisi Olaoba",
      email: "yemisiolaoba@gmail.com",
      plan: "Premium",
      lastSeen: "Oct 8, 2025"
    },
    {
      id: 4,
      image: Pfp,
      title: "Yemisi Olaoba",
      email: "yemisiolaoba@gmail.com",
      plan: "Premium",
      lastSeen: "Oct 8, 2025"
    },
    {
      id: 5,
      image: Pfp,
      title: "Yemisi Olaoba",
      email: "yemisiolaoba@gmail.com",
      plan: "Premium",
      lastSeen: "Oct 8, 2025"
    }
   ]

  
  return (
    

    <div className="space-y-5">

      <div className="space-y-10">

         <h1 className='text-[#004883] font-[500]'>Users</h1>
            <div className=' flex items-center gap-3'>
                <Stats value={"3,200,000,000"} label='Total Daily Users' />
                <Stats value={"3,200,000,000"} label='New Sign ups' />

            </div>

            {/*Filter Section */}
            <div className="relative">

              <button
                className="bg-[#F2F3FA] cursor-pointer border-[1px] border-[#C3C6CF] rounded-[8px] px-[12px] h-[32px] flex items-center gap-2 text-[#43474E] text-[13px] min-w-[100px]"
                // onClick={() => {
                //   setShowFilterDropdown((v) => !v);
                //   setDropdownType(null);
                // }}
              >
                Add Filter
                <IoFilterOutline className="ml-1" />
              </button>

                <div>
                  <QuizzesTable 
                    data = {data}
                    tableheads={["User" , "Email" , "Plan" , "Last Seen"] }
                    ids={["title", "email", "plan", "lastSeen"]}
                    initialRowsPerPage={40} 
                    renderCell={{
                            title: (rowData) => ( //This is where the title is modified to accept a pfp
                                <div style={{ 
                                    display: 'flex',       
                                    alignItems: 'center', 
                                    gap: '15px'            
                                }}>
                                    {rowData.image && ( 
                                        <img
                                            src={rowData.image} 
                                            alt={rowData.title}
                                            style={{
                                                width: '36px', 
                                                height: '36px',  
                                                borderRadius: '50%', 
                                                objectFit: 'cover',
                                                objectPosition: 'right'
                                                   
                                            }}
                                        />
                                    )}
                                    {/* This <span> holds the user's name */}
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                       {rowData.title} 
                                    </span>
                                </div>)
                    }}
                    />
                                
                </div>

            </div>

      </div>
       

    </div>
  )
}

export default Users